"use client";

import { useEffect, useState } from "react";
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
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

interface DashboardStats {
  dbTersedia: boolean;
  totalQuestions: number;
  aiAccuracy: number;
  avgResponseTime: number;
  errorsSolved: number;
  usageByLanguage: Record<string, number>;
  usagePerDay: { date: string; count: number }[];
  recentActivity: {
    id: string;
    language: string;
    errorCode: string | null;
    confidence: number | null;
    createdAt: string;
  }[];
}

interface MetricData {
  label: string;
  value: string;
  change: string;
  trending: "up" | "down" | "flat";
  positive: boolean;
  icon: typeof MessageSquare;
  accent: "cyan" | "violet" | "pink" | "green" | "amber";
  spark: number[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/dashboard/stats", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal memuat statistik");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
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
          {[1, 2, 3, 4].map((i) => (
            <LoadingSkeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <LoadingSkeleton key="chart1" className="h-64 lg:col-span-2" />
          <LoadingSkeleton key="chart2" className="h-64" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <LoadingSkeleton key="chart3" className="h-64" />
          <LoadingSkeleton key="chart4" className="h-64" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          eyebrow="Dashboard"
          icon={LayoutDashboard}
          title="Selamat datang kembali, Fadhel."
          description="Begini progres belajar debugging Anda. Semangat terus."
        />
        <div className="mt-8">
          <EmptyState
            title="Gagal memuat statistik"
            description={error}
            action={
              <GradientButton href="/dashboard" variant="outline">
                Coba lagi
              </GradientButton>
            }
          />
        </div>
      </div>
    );
  }

  const hasActivity = stats && stats.totalQuestions > 0;

  const metrics: MetricData[] = hasActivity && stats ? [
    {
      label: "Total Pertanyaan",
      value: stats.totalQuestions.toLocaleString("id-ID"),
      change: "+12,4%",
      trending: "up",
      positive: true,
      icon: MessageSquare,
      accent: "cyan",
      spark: [42, 55, 48, 62, 70, 66, 82, 78],
    },
    {
      label: "Akurasi AI",
      value: `${stats.aiAccuracy}%`,
      change: "+2,1%",
      trending: "up",
      positive: true,
      icon: TrendingUp,
      accent: "green",
      spark: [80, 82, 81, 84, 85, 86, 87, 88],
    },
    {
      label: "Waktu Respons",
      value: `${stats.avgResponseTime}s`,
      change: "-0,3s",
      trending: "down",
      positive: true,
      icon: Clock,
      accent: "violet",
      spark: [4.2, 3.9, 3.6, 3.4, 3.3, 3.0, 2.9, 2.8],
    },
    {
      label: "Error Dipecahkan",
      value: stats.errorsSolved.toLocaleString("id-ID"),
      change: "+8,7%",
      trending: "up",
      positive: true,
      icon: BookOpen,
      accent: "pink",
      spark: [60, 72, 68, 84, 90, 96, 104, 118],
    },
  ] : [
    {
      label: "Total Pertanyaan",
      value: "0",
      change: "Belum ada aktivitas",
      trending: "flat",
      positive: true,
      icon: MessageSquare,
      accent: "cyan",
      spark: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      label: "Akurasi AI",
      value: "0%",
      change: "Belum ada data",
      trending: "flat",
      positive: true,
      icon: TrendingUp,
      accent: "green",
      spark: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      label: "Waktu Respons",
      value: "0s",
      change: "Belum ada data",
      trending: "flat",
      positive: true,
      icon: Clock,
      accent: "violet",
      spark: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      label: "Error Dipecahkan",
      value: "0",
      change: "Belum ada data",
      trending: "flat" as const,
      positive: true,
      icon: BookOpen,
      accent: "pink" as const,
      spark: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
    Python: "cyan",
    JavaScript: "amber",
    Java: "violet",
  };

  const usageChartData = stats?.usagePerDay?.map((d) => ({
    tanggal: new Date(d.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    jumlah: d.count,
  })) || [];

  const languagePieData = Object.entries(stats?.usageByLanguage || {}).map(([bahasa, persen]) => ({
    bahasa,
    persen,
  }));

  const errorCounts = stats?.recentActivity
    ?.filter((a) => a.errorCode)
    ?.reduce((acc, a) => {
      const code = a.errorCode!;
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  const errorBarData = Object.entries(errorCounts).map(([code, jumlah]) => ({ code, jumlah }));

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

      {!hasActivity ? (
        <div className="mt-8">
          <EmptyState
            title="Belum ada aktivitas"
            description="Mulai chat dengan AI untuk melihat statistik di sini."
            action={
              <GradientButton href="/chat" icon={MessageSquarePlus}>
                Mulai Chat
              </GradientButton>
            }
            icon={MessageSquare}
          />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <GlassCard className="lg:col-span-2">
              <GlassCardHeader>
                <div>
                  <GlassCardTitle>Penggunaan 14 Hari Terakhir</GlassCardTitle>
                  <p className="mt-0.5 text-xs text-white/45">Banyaknya pertanyaan yang dikirim</p>
                </div>
                <BadgePill tone="cyan">+18%</BadgePill>
              </GlassCardHeader>
              <UsageChart data={usageChartData} />
            </GlassCard>

            <GlassCard>
              <GlassCardHeader>
                <div>
                  <GlassCardTitle>Bahasa yang Digunakan</GlassCardTitle>
                  <p className="mt-0.5 text-xs text-white/45">Distribusi penggunaan</p>
                </div>
              </GlassCardHeader>
              <LanguagePieChart data={languagePieData} />
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
              <ErrorBarChart data={errorBarData} />
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
                  {stats?.recentActivity?.map((r) => (
                    <tr key={r.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="py-3.5 pr-4 font-mono text-[11px] text-white/45">{formatDate(r.createdAt)}</td>
                      <td className="py-3.5 pr-4">
                        <BadgePill tone={langTone[r.language] ?? "neutral"}>{r.language}</BadgePill>
                      </td>
                      <td className="py-3.5 pr-4 font-mono text-xs text-white/85">{r.errorCode ?? "-"}</td>
                      <td className="py-3.5 pr-4">
                        <BadgePill tone={r.confidence && r.confidence >= 85 ? "green" : "amber"}>{r.confidence ?? "-"}%</BadgePill>
                      </td>
                      <td className="py-3.5">
                        <BadgePill tone="green">Selesai</BadgePill>
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/40 text-sm">
                        Belum ada aktivitas terbaru
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}