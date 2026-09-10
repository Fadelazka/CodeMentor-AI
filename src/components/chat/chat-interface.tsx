"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, ThumbsUp, ThumbsDown, Loader2, ClipboardCopy, Check, BookOpen, AlertTriangle } from "lucide-react";
import { CodeEditor } from "@/components/chat/code-editor";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    "Halo! Saya adalah **CodeMentor AI** 👋\n\nTempel kode Anda pada editor di samping, lalu klik **'Jelaskan Error'**.\n\nSaya akan menganalisis error dan menjelaskan penyebab serta solusinya dalam **Bahasa Indonesia**.",
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
    <div className="container-custom py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Chat AI Debugging
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tempel kode, pilih bahasa, dan klik jelaskan error untuk mendapatkan penjelasan dalam Bahasa Indonesia.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Badge variant="info">
            <Sparkles className="mr-1 h-3 w-3" />
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
              <span className="text-xs text-slate-400">
                {languages.find((l) => l.value === language)?.extensions}
              </span>
            </div>

            <CodeEditor
              value={sourceCode}
              onChange={setSourceCode}
              language={language}
              height="320px"
            />

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Pesan error (opsional)
              </label>
              <input
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
                placeholder="Tempel pesan error di sini..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <Button onClick={handleExplain} loading={isLoading} className="flex-1">
                {!isLoading && <Sparkles className="h-4 w-4" />}
                Jelaskan Error
              </Button>
              <Button variant="outline" onClick={() => { setSourceCode(""); toast.success("Editor dikosongkan."); }}>
                Bersihkan
              </Button>
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Tips Penggunaan
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
              <li>• Tempel pesan error lengkap beserta stack trace untuk hasil yang lebih akurat.</li>
              <li>• Sertakan kode di sekeliling baris yang errornya.</li>
              <li>• Beri feedback setelah jawaban untuk membantu AI semakin baik.</li>
            </ul>
          </Card>
        </div>

        {/* Right: Chat panel */}
        <Card className="flex flex-col lg:sticky lg:top-20 lg:h-fit lg:max-h-[80vh]">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Jawaban CodeMentor AI</h2>
              <p className="text-xs text-slate-500">Respons dalam Bahasa Indonesia</p>
            </div>
          </div>

          <div className="chat-scroll flex-1 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "560px" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50"
                  }`}
                >
                  <div className="prose-sm prose dark:prose-invert">
                    <ReactMarkdown
                      components={{
                        code: ({ children }) => (
                          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-900">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  {msg.confidence && msg.role === "assistant" && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          msg.confidence >= 80
                            ? "success"
                            : msg.confidence >= 60
                              ? "warning"
                              : "danger"
                        }
                      >
                        Confidence: {msg.confidence}%
                      </Badge>
                      {msg.errorCode && (
                        <Badge variant="outline">{msg.errorCode}</Badge>
                      )}
                    </div>
                  )}

                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
                      <span className="mr-1 text-xs text-slate-400">Feedback:</span>
                      <button
                        onClick={() => handleFeedback(msg.id, "helpful")}
                        className={`rounded-lg p-1.5 transition-colors ${
                          msg.feedback === "helpful"
                            ? "bg-green-500/10 text-green-500"
                            : "text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                        title="Bermanfaat"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, "not-helpful")}
                        className={`rounded-lg p-1.5 transition-colors ${
                          msg.feedback === "not-helpful"
                            ? "bg-red-500/10 text-red-500"
                            : "text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                        title="Tidak bermanfaat"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => copyCode(msg.content)}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Salin jawaban"
                      >
                        {copied === msg.content.slice(0, 20) ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <ClipboardCopy className="h-4 w-4" />
                        )}
                      </button>
                      <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                        <BookOpen className="h-3 w-3" />
                        Materi terkait
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <p className="mt-1 text-xs text-slate-500">Menganalisis kode &amp; mencari solusi...</p>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <p className="py-8 text-center text-sm text-slate-400">
                Belum ada percakapan. Tempel kode dan klik &quot;Jelaskan Error&quot; untuk memulai.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}