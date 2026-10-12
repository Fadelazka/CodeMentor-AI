"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Globe,
  Activity,
  Database,
  ShieldCheck,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { AdminUsageTrendChart, AdminPerformanceChart } from "@/components/admin/admin-charts";
import { KbModal } from "@/components/admin/kb-modal";
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal";
import { adminKpi, adminUsageTrend, adminAiPerformance, adminTopErrors } from "@/data/admin";
import { getLanguageLabel } from "@/lib/utils";
import toast from "react-hot-toast";

interface KnowledgeBaseRow {
  id: string;
  language: string;
  errorCode: string;
  title: string;
  description: string;
  solution: string;
  examples: string | null;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const kpiCards = [
  {
    title: "Total Permintaan API",
    value: adminKpi.totalRequest,
    icon: Activity,
    accent: "cyan" as const,
    change: "+18%",
    spark: [210, 340, 420, 560, 720, 900, 1080, 1240],
  },
  {
    title: "Permintaan Hari Ini",
    value: adminKpi.requestHariIni,
    icon: TrendingUp,
    accent: "green" as const,
    change: "+23%",
    spark: [88, 102, 96, 134, 142, 151, 158, 164],
  },
  {
    title: "Rekam Knowledge Base",
    value: adminKpi.aktifRekamKB,
    icon: Database,
    accent: "violet" as const,
    change: "5 bahasa",
    spark: [80, 96, 112, 128, 148, 172, 188, 200],
  },
  {
    title: "Uptime Layanan",
    value: adminKpi.uptime,
    icon: Globe,
    accent: "amber" as const,
    change: "30 hari",
    spark: [99.9, 99.97, 99.95, 99.99, 99.98, 99.99, 99.98, 99.98],
  },
];

const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
  python: "cyan",
  javascript: "amber",
  java: "violet",
  cpp: "pink",
  php: "green",
};

function formatUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<KnowledgeBaseRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<KnowledgeBaseRow | null>(null);
  const [deleting, setDeleting] = useState<KnowledgeBaseRow | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/knowledge-base", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal memuat data.");
      const json = await res.json();
      setRows(json.data ?? []);
    } catch (err) {
      console.error("Gagal memuat knowledge base:", err);
      toast.error("Gagal memuat knowledge base.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const filteredKb = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.errorCode.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.language.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  });

  const handleSaved = () => {
    setCreateOpen(false);
    setEditing(null);
    fetchRows();
  };

  const toggleActive = async (row: KnowledgeBaseRow) => {
    try {
      const res = await fetch(`/api/admin/knowledge-base?id=${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !row.isActive }),
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message ?? "Status rekaman diperbarui.");
        fetchRows();
      } else {
        toast.error(json.error ?? "Gagal memperbarui status.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat memperbarui status.");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeletingLoading(true);
    try {
      const res = await fetch(`/api/admin/knowledge-base?id=${deleting.id}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message ?? "Rekaman dihapus.");
        setDeleting(null);
        fetchRows();
      } else {
        toast.error(json.error ?? "Gagal menghapus rekaman.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat menghapus.");
    } finally {
      setDeletingLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Admin"
        icon={ShieldCheck}
        title="Dashboard Admin"
        description="Monitoring penggunaan, performa AI, dan knowledge base CodeMentor AI."
        actions={
          <BadgePill tone="green" dot className="px-3 py-1.5">
            <ShieldCheck className="mr-0.5 h-3.5 w-3.5" /> Mode Administrator Aktif
          </BadgePill>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((k) => (
          <MetricCard
            key={k.title}
            label={k.title}
            value={k.value}
            change={k.change}
            trending="up"
            positive
            icon={k.icon}
            accent={k.accent}
            spark={k.spark}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <GlassCardHeader>
            <div>
              <GlassCardTitle>Tren Penggunaan</GlassCardTitle>
              <p className="mt-0.5 text-xs text-white/45">Permintaan API &amp; pengguna aktif per bulan</p>
            </div>
          </GlassCardHeader>
          <AdminUsageTrendChart data={adminUsageTrend} />
        </GlassCard>

        <GlassCard>
          <GlassCardHeader>
            <div>
              <GlassCardTitle>Performa AI vs Target</GlassCardTitle>
              <p className="mt-0.5 text-xs text-white/45">
                Akurasi ≥85% • Respons &lt;5s • Kepuasan UAT ≥80%
              </p>
            </div>
          </GlassCardHeader>
          <AdminPerformanceChart data={adminAiPerformance} />
        </GlassCard>
      </div>

      <GlassCard className="mt-6">
        <GlassCardHeader>
          <GlassCardTitle>Error Paling Sering Dikonsultasikan</GlassCardTitle>
          <BadgePill tone="violet">5 besar</BadgePill>
        </GlassCardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {["Rank", "Error", "Bahasa", "Jumlah", "Tren"].map((h) => (
                  <th key={h} className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-white/40 last:pr-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {adminTopErrors.map((e) => (
                <tr key={e.rank} className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-4">
                    <span
                      className={
                        e.rank === 1
                          ? "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-xs font-bold text-[#050818]"
                          : "inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-semibold text-white/50"
                      }
                    >
                      {e.rank}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs font-medium text-white/90">{e.error}</td>
                  <td className="py-3 pr-4">
                    <BadgePill tone={langTone[e.bahasa.toLowerCase()] ?? "neutral"}>{e.bahasa}</BadgePill>
                  </td>
                  <td className="py-3 pr-4 font-semibold text-white">{e.jumlah}</td>
                  <td className="py-3">
                    <BadgePill tone={e.tren.startsWith("-") ? "green" : "amber"}>{e.tren}</BadgePill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="mt-6">
        <GlassCardHeader className="flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <GlassCardTitle>Kelola Knowledge Base</GlassCardTitle>
            <p className="mt-0.5 text-xs text-white/45">Rekaman error yang tersedia untuk RAG retrieval</p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari rekaman..."
                className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-neon-red/40 focus:bg-white/[0.06] sm:w-56"
              />
            </div>
            <GradientButton size="md" icon={Plus} onClick={() => setCreateOpen(true)}>
              Tambah
            </GradientButton>
          </div>
        </GlassCardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {["ID", "Bahasa", "Error", "Judul", "Diperbarui", "Status", "Aksi"].map((h) => (
                  <th key={h} className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-white/40 last:pr-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-white/40">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin text-[#FF3B6B]" />
                    Memuat rekaman knowledge base...
                  </td>
                </tr>
              ) : filteredKb.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-white/40">
                    {search ? "Tidak ada rekaman yang cocok." : "Belum ada rekaman knowledge base."}
                  </td>
                </tr>
              ) : (
                filteredKb.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-3.5 pr-4 font-mono text-xs text-white/45">{r.id}</td>
                    <td className="py-3.5 pr-4">
                      <BadgePill tone={langTone[r.language] ?? "neutral"}>{getLanguageLabel(r.language)}</BadgePill>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-xs font-medium text-white/85">{r.errorCode}</td>
                    <td className="py-3.5 pr-4 text-white/55">{r.title}</td>
                    <td className="py-3.5 pr-4 text-xs text-white/40">{formatUpdatedAt(r.updatedAt)}</td>
                    <td className="py-3.5 pr-4">
                      <button
                        onClick={() => toggleActive(r)}
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                          r.isActive
                            ? "border-neon-green/25 bg-neon-green/12 text-neon-green"
                            : "border-white/10 bg-white/[0.04] text-white/45"
                        }`}
                      >
                        {r.isActive ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="py-3.5">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditing(r)}
                          className="rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-neon-red"
                          aria-label="Edit rekaman"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(r)}
                          className="rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-[#FF7C9C]"
                          aria-label="Hapus rekaman"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <KbModal
        isOpen={createOpen}
        record={null}
        onClose={() => setCreateOpen(false)}
        onSaved={handleSaved}
      />

      <KbModal
        isOpen={Boolean(editing)}
        record={editing}
        onClose={() => setEditing(null)}
        onSaved={handleSaved}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        isLoading={deletingLoading}
        title="Hapus Rekaman Error?"
        description={
          deleting
            ? `Rekaman "${deleting.errorCode} — ${deleting.title}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`
            : "Tindakan ini tidak dapat dibatalkan."
        }
      />
    </div>
  );
}