"use client";

import { useState } from "react";
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
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { AdminUsageTrendChart, AdminPerformanceChart } from "@/components/admin/admin-charts";
import { adminKpi, adminUsageTrend, adminAiPerformance, adminTopErrors, knowledgeBaseRows } from "@/data/admin";
import { getLanguageLabel } from "@/lib/utils";
import toast from "react-hot-toast";

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

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [kbRows, setKbRows] = useState(knowledgeBaseRows);

  const filteredKb = kbRows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.errorCode.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.language.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  });

  const toggleActive = (id: string) => {
    setKbRows((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
    toast.success("Status rekaman diperbarui.");
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
              <p className="mt-0.5 text-xs text-white/45">Permintaan API & pengguna aktif per bulan</p>
            </div>
          </GlassCardHeader>
          <AdminUsageTrendChart data={adminUsageTrend} />
        </GlassCard>

        <GlassCard>
          <GlassCardHeader>
            <div>
              <GlassCardTitle>Performa AI vs Target</GlassCardTitle>
              <p className="mt-0.5 text-xs text-white/45">
                Akurasi â‰¥85% â€¢ Respons &lt;5s â€¢ Kepuasan UAT â‰¥80%
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
            <GradientButton size="md" icon={Plus} onClick={() => toast.success("Form tambah rekaman akan dibuka (demo).")}>
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
              {filteredKb.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-4 font-mono text-xs text-white/45">{r.id}</td>
                  <td className="py-3.5 pr-4">
                    <BadgePill tone={langTone[r.language] ?? "neutral"}>{getLanguageLabel(r.language)}</BadgePill>
                  </td>
                  <td className="py-3.5 pr-4 font-mono text-xs font-medium text-white/85">{r.errorCode}</td>
                  <td className="py-3.5 pr-4 text-white/55">{r.title}</td>
                  <td className="py-3.5 pr-4 text-xs text-white/40">{r.updated}</td>
                  <td className="py-3.5 pr-4">
                    <button
                      onClick={() => toggleActive(r.id)}
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
                        onClick={() => toast("Form edit akan dibuka (demo).")}
                        className="rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-neon-red"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setKbRows((prev) => prev.filter((x) => x.id !== r.id));
                          toast.success("Rekaman dihapus.");
                        }}
                        className="rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-[#FF7C9C]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
