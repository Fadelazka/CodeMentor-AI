"use client";

import { useState, useEffect } from "react";
import { Search, History, Download, Eye, Trash2, SlidersHorizontal, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { getLanguageLabel, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
  python: "cyan",
  javascript: "amber",
  java: "violet",
  cpp: "pink",
  php: "green",
};

interface HistoryItem {
  id: string;
  language: string;
  errorCode: string | null;
  sourceCode: string;
  aiResponse: string;
  confidence: number | null;
  createdAt: string;
}

export default function RiwayatPage() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [rows, setRows] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (langFilter !== "all") params.set("language", langFilter);
        params.set("limit", "50");
        const res = await fetch(`/api/history?${params.toString()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setRows(data.data || []);
          setTotalCount(data.count || 0);
        } else {
          toast.error("Gagal memuat riwayat.");
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
        toast.error("Gagal memuat riwayat.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [langFilter]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRows((prev) => prev.filter((r) => r.id !== id));
        toast.success("Riwayat dihapus.");
      } else {
        const err = await res.json().catch(() => ({ error: "Gagal menghapus" }));
        toast.error(err.error || "Gagal menghapus riwayat.");
      }
    } catch (err) {
      console.error("Failed to delete history:", err);
      toast.error("Gagal menghapus riwayat.");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Hapus SEMUA riwayat? Tindakan ini tidak dapat dibatalkan.")) return;
    try {
      const res = await fetch("/api/history?all=1", { method: "DELETE" });
      if (res.ok) {
        setRows([]);
        toast.success("Semua riwayat dihapus.");
      } else {
        toast.error("Gagal menghapus semua riwayat.");
      }
    } catch (err) {
      toast.error("Gagal menghapus semua riwayat.");
    }
  };

  const filtered = rows.filter((r) => {
    const matchSearch =
      r.errorCode?.toLowerCase().includes(search.toLowerCase()) ||
      r.sourceCode.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === "all" || r.language === langFilter;
    return matchSearch && matchLang;
  });

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          eyebrow="Riwayat"
          icon={History}
          title="Riwayat Analisis"
          description="Semua error yang pernah Anda tanyakan, tersimpan rapi untuk dipelajari kembali."
        />
        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <LoadingSkeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Riwayat"
        icon={History}
        title="Riwayat Analisis"
        description="Semua error yang pernah Anda tanyakan, tersimpan rapi untuk dipelajari kembali."
        actions={
          <div className="flex gap-2">
            <GradientButton variant="outline" icon={Download} onClick={() => toast.success("Mengekspor seluruh riwayat (demo).")}>
              Ekspor
            </GradientButton>
            {rows.length > 0 && (
              <GradientButton variant="outline" icon={Trash2} onClick={handleDeleteAll} className="text-neon-red border-neon-red/40 hover:bg-neon-red/10">
                Hapus Semua
              </GradientButton>
            )}
          </div>
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
        {filtered.length === 0 && rows.length > 0 && (
          <EmptyState
            icon={History}
            title="Tidak ada hasil filter"
            description="Coba ubah kata kunci atau filter bahasa."
          />
        )}

        {filtered.length === 0 && rows.length === 0 && (
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
                  <BadgePill tone="pink">{r.errorCode ?? "N/A"}</BadgePill>
                  {r.confidence && (
                    <BadgePill tone={r.confidence >= 85 ? "green" : "amber"}>
                      Confidence {r.confidence}%
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
                <Link href={`/riwayat/${r.id}`}>
                  <button
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/45 transition-colors hover:border-neon-red/40 hover:text-white"
                  >
                    <Eye className="h-3.5 w-3.5" /> Buka
                  </button>
                </Link>
                <button
                  onClick={() => {
                    const confirmed = confirm("Hapus riwayat ini?");
                    if (confirmed) {
                      fetch(`/api/history?id=${r.id}`, { method: "DELETE" }).then((res) => {
                        if (res.ok) {
                          setRows((prev) => prev.filter((item) => item.id !== r.id));
                          toast.success("Riwayat dihapus.");
                        } else {
                          toast.error("Gagal menghapus riwayat.");
                        }
                      });
                    }
                  }}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs text-white/45 transition-colors hover:border-neon-pink/40 hover:text-[#FF7C9C]"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus
                </button>
              </div>
            </div>
          </GlassCard>
        ))}

        {filtered.length === 0 && rows.length > 0 && (
          <EmptyState
            icon={History}
            title="Tidak ada hasil filter"
            description="Coba ubah kata kunci atau filter bahasa."
          />
        )}
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