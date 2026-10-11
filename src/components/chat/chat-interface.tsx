"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Loader2,
  ClipboardCopy,
  MessagesSquare,
  AlertTriangle,
  Terminal,
  Sparkles,
  Eraser,
  Send,
} from "lucide-react";
import { CodeEditor } from "@/components/chat/code-editor";
import { FixedCodeBlock } from "@/components/chat/fixed-code-block";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { languages } from "@/data/mock";
import { useSettings } from "@/contexts/SettingsContext";
import { addNotification } from "@/lib/notifications";
import toast from "react-hot-toast";

const USED_LANGUAGES_KEY = "codementor_used_languages";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  errorCode?: string;
  feedback?: "helpful" | "not-helpful";
  createdAt: Date;
}

interface ParsedAIResponse {
  explanation: string;
  brokenCode?: string;
  fixedCode?: string;
  language?: string;
}

function parseAIResponse(text: string): ParsedAIResponse {
  let remaining = text;
  let fixedCode: string | undefined;
  let language: string | undefined;

  const fixedMatch = remaining.match(
    /(?:^|\n)#{1,6}\s*Kode yang Sudah Dibenarkan\s*\n+```(\w+)?\n([\s\S]*?)```/i
  );
  if (fixedMatch) {
    language = fixedMatch[1] || undefined;
    fixedCode = fixedMatch[2].trim();
    remaining = remaining.replace(fixedMatch[0], "\n");
  }

  const brokenMatch = remaining.match(
    /(?:^|\n)#{1,6}\s*Kode yang Bermasalah\s*\n+```(\w+)?\n([\s\S]*?)```/i
  );
  const brokenCode = brokenMatch ? brokenMatch[2].trim() : undefined;

  return { explanation: remaining.trim(), brokenCode, fixedCode, language };
}

const welcomeMessage: Msg = {
  id: "welcome",
  role: "assistant",
  content:
    "Halo! Saya adalah **CodeMentor AI**\n\nTempel kode Anda pada editor di samping, lalu klik **'Jelaskan Error'**.\n\nSaya akan menganalisis error dan menjelaskan penyebab serta solusinya dalam **Bahasa Indonesia**.",
  confidence: 100,
  createdAt: new Date(),
};

export function ChatInterface() {
  const { settings } = useSettings();
  const [sourceCode, setSourceCode] = useState<string>(
    "# Tempel kode Anda di sini\n\ndef hitung_ratarata(nilai):\n    total = 0\n    for n in nilai:\n        total += n\n    return total / len(nilai)\n\nprint(hitung_ratarata([]))"
  );
  const [language, setLanguage] = useState("python");
  const [messages, setMessages] = useState<Msg[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const activeLanguage = languages.find((l) => l.value === language);

  const trackLanguageTip = () => {
    try {
      const raw = window.localStorage.getItem(USED_LANGUAGES_KEY);
      const used: string[] = raw ? JSON.parse(raw) : [];
      if (!used.includes(language)) {
        used.push(language);
        window.localStorage.setItem(USED_LANGUAGES_KEY, JSON.stringify(used));
        addNotification({
          type: "info",
          title: `Pertama kali pakai ${activeLanguage?.label ?? language}`,
          message: "Tips: sertakan pesan error lengkap agar analisis lebih akurat.",
        });
      }
    } catch {
      /* ignore */
    }
  };

  const handleExplain = async () => {
    if (!sourceCode.trim()) {
      toast.error("Tempel kode terlebih dahulu.");
      return;
    }

    trackLanguageTip();

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: `**${activeLanguage?.label ?? language}**\n\n\`\`\`${language}\n${sourceCode}\n\`\`\`${
          errorInput ? `\n\n> ${errorInput}` : ""
        }`,
        createdAt: new Date(),
      },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          sourceCode,
          language,
          errorMessage: errorInput.trim() || undefined,
          saveHistory: settings.autoSaveHistory,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error((data && data.error) || "Gagal menganalisis kode.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.explanation ?? "Server tidak mengembalikan penjelasan.",
          confidence: typeof data.confidence === "number" ? data.confidence : undefined,
          errorCode: errorInput.trim().split("\n")[0]?.slice(0, 60) || undefined,
          createdAt: new Date(),
        },
      ]);

      addNotification({
        type: "success",
        title: "Analisis selesai",
        message: `Error ${
          errorInput.trim().split("\n")[0]?.slice(0, 40) || activeLanguage?.label || language
        } berhasil dijelaskan.`,
        actionUrl: "/riwayat",
      });

      if (data.mock) {
        toast("Jawaban dari knowledge base (API Groq tidak aktif).", { icon: "⚠️" });
      }
    } catch (err) {
      console.error("[chat] Gagal memanggil /api/chat:", err);
      toast.error(err instanceof Error ? err.message : "Gagal menghubungi server.");
      addNotification({
        type: "error",
        title: "Gagal menganalisis",
        message: "Tidak dapat terhubung ke AI. Coba lagi.",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "**Gagal menganalisis kode.**\n\nServer tidak dapat memproses permintaan ini. Pastikan koneksi aktif lalu coba lagi.",
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (id: string, feedback: "helpful" | "not-helpful") => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, feedback } : m)));
    toast.success(feedback === "helpful" ? "Terima kasih atas feedbacknya!" : "Catatanmu membantu AI belajar.");
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(content.slice(0, 20));
    toast.success("Jawaban disalin.");
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Chat AI"
        icon={MessagesSquare}
        title="Asisten Debug"
        description="Tempel kode Anda, jelaskan error, dan dapatkan analisis lengkap dalam Bahasa Indonesia."
        actions={<BadgePill tone="cyan" icon={Terminal}>Groq LLM + RAG</BadgePill>}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Left: editor */}
        <div className="space-y-6">
          <GlassCard>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 pr-8 text-sm text-white outline-none transition-colors focus:border-neon-red/40 [&>option]:bg-[#0A0B14]"
                >
                  {languages.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
              <span className="font-mono text-[11px] text-white/35">.{activeLanguage?.extensions}</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <CodeEditor value={sourceCode} onChange={setSourceCode} language={language} height="320px" />
            </div>

            <div className="mt-4 border-t border-white/[0.07] pt-4">
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/40">
                Pesan error (opsional)
              </label>
              <input
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
                placeholder="Tempel pesan error di sini..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-white/30 outline-none transition-colors focus:border-neon-red/40"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <GradientButton onClick={handleExplain} loading={isLoading} icon={Send} className="flex-1">
                Jelaskan Error
              </GradientButton>
              <GradientButton
                variant="outline"
                icon={Eraser}
                onClick={() => {
                  setSourceCode("");
                  toast.success("Editor dikosongkan.");
                }}
              >
                Bersihkan
              </GradientButton>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-neon-amber" strokeWidth={1.75} />
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-white/60">Tips Penggunaan</h3>
            </div>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex gap-2"><span className="text-neon-red">â€¢</span> Tempel pesan error lengkap beserta stack trace.</li>
              <li className="flex gap-2"><span className="text-neon-red">â€¢</span> Sertakan kode di sekitar baris yang error.</li>
              <li className="flex gap-2"><span className="text-neon-red">â€¢</span> Beri feedback agar AI semakin akurat.</li>
            </ul>
          </GlassCard>
        </div>

        {/* Right: chat panel */}
        <GlassCard className="flex flex-col lg:sticky lg:top-24 lg:h-fit lg:max-h-[80vh]">
          <div className="mb-4 flex items-center gap-3 border-b border-white/[0.07] pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-[#050818]">
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white">Output</p>
              <p className="font-mono text-[10px] text-white/35">Respons dalam Bahasa Indonesia</p>
            </div>
          </div>

          <div className="chat-scroll flex-1 space-y-5 overflow-y-auto pr-1" style={{ maxHeight: "620px" }}>
            {messages.map((msg) => {
              const parsed =
                msg.role === "assistant"
                  ? parseAIResponse(msg.content)
                  : { explanation: msg.content, fixedCode: undefined, language: undefined };
              return (
              <div key={msg.id}>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                    {msg.role === "user" ? "> input_" : "// output_"}
                  </span>
                </div>
                <div
                  className={
                    msg.role === "user"
                      ? "rounded-2xl rounded-tr-sm border border-neon-red/20 bg-[linear-gradient(135deg,rgba(255,59,107,0.12),rgba(255,107,53,0.10))] px-4 py-3 text-sm leading-relaxed text-white/90"
                      : "rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white/80"
                  }
                >
                  <div className="prose-sm prose-invert max-w-none [&_a]:text-neon-red [&_h2]:text-white [&_h3]:text-white [&_li]:my-0.5 [&_p]:my-1.5 [&_strong]:text-white">
                    <ReactMarkdown
                      components={{
                        code: ({ children }) => (
                          <code className="rounded-md border border-white/10 bg-[#05060A] px-1.5 py-0.5 font-mono text-xs text-neon-red">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#05060A] p-3 font-mono text-xs text-white/85">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {parsed.explanation}
                    </ReactMarkdown>
                  </div>

                  {msg.role === "assistant" && parsed.fixedCode && (
                    <FixedCodeBlock code={parsed.fixedCode} language={parsed.language ?? language} />
                  )}

                  {msg.confidence && msg.role === "assistant" && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-3">
                      <BadgePill tone={msg.confidence >= 80 ? "green" : "amber"}>
                        Confidence {msg.confidence}%
                      </BadgePill>
                      {msg.errorCode && <BadgePill tone="pink">{msg.errorCode}</BadgePill>}
                    </div>
                  )}

                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <div className="mt-3 flex items-center gap-2 border-t border-white/[0.07] pt-3">
                      <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-white/35">Feedback:</span>
                      <button
                        onClick={() => handleFeedback(msg.id, "helpful")}
                        className={`rounded-lg px-2.5 py-1 font-mono text-[10px] transition-colors ${
                          msg.feedback === "helpful" ? "bg-neon-green/15 text-neon-green" : "text-white/45 hover:bg-white/[0.06]"
                        }`}
                      >
                        Bermanfaat
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, "not-helpful")}
                        className={`rounded-lg px-2.5 py-1 font-mono text-[10px] transition-colors ${
                          msg.feedback === "not-helpful" ? "bg-neon-pink/15 text-[#FF7C9C]" : "text-white/45 hover:bg-white/[0.06]"
                        }`}
                      >
                        Tidak membantu
                      </button>
                      <button
                        onClick={() => handleCopy(msg.content)}
                        className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-[10px] text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        {copied === msg.content.slice(0, 20) ? (
                          <span className="text-neon-green">Tersalin âœ“</span>
                        ) : (
                          <>
                            <ClipboardCopy className="h-3 w-3" /> Salin
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              );
            })}

            {isLoading && (
              <div>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-white/35">{"// processing"}</div>
                <div className="inline-flex items-center gap-2.5 rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-neon-red" />
                  <span className="font-mono text-xs text-white/50">Menganalisis kode &amp; mencari solusi...</span>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-neon-red">
                  <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="max-w-xs font-mono text-[11px] text-white/40">
                  Belum ada percakapan. Tempel kode lalu klik &quot;Jelaskan Error&quot; untuk memulai.
                </p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
