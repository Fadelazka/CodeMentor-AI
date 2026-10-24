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

const FIXED_HEADING_KEYWORD =
  "(?:Sudah\\s+)?(?:Dibenarkan|Diperbaiki|Diperbaharui|Dibetulkan|Perbaikan|Benar|Corrected|Fixed)";
const BROKEN_HEADING_KEYWORD =
  "(?:Bermasalah|Salah|Rusak|Bermasalah|Problematic|Original|Asli)";

function sectionPatterns(keyword: string, requireClosingFence: boolean): RegExp[] {
  const heading = `(?:^|\\n)[ \\t]*(?:#{1,6}[ \\t]*|\\*\\*[ \\t]*|__[ \\t]*)Kode[ \\t]+(?:yang[ \\t]+)?${keyword}[^\\n]*\\n+[ \\t]*\`\`\`[ \\t]*(\\w+)?[ \\t]*\\n`;
  const body = requireClosingFence ? "([\\s\\S]*?)```" : "([\\s\\S]*)$";
  return [new RegExp(heading + body, "i")];
}

function firstMatch(text: string, patterns: RegExp[]): RegExpMatchArray | null {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match;
  }
  return null;
}

function parseAIResponse(text: string) {
  let remaining = text;
  let fixedCode: string | undefined;
  let brokenCode: string | undefined;
  let language: string | undefined;

  const fixedMatch =
    firstMatch(remaining, sectionPatterns(FIXED_HEADING_KEYWORD, true)) ??
    firstMatch(remaining, sectionPatterns(FIXED_HEADING_KEYWORD, false));
  if (fixedMatch) {
    language = fixedMatch[1] || undefined;
    fixedCode = fixedMatch[2].trim();
    remaining = remaining.replace(fixedMatch[0], "\n");
  }

  const brokenMatch = firstMatch(remaining, sectionPatterns(BROKEN_HEADING_KEYWORD, true));
  brokenCode = brokenMatch ? brokenMatch[2].trim() : undefined;

  if (!fixedCode) {
    const blocks = Array.from(
      remaining.matchAll(/```[ \t]*(\w+)?[ \t]*\n([\s\S]*?)```/g)
    );
    if (blocks.length >= 2) {
      const last = blocks[blocks.length - 1];
      fixedCode = last[2].trim();
      language = last[1] || language;
      remaining = remaining.replace(last[0], "\n");
    }
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
          <div className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/[0.06] dark:bg-white/[0.02]" />
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
              <span className="text-[11px] text-slate-500 dark:text-white/35">{formatDate(history.createdAt)}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
            <CodeEditor
              value={history.sourceCode}
              onChange={() => {}}
              language={history.language}
              height="400px"
              readOnly
            />
          </div>

          {history.errorMessage && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/[0.08]">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400">Pesan Error</p>
              <pre className="whitespace-pre-wrap font-mono text-xs text-amber-800 dark:text-amber-300">{history.errorMessage}</pre>
            </div>
          )}
        </GlassCard>

        {/* Right: AI Response */}
        <GlassCard className="flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-white/[0.07]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-[#050818]">
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-900 dark:text-white">Output</p>
              <p className="font-mono text-[10px] text-slate-500 dark:text-white/35">Respons dalam Bahasa Indonesia</p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/80">
              {history.aiResponse.includes("SUDAH BENAR") || history.aiResponse.includes("100%") || history.aiResponse.includes("kode benar") || history.aiResponse.includes("tidak ada error") ? (
                <div className="my-4 rounded-lg border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-500/40 dark:bg-emerald-500/[0.08]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-emerald-700 dark:text-emerald-400">✓ Kode ini sudah benar 100%</h3>
                      <p className="text-sm leading-relaxed text-emerald-800 dark:text-emerald-100/80">{parsed.explanation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="prose-sm max-w-none text-slate-700 [&_a]:text-neon-red [&_h2]:text-slate-900 [&_h3]:text-slate-900 [&_li]:my-0.5 [&_p]:my-1.5 [&_strong]:text-slate-900 dark:text-slate-300 dark:[&_h2]:text-white dark:[&_h3]:text-white dark:[&_strong]:text-white">
                    <ReactMarkdown
                      components={{
                        code: ({ children }) => (
                          <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-neon-red dark:border-white/10 dark:bg-[#05060A]">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-3 font-mono text-xs text-slate-800 dark:border-white/10 dark:bg-[#05060A] dark:text-white/85">
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
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 dark:border-white/[0.07]">
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
