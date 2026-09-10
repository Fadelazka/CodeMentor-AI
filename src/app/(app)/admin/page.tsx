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
import { AdminUsageTrendChart, AdminPerformanceChart } from "@/components/admin/admin-charts";
import { adminKpi, adminUsageTrend, adminAiPerformance, adminTopErrors, knowledgeBaseRows } from "@/data/admin";
import { getLanguageLabel } from "@/lib/utils";
import toast from "react-hot-toast";

const kpiCards = [
  { title: "Total Permintaan API", value: adminKpi.totalRequest, icon: Activity, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", change: "+18% bulan lalu" },
  { title: "Permintaan Hari Ini", value: adminKpi.requestHariIni, icon: TrendingUp, color: "bg-green-500/10 text-green-600 dark:text-green-400", change: "+23% vs kemarin" },
  { title: "Rekam Knowledge Base", value: adminKpi.aktifRekamKB, icon: Database, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400", change: "5 bahasa" },
  { title: "Uptime Layanan", value: adminKpi.uptime, icon: Globe, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", change: "30 hari terakhir" },
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
      python: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      javascript: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      java: "bg-red-500/10 text-red-600 dark:text-red-400",
      cpp: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      php: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    };
    return colors[lang] ?? "bg-slate-500/10 text-slate-600";
  };

  return (
    <div className="lg:pl-64">
      <div className="container-custom py-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard Admin
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Monitoring penggunaan, performa AI, dan knowledge base CodeMentor AI.
            </p>
          </div>
          <Badge variant="success" className="px-3 py-1.5">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Mode Administrator Aktif
          </Badge>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((k) => (
            <Card key={k.title} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{k.title}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {k.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{k.change}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${k.color}`}>
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tren Penggunaan</CardTitle>
              <p className="text-sm text-slate-500">Permintaan API & pengguna aktif per bulan</p>
            </CardHeader>
            <CardContent>
              <AdminUsageTrendChart data={adminUsageTrend} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performa AI vs Target</CardTitle>
              <p className="text-sm text-slate-500">
                Akurasi ≥85% • Respons &lt;5 detik • Kepuasan UAT ≥80% • Penurunan tanya &gt;30%
              </p>
            </CardHeader>
            <CardContent>
              <AdminPerformanceChart data={adminAiPerformance} />
            </CardContent>
          </Card>
        </div>

        {/* Top errors */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Error Paling Sering Dikonsultasikan</CardTitle>
            <Badge variant="info">5 besar</Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800">
                    <th className="pb-3 pr-4 font-semibold">Ranking</th>
                    <th className="pb-3 pr-4 font-semibold">Error</th>
                    <th className="pb-3 pr-4 font-semibold">Bahasa</th>
                    <th className="pb-3 pr-4 font-semibold">Jumlah</th>
                    <th className="pb-3 font-semibold">Tren</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {adminTopErrors.map((e) => (
                    <tr key={e.rank}>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          e.rank === 1
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}>
                          {e.rank}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                        {e.error}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={getLangBadge(e.bahasa.toLowerCase())}>
                          {e.bahasa}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
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

        {/* Knowledge Base */}
        <Card className="mt-6">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Kelola Knowledge Base</CardTitle>
              <p className="text-sm text-slate-500">Rekaman error yang tersedia untuk RAG retrieval</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800">
                    <th className="pb-3 pr-4 font-semibold">ID</th>
                    <th className="pb-3 pr-4 font-semibold">Bahasa</th>
                    <th className="pb-3 pr-4 font-semibold">Error</th>
                    <th className="pb-3 pr-4 font-semibold">Judul</th>
                    <th className="pb-3 pr-4 font-semibold">Diperbarui</th>
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredKb.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3 pr-4 font-mono text-xs text-slate-500 dark:text-slate-400">{r.id}</td>
                      <td className="py-3 pr-4">
                        <Badge className={getLangBadge(r.language)}>
                          {getLanguageLabel(r.language)}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                        {r.errorCode}
                      </td>
                      <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{r.title}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{r.updated}</td>
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => toggleActive(r.id)}
                          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                            r.isActive
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {r.isActive ? "Aktif" : "Nonaktif"}
                        </button>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => toast("Form edit akan dibuka (demo).")}
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setKbRows((prev) => prev.filter((x) => x.id !== r.id));
                              toast.success("Rekaman dihapus.");
                            }}
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800"
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