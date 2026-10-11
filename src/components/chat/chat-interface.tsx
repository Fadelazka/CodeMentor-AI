"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, ClipboardCopy, Check, BookOpen, AlertTriangle, Terminal } from "lucide-react";
import { CodeEditor } from "@/components/chat/code-editor";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { languages } from "@/data/mock";
import toast from "react-hot-toast";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  errorCode?: string;
  feedback?: "helpful" | "not-helpful";
  createdAt: Date;
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
  const [sourceCode, setSourceCode] = useState<string>(
    "# Tempel kode Anda di sini\n\ndef hitung_ratarata(nilai):\n    total = 0\n    for n in nilai:\n        total += n\n    return total / len(nilai)\n\nprint(hitung_ratarata([]))"
  );
  const [language, setLanguage] = useState("python");
  const [messages, setMessages] = useState<Msg[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleExplain = async () => {
    if (!sourceCode.trim()) {
      toast.error("Mohon tempel atau tulis kode terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    const userMsg: Msg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: `**${languages.find((l) => l.value === language)?.label ?? language}**${
        errorInput ? ` — Error: \`${errorInput}\`` : ""
      }\n\n\`\`\`${language}\n${sourceCode}\n\`\`\``,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const mockResponse: Msg = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content:
          "## Error `ZeroDivisionError`\n\n**Penyebab:**\n\nFungsi `hitung_ratarata()` membagi `total` dengan `len(nilai)`. Ketika `nilai` berupa list kosong `[]`, nilai `len(nilai)` adalah **0**, sehingga terjadi pembagian dengan nol.\n\n**Perbaikan:**\n\n```python\ndef hitung_ratarata(nilai):\n    if not nilai:\n        return 0\n    total = 0\n    for n in nilai:\n        total += n\n    return total / len(nilai)\n```\n\n**Penjelasan tambahan:**\n\n- Validasi `if not nilai` mengecek apakah list kosong.\n- Mengembalikan 0 menghindari pembagian dengan nol.\n\n**Materi rekomendasi:**\n1. List Comprehension Dasar\n2. Validasi Input\n3. Operasi Aritmatika",
        confidence: 92,
        errorCode: "ZeroDivisionError",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, mockResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFeedback = (msgId: string, feedback: "helpful" | "not-helpful") => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback } : m))
    );
    toast.success(
      feedback === "helpful" ? "Terima kasih atas feedback Anda!" : "Feedback Anda dicatat untuk perbaikan."
    );
  };

  const copyCode = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(content.slice(0, 20));
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container-editorial py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Eyebrow index="//" label="CHAT AI DEBUGGING" className="mb-3" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Jelaskan Error
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tempel kode, pilih bahasa, dan klik jelaskan error untuk mendapatkan penjelasan dalam Bahasa Indonesia.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">
            <Terminal className="mr-1.5 h-3 w-3" />
            Groq Llama 3.1 + RAG
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Code editor */}
        <div className="space-y-4">
          <Card>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={languages.map((l) => ({
                    value: l.value,
                    label: `${l.icon} ${l.label}`,
                  }))}
                  className="w-44"
                />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                {languages.find((l) => l.value === language)?.extensions}
              </span>
            </div>

            <CodeEditor
              value={sourceCode}
              onChange={setSourceCode}
              language={language}
              height="320px"
            />

            <div className="mt-4 border-t border-border pt-4">
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Pesan error (opsional)
              </label>
              <input
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
                placeholder="Tempel pesan error di sini..."
                className="w-full rounded-sm border border-input bg-transparent px-3 py-2 font-mono text-xs outline-none focus:border-foreground dark:focus:border-paper"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <Button onClick={handleExplain} loading={isLoading} className="flex-1">
                Jelaskan Error
              </Button>
              <Button variant="outline" onClick={() => { setSourceCode(""); toast.success("Editor dikosongkan."); }}>
                Bersihkan
              </Button>
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-foreground">
                Tips Penggunaan
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Tempel pesan error lengkap beserta stack trace untuk hasil yang lebih akurat.</li>
              <li>• Sertakan kode di sekeliling baris yang errornya.</li>
              <li>• Beri feedback setelah jawaban untuk membantu AI semakin baik.</li>
            </ul>
          </Card>
        </div>

        {/* Right: Chat panel */}
        <Card className="flex flex-col lg:sticky lg:top-20 lg:h-fit lg:max-h-[80vh]">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink text-paper dark:bg-paper dark:text-ink">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-foreground">OUTPUT</p>
              <p className="font-mono text-[10px] text-muted-foreground">Respons dalam Bahasa Indonesia</p>
            </div>
          </div>

          <div className="chat-scroll flex-1 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "560px" }}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {msg.role === "user" ? "> input_" : "// output_"}
                  </span>
                </div>
                <div
                  className={`rounded-sm px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  <div className="prose-sm prose dark:prose-invert">
                    <ReactMarkdown
                      components={{
                        code: ({ children }) => (
                          <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto rounded-sm bg-ink p-3 font-mono text-xs text-paper">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  {msg.confidence && msg.role === "assistant" && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                      <Badge variant={msg.confidence >= 80 ? "success" : "warning"}>
                        Confidence: {msg.confidence}%
                      </Badge>
                      {msg.errorCode && (
                        <Badge variant="outline">{msg.errorCode}</Badge>
                      )}
                    </div>
                  )}

                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                      <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Feedback:</span>
                      <button
                        onClick={() => handleFeedback(msg.id, "helpful")}
                        className={`rounded-sm px-2 py-1 font-mono text-[10px] transition-colors cursor-pointer ${
                          msg.feedback === "helpful"
                            ? "bg-success/10 text-success"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Bermanfaat
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, "not-helpful")}
                        className={`rounded-sm px-2 py-1 font-mono text-[10px] transition-colors cursor-pointer ${
                          msg.feedback === "not-helpful"
                            ? "bg-accent/10 text-accent"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Tidak membantu
                      </button>
                      <button
                        onClick={() => copyCode(msg.content)}
                        className="ml-auto rounded-sm px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-muted cursor-pointer"
                        title="Salin jawaban"
                      >
                        {copied === msg.content.slice(0, 20) ? (
                          <span className="text-success">Tersalin ✓</span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <ClipboardCopy className="h-3 w-3" />
                            Salin
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {"// processing"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">Menganalisis kode &amp; mencari solusi...</span>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <p className="py-8 text-center font-mono text-[11px] text-muted-foreground">
                Belum ada percakapan. Tempel kode dan klik &quot;Jelaskan Error&quot; untuk memulai.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}