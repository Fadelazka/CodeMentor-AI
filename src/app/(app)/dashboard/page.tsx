"use client";

import Link from "next/link";
import { MessageSquare, TrendingUp, Clock, BookOpen } from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { UsageChart, LanguagePieChart, ErrorBarChart } from "@/components/dashboard/charts";
import { LearningRecommendations } from "@/components/dashboard/learning-recommendations";
import { dashboardStats } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="lg:pl-64">
      <div className="container-custom py-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Halo, Fadhel! 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Begini progres belajar debugging Anda. Semangat terus!
            </p>
          </div>
          <Link href="/chat">
            <Button>
              <MessageSquare className="h-4 w-4" />
              Tanya Error Baru
            </Button>
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Pertanyaan"
            value={dashboardStats.totalPertanyaan.toLocaleString("id-ID")}
            change="+12,4%"
            changePositive
            icon={MessageSquare}
            iconBg="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Akurasi Penjelasan AI"
            value={`${dashboardStats.akurasiRataRata}%`}
            change="+2,1%"
            changePositive
            icon={TrendingUp}
            iconBg="bg-green-500/10 text-green-600 dark:text-green-400"
          />
          <StatCard
            title="Waktu Respons Rata-rata"
            value={`${dashboardStats.waktuResponsRataRata}s`}
            change="-0,3s"
            changePositive
            icon={Clock}
            iconBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
          />
          <StatCard
            title="Error yang Dipecahkan"
            value="1.178"
            change="+8,7%"
            changePositive
            icon={BookOpen}
            iconBg="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Usage chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Penggunaan 14 Hari Terakhir</CardTitle>
              <p className="text-sm text-slate-500">Banyaknya pertanyaan yang dikirim</p>
            </CardHeader>
            <CardContent>
              <UsageChart data={dashboardStats.penggunaan14Hari} />
            </CardContent>
          </Card>

          {/* Language pie */}
          <Card>
            <CardHeader>
              <CardTitle>Bahasa yang Digunakan</CardTitle>
              <p className="text-sm text-slate-500">Distribusi penggunaan</p>
            </CardHeader>
            <CardContent>
              <LanguagePieChart data={dashboardStats.bahasaTerbanyak} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Top errors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Error Paling Sering</CardTitle>
              <Badge variant="warning">Lakukan pemantauan</Badge>
            </CardHeader>
            <CardContent>
              <ErrorBarChart data={dashboardStats.errorTerbanyak} />
            </CardContent>
          </Card>

          {/* Recommendations */}
          <LearningRecommendations />
        </div>

        {/* Recent activity */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Aktivitas Terakhir</CardTitle>
              <p className="text-sm text-slate-500">Riwayat interaksi terbaru Anda</p>
            </div>
            <Link href="/riwayat" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Lihat semua
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="pb-3 pr-4 font-semibold text-slate-500">Tanggal</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-500">Bahasa</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-500">Error</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-500">Confidence</th>
                    <th className="pb-3 font-semibold text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { tgl: "10 Des 2026 09:45", bahasa: "Python", error: "KeyError", conf: 91, status: "Selesai" },
                    { tgl: "9 Des 2026 15:20", bahasa: "JavaScript", error: "TypeError", conf: 87, status: "Selesai" },
                    { tgl: "8 Des 2026 11:03", bahasa: "Java", error: "NullPointerException", conf: 94, status: "Selesai" },
                  ].map((r) => (
                    <tr key={r.tgl}>
                      <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{r.tgl}</td>
                      <td className="py-3 pr-4">
                        <Badge variant="outline">{r.bahasa}</Badge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                        {r.error}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={r.conf >= 85 ? "success" : "warning"}>
                          {r.conf}%
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant="success">{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}