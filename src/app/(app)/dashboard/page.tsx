"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  MessageSquarePlus,
  TrendingUp,
  Clock,
  BookOpen,
  MessageSquare,
  ArrowUpRight,
  AlertTriangle,
  Users,
  Activity,
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
  meta?: {
    totalUsers: number;
    activeUsers7d: number;
  };
  isAdminView?: boolean;
  charts?: {
    daily: { date: string; count: number }[];
    languages: { language: string; count: number }[];
  };
  topErrors?: { errorType: string; count: number }[];
  recommendations?: { errorType: string; title: string; url: string }[];
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
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) return;

    const isAdminUser = session.user.role === "ADMIN";
    setIsAdmin(isAdminUser);

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const endpoint = isAdminUser ? "/api/admin/stats" : "/api/dashboard/stats";
        const res = await fetch(endpoint, { cache: "no-store" });

        // Handle 401 or other errors gracefully
        if (!res.ok) {
          console.warn("Stats API returned:", res.status);
          setStats({
            dbTersedia: false,
            totalQuestions: 0,
            aiAccuracy: 0,
            avgResponseTime: 0,
            errorsSolved: 0,
            usageByLanguage: {},
            usagePerDay: [],
            recentActivity: [],
            isAdminView: isAdminUser,
          });
          return;
        }

        const data = await res.json();
        // Normalize response shape
        if (data.isAdminView) {
          setStats({
            ...data.summary,
            charts: data.charts,
            topErrors: data.topErrors,
            recommendations: data.recommendations,
            meta: data.meta,
            isAdminView: true,
          });
        } else {
          setStats({ ...data, isAdminView: false });
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setStats({
          dbTersedia: false,
          totalQuestions: 0,
          aiAccuracy: 0,
          avgResponseTime: 0,
          errorsSolved: 0,
          usageByLanguage: {},
          usagePerDay: [],
          recentActivity: [],
          isAdminView: isAdminUser,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Polling untuk admin (30 detik)
    if (isAdminUser) {
      const interval = setInterval(() => {
        fetch("/api/admin/stats", { cache: "no-store" })
          .then(r => r.json())
          .then(data => {
            setStats({
              ...data.summary,
              charts: data.charts,
              topErrors: data.topErrors,
              recommendations: data.recommendations,
              meta: data.meta,
              isAdminView: true,
            });
          })
          .catch(console.error);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [session, status]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || status === "loading") {
    return (
      <div className="animate-fade-in">
        <PageHeader
          eyebrow="Dashboard"
          icon={LayoutDashboard}
          title={isAdmin ? "Selamat datang kembali, Admin." : "Selamat datang kembali, Fadhel."}
          description={isAdmin
            ? "Pantau aktivitas pengguna CodeMentor AI secara real-time."
            : "Begini progres belajar debugging Anda. Semangat terus."}
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

  const hasActivity = stats && stats.totalQuestions > 0;

  const metrics: MetricData[] = hasActivity && stats ? [
    {
      label: isAdmin ? "Total Pertanyaan (Semua User)" : "Total Pertanyaan",
      value: stats.totalQuestions.toLocaleString("id-ID"),
      change: "+12,4%",
      trending: "up",
      positive: true,
      icon: isAdmin ? Users : MessageSquare,
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
      label: "Waktu Respons (Confidence)",
      value: `${stats.avgResponseTime}%`,
      change: "-0,3s",
      trending: "down",
      positive: true,
      icon: Clock,
      accent: "violet",
      spark: [4.2, 3.9, 3.6, 3.4, 3.3, 3.0, 2.9, 2.8],
    },
    {
      label: isAdmin ? "Error Dipecahkan (Global)" : "Error Dipecahkan",
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
      label: isAdmin ? "Total Pertanyaan (Semua User)" : "Total Pertanyaan",
      value: "0",
      change: isAdmin ? "Belum ada data global" : "Belum ada aktivitas",
      trending: "flat",
      positive: true,
      icon: isAdmin ? Users : MessageSquare,
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
      value: "0%",
      change: "Belum ada data",
      trending: "flat",
      positive: true,
      icon: Clock,
      accent: "violet",
      spark: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      label: isAdmin ? "Error Dipecahkan (Global)" : "Error Dipecahkan",
      value: "0",
      change: "Belum ada data",
      trending: "flat" as const,
      positive: true,
      icon: BookOpen,
      accent: "pink",
      spark: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const langTone: Record<string, "cyan" | "violet" | "pink" | "green" | "amber"> = {
    Python: "cyan",
    JavaScript: "amber",
    Java: "violet",
  };

  const usageChartData = stats?.charts?.daily?.map((d) => ({
    tanggal: new Date(d.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    jumlah: d.count,
  })) || stats?.usagePerDay?.map((d: { date: string; count: number }) => ({
    tanggal: new Date(d.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    jumlah: d.count,
  })) || [];

  const languagePieData = Object.entries(stats?.charts?.languages || stats?.usageByLanguage || {}).map(([bahasa, persen]) => ({
    bahasa,
    persen: typeof persen === "number" ? persen : 0,
  }));

  const topErrors = stats?.topErrors || [];
  const errorCounts = stats?.recentActivity
    ?.filter((a) => a.errorCode)
    ?.reduce((acc, a) => {
      const code = a.errorCode!;
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  const errorBarData = Object.entries(errorCounts).map(([code, jumlah]) => ({ code, jumlah }));

  // Admin: gunakan topErrors dari API, User: gunakan errorCounts dari recentActivity
  const finalErrorBarData = isAdmin && topErrors.length > 0
    ? topErrors.map((e: { errorType: string; count: number }) => ({ code: e.errorType, jumlah: e.count }))
    : errorBarData;

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Dashboard"
        icon={LayoutDashboard}
        title={isAdmin ? "Selamat datang kembali, Admin." : `Selamat datang kembali, ${session?.user?.name?.split(" ")[0] || "User"}.`}
        description={isAdmin
          ? "Pantau aktivitas pengguna CodeMentor AI secara real-time."
          : "Begini progres belajar debugging Anda. Semangat terus."}
        actions={
          <GradientButton href="/chat" icon={MessageSquarePlus}>
            Tanya Error Baru
          </GradientButton>
        }
      />

      {/* Admin: Info user count */}
      {isAdmin && stats?.meta && (
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Users className="w-3.5 h-3.5" />
            <span>{stats.meta.totalUsers.toLocaleString("id-ID")} total user</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-green/[0.1] border border-neon-green/[0.2]">
            <Activity className="w-3.5 h-3.5 text-neon-green" />
            <span>{stats.meta.activeUsers7d.toLocaleString("id-ID")} aktif 7 hari</span>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {!hasActivity && !isAdmin ? (
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
              <ErrorBarChart data={finalErrorBarData} />
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