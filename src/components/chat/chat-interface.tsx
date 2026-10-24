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
import { CheckCircle2 } from "lucide-react";
import { CodeEditor } from "@/components/chat/code-editor";
import { FixedCodeBlock } from "@/components/chat/fixed-code-block";
import { CorrectCodeBanner } from "@/components/chat/correct-code-banner";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { languages } from "@/data/mock";
import { useSettings } from "@/contexts/SettingsContext";
import { addNotification } from "@/lib/notifications";
import toast from "react-hot-toast";
import { LanguageDropdown } from "@/components/chat/language-dropdown";
import { FeedbackButtons } from "@/components/chat/feedback-buttons";

const USED_LANGUAGES_KEY = "codementor_used_languages";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  errorCode?: string;
  chatHistoryId?: string;
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

function isCodeCorrectResponse(text: string): boolean {
  return /sudah benar|100%|kode benar|tidak ada error/i.test(text.slice(0, 200));
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
          aiLanguage: settings.aiLanguage,
          aiDetailLevel: settings.aiDetailLevel,
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
          chatHistoryId: data.chatHistoryId ?? data.id,
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
          {/* Tambahan bg-white dark:bg-[#0B0E14] agar solid */}
          <GlassCard className="bg-white dark:bg-[#0B0E14] border-slate-200 dark:border-slate-800">
            <div className="mb-4 flex items-center justify-between gap-3">
              <LanguageDropdown value={language} onChange={setLanguage} />
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">.{activeLanguage?.extensions}</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#06080c]">
              <CodeEditor value={sourceCode} onChange={setSourceCode} language={language} height="320px" />
            </div>

            <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Pesan error (opsional)
              </label>
              <input
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
                placeholder="Tempel pesan error di sini..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-neon-red/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
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

          {/* Tambahan bg-white dark:bg-[#0B0E14] agar solid */}
          <GlassCard className="bg-white dark:bg-[#0B0E14] border-slate-200 dark:border-slate-800">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-neon-amber" strokeWidth={1.75} />
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Tips Penggunaan</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2"><span className="text-neon-red">•</span> Tempel pesan error lengkap beserta stack trace.</li>
              <li className="flex gap-2"><span className="text-neon-red">•</span> Sertakan kode di sekitar baris yang error.</li>
              <li className="flex gap-2"><span className="text-neon-red">•</span> Beri feedback agar AI semakin akurat.</li>
            </ul>
          </GlassCard>
        </div>

        {/* Right: chat panel */}
        {/* Tambahan bg-white dark:bg-[#0B0E14] agar solid */}
        <GlassCard className="flex flex-col lg:sticky lg:top-24 lg:h-fit lg:max-h-[80vh] bg-white dark:bg-[#0B0E14] border-slate-200 dark:border-slate-800">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-[#050818]">
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-900 dark:text-white">Output</p>
              <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400">Respons dalam Bahasa Indonesia</p>
            </div>
          </div>

          <div className="chat-scroll flex-1 space-y-5 overflow-y-auto pr-1" style={{ maxHeight: "620px" }}>
            {messages.map((msg) => {
              const parsed =
                msg.role === "assistant"
                  ? parseAIResponse(msg.content)
                  : { explanation: msg.content, fixedCode: undefined, language: undefined };
              const isCorrect = msg.role === "assistant" && isCodeCorrectResponse(msg.content);
              return (
              <div key={msg.id}>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {msg.role === "user" ? "> input_" : "// output_"}
                  </span>
                </div>
                <div
                  className={
                    msg.role === "user"
                      ? "rounded-2xl rounded-tr-sm border border-neon-red/20 bg-[linear-gradient(135deg,rgba(255,59,107,0.12),rgba(255,107,53,0.10))] px-4 py-3 text-sm leading-relaxed text-slate-900 dark:text-white/90"
                      : "rounded-2xl rounded-tl-sm border px-4 py-3 text-sm leading-relaxed bg-slate-50 dark:bg-[#06080c] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  }
                >
                  {isCorrect ? (
                    <CorrectCodeBanner explanation={parsed.explanation} />
                  ) : (
                    <>
                      <div className="prose-sm max-w-none text-slate-700 dark:text-slate-300 [&_a]:text-neon-red [&_li]:my-0.5 [&_p]:my-1.5">
                        <ReactMarkdown
                          components={{
                            code: ({ children }) => (
                              <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-neon-red dark:border-slate-800 dark:bg-slate-900">
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-3 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
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
                    </>
                  )}

                  {msg.confidence && msg.role === "assistant" && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                      <BadgePill tone={msg.confidence >= 80 ? "green" : "amber"}>
                        Confidence {msg.confidence}%
                      </BadgePill>
                      {msg.errorCode && <BadgePill tone="pink">{msg.errorCode}</BadgePill>}
                    </div>
                  )}

                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <div className="mt-3 flex items-center gap-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                      <button
                        onClick={() => handleCopy(msg.content)}
                        className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-[10px] text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {copied === msg.content.slice(0, 20) ? (
                          <span className="text-neon-green">Tersalin ✓</span>
                        ) : (
                          <>
                            <ClipboardCopy className="h-3 w-3" /> Salin
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {msg.role === "assistant" && msg.id !== "welcome" && msg.chatHistoryId && (
                    <FeedbackButtons
                      chatHistoryId={msg.chatHistoryId}
                      initialFeedback={msg.feedback}
                    />
                  )}
                </div>
              </div>
              );
            })}

            {isLoading && (
              <div>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{"// processing"}</div>
                <div className="inline-flex items-center gap-2.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-[#06080c]">
                  <Loader2 className="h-4 w-4 animate-spin text-neon-red" />
                  <span className="font-mono text-xs text-slate-700 dark:text-slate-300">Menganalisis kode &amp; mencari solusi...</span>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-neon-red dark:border-white/10 dark:bg-white/[0.04]">
                  <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="max-w-xs font-mono text-[11px] text-slate-500 dark:text-slate-400">
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