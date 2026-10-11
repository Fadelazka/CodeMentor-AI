"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquarePlus,
  TrendingUp,
  Clock,
  BookOpen,
  MessageSquare,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { GlassCard, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { UsageChart, LanguagePieChart, ErrorBarChart } from "@/components/dashboard/charts";
import { LearningRecommendations } from "@/components/dashboard/learning-recommendations";
import { dashboardStats } from "@/data/mock";

const metrics = [
  {
    label: "Total Pertanyaan",
    value: dashboardStats.totalPertanyaan.toLocaleString("id-ID"),
    change: "+12,4%",
    trending: "up" as const,
    positive: true,
    icon: MessageSquare,
    accent: "cyan" as const,
    spark: [42, 55, 48, 62, 70, 66, 82, 78],
  },
  {
    label: "Akurasi AI",
    value: `${dashboardStats.akurasiRataRata}%`,
    change: "+2,1%",
    trending: "up" as const,
    positive: true,
    icon: TrendingUp,
    accent: "green" as const,
    spark: [80, 82, 81, 84, 85, 86, 87, 88],
  },
  {
    label: "Waktu Respons",
    value: `${dashboardStats.waktuResponsRataRata}s`,
    change: "-0,3s",
    trending: "down" as const,
    positive: true,
    icon: Clock,
    accent: "violet" as const,
    spark: [4.2, 3.9, 3.6, 3.4, 3.3, 3.0, 2.9, 2.8],
  },
  {
    label: "Error Dipecahkan",
    value: "1.178",
    change: "+8,7%",
    trending: "up" as const,
    positive: true,
    icon: BookOpen,
    accent: "pink" as const,
    spark: [60, 72, 68, 84, 90, 96, 104, 118],
  },
];

const recent = [
  { tgl: "10 Des 2026 09:45", bahasa: "Python", error: "KeyError", conf: 91 },
  { tgl: "9 Des 2026 15:20", bahasa: "JavaScript", error: "TypeError", conf: 87 },
  { tgl: "8 Des 2026 11:03", bahasa: "Java", error: "NullPointerException", conf: 94 },
];

const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
  Python: "cyan",
  JavaScript: "amber",
  Java: "violet",
};

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Dashboard"
        icon={LayoutDashboard}
        title="Selamat datang kembali, Fadhel."
        description="Begini progres belajar debugging Anda. Semangat terus."
        actions={
          <GradientButton href="/chat" icon={MessageSquarePlus}>
            Tanya Error Baru
          </GradientButton>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <GlassCardHeader>
            <div>
              <GlassCardTitle>Penggunaan 14 Hari Terakhir</GlassCardTitle>
              <p className="mt-0.5 text-xs text-white/45">Banyaknya pertanyaan yang dikirim</p>
            </div>
            <BadgePill tone="cyan">+18%</BadgePill>
          </GlassCardHeader>
          <UsageChart data={dashboardStats.penggunaan14Hari} />
        </GlassCard>

        <GlassCard>
          <GlassCardHeader>
            <div>
              <GlassCardTitle>Bahasa yang Digunakan</GlassCardTitle>
              <p className="mt-0.5 text-xs text-white/45">Distribusi penggunaan</p>
            </div>
          </GlassCardHeader>
          <LanguagePieChart data={dashboardStats.bahasaTerbanyak} />
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <GlassCardHeader>
            <div>
              <GlassCardTitle>Error Paling Sering</GlassCardTitle>
              <p className="mt-0.5 text-xs text-white/45">Error yang paling banyak dikonsultasikan</p>
            </div>
            <BadgePill tone="pink" icon={AlertTriangle}>
              Pantau
            </BadgePill>
          </GlassCardHeader>
          <ErrorBarChart data={dashboardStats.errorTerbanyak} />
        </GlassCard>

        <LearningRecommendations />
      </div>

      <GlassCard className="mt-6">
        <GlassCardHeader>
          <div>
            <GlassCardTitle>Aktivitas Terakhir</GlassCardTitle>
            <p className="mt-0.5 text-xs text-white/45">Riwayat interaksi terbaru</p>
          </div>
          <Link
            href="/riwayat"
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-neon-red transition-colors hover:text-white"
          >
            Lihat semua
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </GlassCardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                {["Tanggal", "Bahasa", "Error", "Confidence", "Status"].map((h) => (
                  <th
                    key={h}
                    className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-white/40 last:pr-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {recent.map((r) => (
                <tr key={r.tgl} className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-4 font-mono text-[11px] text-white/45">{r.tgl}</td>
                  <td className="py-3.5 pr-4">
                    <BadgePill tone={langTone[r.bahasa] ?? "neutral"}>{r.bahasa}</BadgePill>
                  </td>
                  <td className="py-3.5 pr-4 font-mono text-xs text-white/85">{r.error}</td>
                  <td className="py-3.5 pr-4">
                    <BadgePill tone={r.conf >= 85 ? "green" : "amber"}>{r.conf}%</BadgePill>
                  </td>
                  <td className="py-3.5">
                    <BadgePill tone="green">Selesai</BadgePill>
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
