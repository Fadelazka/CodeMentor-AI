"use client";

import { useState } from "react";
import { Search, History, Download, Eye, Trash2, SlidersHorizontal, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { EmptyState } from "@/components/ui/empty-state";
import { mockChatResponses } from "@/data/mock";
import { getLanguageLabel, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
  python: "cyan",
  javascript: "amber",
  java: "violet",
  cpp: "pink",
  php: "green",
};

export default function RiwayatPage() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [rows, setRows] = useState(mockChatResponses);

  const filtered = rows.filter((r) => {
    const matchSearch =
      r.errorCode.toLowerCase().includes(search.toLowerCase()) ||
      r.sourceCode.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === "all" || r.language === langFilter;
    return matchSearch && matchLang;
  });

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast.success("Riwayat dihapus.");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Riwayat"
        icon={History}
        title="Riwayat Analisis"
        description="Semua error yang pernah Anda tanyakan, tersimpan rapi untuk dipelajari kembali."
        actions={
          <GradientButton
            variant="outline"
            icon={Download}
            onClick={() => toast.success("Mengekspor seluruh riwayat (demo).")}
          >
            Ekspor
          </GradientButton>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_200px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari error, atau kata kunci dalam kode..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-neon-red/40 focus:bg-white/[0.06]"
          />
        </div>
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-sm text-white/80 outline-none transition-colors focus:border-neon-red/40 [&>option]:bg-[#0A0B14]"
        >
          <option value="all">Semua Bahasa</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="php">PHP</option>
        </select>
        <GradientButton variant="outline" icon={SlidersHorizontal} className="h-11">
          Filter
        </GradientButton>
      </div>

      {(search || langFilter !== "all") && (
        <button
          onClick={() => {
            setSearch("");
            setLangFilter("all");
          }}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-neon-red"
        >
          <X className="h-3.5 w-3.5" /> Reset filter
        </button>
      )}

      <div className="mt-6 space-y-4">
        {filtered.length === 0 && (
          <EmptyState
            icon={History}
            title="Belum ada riwayat"
            description="Coba tanyakan error pertama Anda di halaman Chat AI."
            action={<GradientButton href="/chat">Mulai Bertanya</GradientButton>}
          />
        )}

        {filtered.map((r) => (
          <GlassCard key={r.id} className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <BadgePill tone={langTone[r.language] ?? "neutral"}>
                    {getLanguageLabel(r.language)}
                  </BadgePill>
                  <BadgePill tone="pink">{r.errorCode}</BadgePill>
                  {r.confidence && (
                    <BadgePill tone={r.confidence >= 85 ? "green" : "amber"}>
                      Confidence {r.confidence}%
                    </BadgePill>
                  )}
                  {r.feedback && (
                    <BadgePill tone={r.feedback === "helpful" ? "green" : "neutral"}>
                      {r.feedback === "helpful" ? "âœ“ Bermanfaat" : "âœ— Tidak membantu"}
                    </BadgePill>
                  )}
                  <span className="text-[11px] text-white/35">{formatDate(r.createdAt)}</span>
                </div>
                <pre className="mb-3 line-clamp-2 overflow-hidden rounded-xl border border-white/[0.07] bg-[#05060A]/60 px-3.5 py-2.5 font-mono text-[11px] leading-relaxed text-white/55">
                  {r.sourceCode}
                </pre>
                <p className="line-clamp-2 text-sm text-white/50">{r.aiResponse.slice(0, 200)}...</p>
              </div>
              <div className="flex shrink-0 gap-2 sm:flex-col">
                <GradientButton
                  size="sm"
                  variant="outline"
                  icon={Eye}
                  onClick={() => toast("Buka detail analisis (demo).")}
                >
                  Buka
                </GradientButton>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs text-white/45 transition-colors hover:border-neon-pink/40 hover:text-[#FF7C9C]"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {filtered.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
          <p className="font-mono text-[11px] text-white/40">
            Menampilkan {filtered.length} dari {rows.length} riwayat
          </p>
          <div className="flex gap-2">
            <GradientButton variant="outline" size="sm" disabled>
              Sebelumnya
            </GradientButton>
            <GradientButton variant="outline" size="sm" disabled>
              Berikutnya
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  );
}
