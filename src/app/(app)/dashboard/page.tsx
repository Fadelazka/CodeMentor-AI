"use client";

import Link from "next/link";
import { MessageSquare, TrendingUp, Clock, BookOpen } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { UsageChart, LanguagePieChart, ErrorBarChart } from "@/components/dashboard/charts";
import { LearningRecommendations } from "@/components/dashboard/learning-recommendations";
import { dashboardStats } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function DashboardPage() {
  return (
    <div className="lg:pl-60">
      <div className="container-editorial py-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow index="//" label="DASHBOARD" className="mb-3" />
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Selamat datang kembali, Fadhel.
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Begini progres belajar debugging Anda. Semangat terus.
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
            iconBg="bg-muted"
          />
          <StatCard
            title="Akurasi AI"
            value={`${dashboardStats.akurasiRataRata}%`}
            change="+2,1%"
            changePositive
            icon={TrendingUp}
            iconBg="bg-success/10 text-success"
          />
          <StatCard
            title="Waktu Respons"
            value={`${dashboardStats.waktuResponsRataRata}s`}
            change="-0,3s"
            changePositive
            icon={Clock}
            iconBg="bg-muted"
          />
          <StatCard
            title="Error Dipecahkan"
            value="1.178"
            change="+8,7%"
            changePositive
            icon={BookOpen}
            iconBg="bg-accent/10 text-accent"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Usage chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Penggunaan 14 Hari Terakhir</CardTitle>
              <p className="font-mono text-[11px] text-muted-foreground">Banyaknya pertanyaan yang dikirim</p>
            </CardHeader>
            <CardContent>
              <UsageChart data={dashboardStats.penggunaan14Hari} />
            </CardContent>
          </Card>

          {/* Language pie */}
          <Card>
            <CardHeader>
              <CardTitle>Bahasa yang Digunakan</CardTitle>
              <p className="font-mono text-[11px] text-muted-foreground">Distribusi penggunaan</p>
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
              <Badge variant="warning">Pantau</Badge>
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
              <p className="font-mono text-[11px] text-muted-foreground">Riwayat interaksi terbaru</p>
            </div>
            <Link href="/riwayat" className="font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:text-accent">
              Lihat semua
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Tanggal</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Bahasa</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Error</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</th>
                    <th className="pb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { tgl: "10 Des 2026 09:45", bahasa: "Python", error: "KeyError", conf: 91, status: "Selesai" },
                    { tgl: "9 Des 2026 15:20", bahasa: "JavaScript", error: "TypeError", conf: 87, status: "Selesai" },
                    { tgl: "8 Des 2026 11:03", bahasa: "Java", error: "NullPointerException", conf: 94, status: "Selesai" },
                  ].map((r) => (
                    <tr key={r.tgl}>
                      <td className="py-3 pr-4 font-mono text-[11px] text-muted-foreground">{r.tgl}</td>
                      <td className="py-3 pr-4">
                        <Badge variant="outline">{r.bahasa}</Badge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-foreground">{r.error}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={r.conf >= 85 ? "success" : "warning"}>{r.conf}%</Badge>
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