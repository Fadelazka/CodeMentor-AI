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
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AdminUsageTrendChart, AdminPerformanceChart } from "@/components/admin/admin-charts";
import { adminKpi, adminUsageTrend, adminAiPerformance, adminTopErrors, knowledgeBaseRows } from "@/data/admin";
import { getLanguageLabel } from "@/lib/utils";
import toast from "react-hot-toast";

const kpiCards = [
  { title: "Total Permintaan API", value: adminKpi.totalRequest, icon: Activity, color: "bg-muted text-muted-foreground", change: "+18% bulan lalu" },
  { title: "Permintaan Hari Ini", value: adminKpi.requestHariIni, icon: TrendingUp, color: "bg-success/10 text-success", change: "+23% vs kemarin" },
  { title: "Rekam Knowledge Base", value: adminKpi.aktifRekamKB, icon: Database, color: "bg-muted text-muted-foreground", change: "5 bahasa" },
  { title: "Uptime Layanan", value: adminKpi.uptime, icon: Globe, color: "bg-muted text-muted-foreground", change: "30 hari terakhir" },
];

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
    setKbRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
    toast.success("Status rekaman diperbarui.");
  };

  const getLangBadge = (lang: string) => {
    const colors: Record<string, string> = {
      python: "bg-muted text-muted-foreground",
      javascript: "bg-muted text-muted-foreground",
      java: "bg-muted text-muted-foreground",
      cpp: "bg-muted text-muted-foreground",
      php: "bg-muted text-muted-foreground",
    };
    return colors[lang] ?? "bg-muted text-muted-foreground";
  };

  return (
    <div className="lg:pl-60">
      <div className="container-editorial py-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow index="//" label="ADMIN" className="mb-3" />
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Dashboard Admin
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitoring penggunaan, performa AI, dan knowledge base CodeMentor AI.
            </p>
          </div>
          <Badge variant="success" className="px-3 py-1.5">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Mode Administrator Aktif
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((k) => (
            <Card key={k.title} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{k.title}</p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
                    {k.value}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{k.change}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${k.color}`}>
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tren Penggunaan</CardTitle>
              <p className="text-sm text-muted-foreground">Permintaan API & pengguna aktif per bulan</p>
            </CardHeader>
            <CardContent>
              <AdminUsageTrendChart data={adminUsageTrend} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performa AI vs Target</CardTitle>
              <p className="text-sm text-muted-foreground">
                Akurasi ≥85% • Respons &lt;5 detik • Kepuasan UAT ≥80% • Penurunan tanya &gt;30%
              </p>
            </CardHeader>
            <CardContent>
              <AdminPerformanceChart data={adminAiPerformance} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Error Paling Sering Dikonsultasikan</CardTitle>
            <Badge variant="info">5 besar</Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Ranking</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Error</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Bahasa</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Jumlah</th>
                    <th className="pb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Tren</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {adminTopErrors.map((e) => (
                    <tr key={e.rank}>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-sm text-xs font-bold ${
                          e.rank === 1
                            ? "bg-muted text-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {e.rank}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs font-medium text-foreground">
                        {e.error}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={getLangBadge(e.bahasa.toLowerCase())}>
                          {e.bahasa}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-semibold text-foreground">
                        {e.jumlah}
                      </td>
                      <td className="py-3">
                        <Badge variant={e.tren.startsWith("-") ? "success" : "warning"}>
                          {e.tren}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Kelola Knowledge Base</CardTitle>
              <p className="text-sm text-muted-foreground">Rekaman error yang tersedia untuk RAG retrieval</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari rekaman..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-56 pl-9"
                />
              </div>
              <Button onClick={() => toast.success("Form tambah rekaman akan dibuka (demo).")}>
                <Plus className="h-4 w-4" /> Tambah
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">ID</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Bahasa</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Error</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Judul</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Diperbarui</th>
                    <th className="pb-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="pb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredKb.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{r.id}</td>
                      <td className="py-3 pr-4">
                        <Badge className={getLangBadge(r.language)}>
                          {getLanguageLabel(r.language)}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs font-medium text-foreground">
                        {r.errorCode}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.title}</td>
                      <td className="py-3 pr-4 text-xs text-muted-foreground">{r.updated}</td>
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => toggleActive(r.id)}
                          className={`rounded-sm px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors ${
                            r.isActive
                              ? "bg-success/10 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {r.isActive ? "Aktif" : "Nonaktif"}
                        </button>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => toast("Form edit akan dibuka (demo).")}
                            className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setKbRows((prev) => prev.filter((x) => x.id !== r.id));
                              toast.success("Rekaman dihapus.");
                            }}
                            className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}