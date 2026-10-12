"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  MessageSquare,
  Terminal,
  Sparkles,
  Eraser,
  Send,
  Loader2,
  ClipboardCopy,
  AlertTriangle,
  Trash2,
  Eye,
  History,
} from "lucide-react";
import { CodeEditor } from "@/components/chat/code-editor";
import { FixedCodeBlock } from "@/components/chat/fixed-code-block";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { languages } from "@/data/mock";
import { getLanguageLabel, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

interface HistoryDetail {
  id: string;
  language: string;
  errorCode: string | null;
  errorMessage: string | null;
  sourceCode: string;
  aiResponse: string;
  confidence: number | null;
  createdAt: string;
}

function parseAIResponse(text: string) {
  let remaining = text;
  let fixedCode: string | undefined;
  let brokenCode: string | undefined;
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
  if (brokenMatch) {
    brokenCode = brokenMatch[2].trim();
  }

  return { explanation: remaining.trim(), brokenCode, fixedCode, language };
}

function isCodeCorrectResponse(text: string): boolean {
  return /sudah benar|100%|kode benar|tidak ada error/i.test(text.slice(0, 200));
}

export default function RiwayatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [history, setHistory] = useState<HistoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/history?id=${params.id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setHistory(data.data);
          } else {
            setError("Riwayat tidak ditemukan");
          }
        } else {
          setError("Gagal memuat riwayat");
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Gagal memuat riwayat");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Hapus riwayat ini? Tindakan ini tidak dapat dibatalkan.")) return;
    try {
      const res = await fetch(`/api/history?id=${params.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Riwayat dihapus");
        router.push("/riwayat");
      } else {
        toast.error("Gagal menghapus riwayat");
      }
    } catch {
      toast.error("Gagal menghapus riwayat");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          eyebrow="Riwayat"
          icon={History}
          title="Memuat..."
          description="Memuat detail riwayat analisis"
        />
        <div className="mt-8 space-y-4">
          <div className="h-96 animate-pulse bg-white/[0.02] rounded-2xl border border-white/[0.06]" />
        </div>
      </div>
    );
  }

  if (error || !history) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          eyebrow="Riwayat"
          icon={History}
          title="Riwayat Tidak Ditemukan"
          description="Riwayat yang Anda cari tidak ditemukan atau telah dihapus."
        />
        <div className="mt-8">
          <Link href="/riwayat">
            <GradientButton icon={ArrowLeft}>Kembali ke Riwayat</GradientButton>
          </Link>
        </div>
      </div>
    );
  }

  const activeLanguage = languages.find((l) => l.value === history.language);
  const isCorrect = isCodeCorrectResponse(history.aiResponse);
  const parsed = parseAIResponse(history.aiResponse);

  const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
    python: "cyan",
    javascript: "amber",
    java: "violet",
    cpp: "pink",
    php: "green",
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Riwayat"
        icon={History}
        title="Detail Analisis"
        description={`Analisis ${getLanguageLabel(history.language)} • ${formatDate(history.createdAt)}`}
        actions={
          <div className="flex gap-2">
            <Link href="/riwayat">
              <GradientButton variant="outline" icon={ArrowLeft} size="sm">
                Kembali
              </GradientButton>
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neon-pink/40 bg-neon-pink/[0.08] px-3 py-2 text-sm font-medium text-neon-pink transition-colors hover:bg-neon-pink/15"
            >
              <Trash2 className="h-4 w-4" />
              Hapus
            </button>
          </div>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Left: Source Code */}
        <GlassCard className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BadgePill tone={history.language === "python" ? "cyan" : history.language === "javascript" ? "amber" : history.language === "java" ? "violet" : history.language === "cpp" ? "pink" : "green"}>
                {activeLanguage?.label ?? history.language}
              </BadgePill>
              {history.errorCode && (
                <BadgePill tone="pink">{history.errorCode}</BadgePill>
              )}
              <span className="text-[11px] text-white/35">{formatDate(history.createdAt)}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <CodeEditor
              value={history.sourceCode}
              onChange={() => {}}
              language={history.language}
              height="400px"
              readOnly
            />
          </div>

          {history.errorMessage && (
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/[0.08] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-400 mb-2">Pesan Error</p>
              <pre className="font-mono text-xs text-amber-300 whitespace-pre-wrap">{history.errorMessage}</pre>
            </div>
          )}
        </GlassCard>

        {/* Right: AI Response */}
        <GlassCard className="flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-[#050818]">
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white">Output</p>
              <p className="font-mono text-[10px] text-white/35">Respons dalam Bahasa Indonesia</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            <div
              className="rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white/80"
            >
              {history.aiResponse.includes("SUDAH BENAR") || history.aiResponse.includes("100%") || history.aiResponse.includes("kode benar") || history.aiResponse.includes("tidak ada error") ? (
                <div className="my-4 rounded-lg border border-emerald-500/40 bg-emerald-500/[0.08] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-emerald-400 mb-1">✓ Kode ini sudah benar 100%</h3>
                      <p className="text-sm text-emerald-100/80 leading-relaxed">{parsed.explanation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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

                  {parsed.fixedCode && (
                    <FixedCodeBlock code={parsed.fixedCode} language={parsed.language ?? history.language} />
                  )}
                </>
              )}
            </div>

            {history.confidence && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-3">
                <BadgePill tone={history.confidence >= 80 ? "green" : "amber"}>
                  Confidence {history.confidence}%
                </BadgePill>
                {history.errorCode && <BadgePill tone="pink">{history.errorCode}</BadgePill>}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}