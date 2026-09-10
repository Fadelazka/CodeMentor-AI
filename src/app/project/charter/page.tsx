import type { Metadata } from "next";
import { FileText, Target, ClipboardCheck, Package, XCircle, Layers, ScrollText, Boxes } from "lucide-react";
import { charterData, projectInfo } from "@/data/project-docs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Project Charter",
  description: "Project Charter CodeMentor AI: dokumen resmi yang mengotorisasi proyek.",
};

export default function CharterPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Project Charter</Badge>
          <Badge variant="outline">Dokumen MP-TI/CMAI/2026/001</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Project Charter <span className="text-gradient">CodeMentor AI</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Dokumen charter pengesahan proyek CodeMentor AI.
        </p>
      </div>

      {/* Meta info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Informasi Dokumen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Nama Proyek", value: "CodeMentor AI" },
              { label: "Nomor Kontrak", value: "MP-TI/CMAI/2026/001" },
              { label: "Versi Dokumen", value: "1.0" },
              { label: "Periode", value: "1 Sep – 15 Des 2026" },
              { label: "Project Manager", value: "Rafi Ade Nurcahya, Fadhel Muhammad Azka Islamy" },
              { label: "Project Sponsor", value: "Darmawan Lahru Riatma, S.Kom., M.MT." },
              { label: "Tim Pelaksana", value: "Tim CodeMentor AI" },
              { label: "Durasi", value: "16 Minggu" },
            ].map((i) => (
              <div key={i.label} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500">{i.label}</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{i.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ringkasan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-purple-500" />
            Ringkasan Proyek
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {charterData.ringkasan}
          </p>
          <h3 className="mb-3 mt-6 text-sm font-bold text-slate-900 dark:text-white">Latar Belakang</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {charterData.latarBelakang}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tujuan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Tujuan Proyek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {charterData.tujuan.map((t, i) => (
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

        {/* KPI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-500" />
              Sasaran &amp; KPI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {charterData.target.map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-green-500/20 bg-green-500/5 p-3.5 text-sm text-slate-700 dark:text-slate-300"
                >
                  {t}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Keempat KPI ini menjadi tolak ukur keberhasilan proyek.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Scope */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-500" />
            Ruang Lingkup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">{charterData.ruangLingkup}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-green-600">In Scope</h3>
              <ul className="space-y-2">
                {charterData.deliverables.slice(0, 4).map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-red-500">
                <XCircle className="h-4 w-4" /> Out of Scope
              </h3>
              <ul className="space-y-2">
                {charterData.diluarScope.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deliverables & stack */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-sky-500" />
              Deliverables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {charterData.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  {d}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-500" />
              Batasan &amp; Asumsi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { b: "Batasan", d: "Tidak mengintegrasikan LMS/SIAKAD; tidak ada fitur auto-fix; tidak ada aplikasi mobile." },
                { b: "Asumsi", d: "Akses internet stabil tersedia di lingkungan kampus; data error yang dianonimkan diizinkan untuk pelatihan model." },
                { b: "Kendala", d: "Anggaran maksimal Rp194.700.000; durasi maksimal 16 minggu; fokus pada 5 bahasa utama." },
              ].map((i) => (
                <div key={i.b} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <span className="mr-2 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                    {i.b}
                  </span>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{i.d}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}