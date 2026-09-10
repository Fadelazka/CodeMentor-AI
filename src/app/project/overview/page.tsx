import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, Target, ListChecks, Layers, ArrowRight, Anchor, ClipboardCheck } from "lucide-react";
import { projectInfo } from "@/data/project-docs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Overview Proyek",
  description: "Ringkasan proyek CodeMentor AI: tujuan, sasaran, ruang lingkup, dan deliverables.",
};

const tujuan = [
  "Mengembangkan AI mentor pemrograman penjelas error dalam Bahasa Indonesia",
  "Menyediakan penjelasan error real-time melalui ekstensi VS Code dan aplikasi web",
  "Membangun knowledge base 200+ pola error umum dalam 5 bahasa pemrograman",
  "Mengurangi beban dosen dan asisten dalam menjawab pertanyaan debugging",
  "Menyediakan dashboard admin untuk monitoring penggunaan dan performa AI",
];

const sasaran = [
  { label: "Akurasi penjelasan AI", target: "≥ 85%" },
  { label: "Waktu respons", target: "< 5 detik" },
  { label: "Kepuasan pengguna (UAT)", target: "≥ 80%" },
  { label: "Penurunan pertanyaan debugging", target: "≥ 30%" },
];

export default function OverviewPage() {
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Dokumen Proyek</Badge>
          <Badge variant="outline">Versi {projectInfo.versi}</Badge>
          <Badge variant="outline">{projectInfo.kodeKontrak}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Overview Proyek <span className="text-gradient">CodeMentor AI</span>
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          {projectInfo.ringkasan}
        </p>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Kode Kontrak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
              {projectInfo.kodeKontrak}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Periode Proyek</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{projectInfo.periode}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Project Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{projectInfo.pm}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Sponsor / Client</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{projectInfo.sponsor}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Tujuan */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Tujuan Proyek</CardTitle>
              <p className="text-sm text-slate-500">Mengapa proyek ini dijalankan</p>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {tujuan.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Sasaran */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <ClipboardCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Sasaran & KPI</CardTitle>
              <p className="text-sm text-slate-500">Metrik keberhasilan proyek</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sasaran.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 dark:border-slate-800"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-300">{s.label}</span>
                  <span className="rounded-lg bg-green-500/10 px-3 py-1 font-mono text-sm font-bold text-green-600 dark:text-green-400">
                    {s.target}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scope */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
            <ListChecks className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle>Ruang Lingkup Proyek</CardTitle>
            <p className="text-sm text-slate-500">Yang termasuk dan tidak termasuk</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                Termasuk (In Scope)
              </h3>
              <ul className="space-y-2.5">
                {[
                  "VS Code Extension dengan deteksi error real-time",
                  "Web application (chat debugging, riwayat, rekomendasi)",
                  "Knowledge base 200+ error dalam 5 bahasa",
                  "RAG (Retrieval-Augmented Generation) berbasis Groq Llama 3.1",
                  "Dashboard admin monitoring & manajemen",
                  "Pelatihan, dokumentasi, dan presentasi akhir",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-red-500">
                Tidak Termasuk (Out of Scope)
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Integrasi dengan LMS/SIAKAD",
                  "Fitur auto-fix kode secara otomatis",
                  "Aplikasi mobile native",
                  "Monetisasi platform",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stack & Deliverables */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle>Stack Teknologi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { nama: "Frontend", detail: "Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui" },
                { nama: "Backend", detail: "Next.js API Routes, PostgreSQL, Prisma, NextAuth" },
                { nama: "AI/ML", detail: "Groq Llama 3.1, RAG, vector embedding" },
                { nama: "Infrastruktur", detail: "AWS, Vercel, Neon/Supabase" },
              ].map((t) => (
                <div key={t.nama} className="flex flex-col gap-1 rounded-xl border border-slate-200 p-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{t.nama}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{t.detail}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10">
              <Anchor className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <CardTitle>Deliverables Proyek</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {[
                "Dokumen charter, WBS, jadwal, anggaran, dan risiko",
                "Knowledge base 200+ error dalam 5 bahasa",
                "VS Code Extension CodeMentor AI",
                "Landing page & web application",
                "Dashboard admin lengkap",
                "Laporan UAT & hasil presentasi akhir",
              ].map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  {d}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/project/charter" className="btn-primary">
          Lihat Project Charter <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/project/wbs" className="btn-secondary">
          Lihat WBS
        </Link>
        <Link href="/project/jadwal" className="btn-secondary">
          Lihat Jadwal
        </Link>
      </div>
    </div>
  );
}