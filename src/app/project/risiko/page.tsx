import type { Metadata } from "next";
import { ShieldAlert, AlertTriangle, TrendingDown } from "lucide-react";
import { risikoData } from "@/data/project-docs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Manajemen Risiko",
  description: "Manajemen risiko proyek CodeMentor AI: identifikasi, analisis, dan mitigasi.",
};

const dampakColor: Record<string, string> = {
  Tinggi: "bg-red-500/10 text-red-600 dark:text-red-400",
  Sedang: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Rendah: "bg-green-500/10 text-green-600 dark:text-green-400",
};

const probColor: Record<string, string> = {
  Tinggi: "bg-red-500/10 text-red-600 dark:text-red-400",
  Sedang: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Rendah: "bg-green-500/10 text-green-600 dark:text-green-400",
};

const skorColor = (skor: number) => {
  if (skor >= 10) return "text-red-600 dark:text-red-400";
  if (skor >= 6) return "text-amber-600 dark:text-amber-400";
  return "text-green-600 dark:text-green-400";
};

export default function RisikoPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="warning">Manajemen Risiko</Badge>
          <Badge variant="outline">{risikoData.length} risiko teridentifikasi</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Manajemen <span className="text-gradient">Risiko</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Identifikasi, analisis, dan strategi mitigasi risiko utama proyek
          CodeMentor AI. Risiko dipantau setiap minggu selama sprint review.
        </p>
      </div>

      {/* Risk matrix */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Risk Matrix (Probabilitas × Dampak)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="mx-auto max-w-lg">
              <div className="grid grid-cols-5 gap-2 text-center text-xs font-semibold">
                <div className="text-slate-500">Dampak / Probabilitas</div>
                {["Rendah", "Sedang", "Tinggi"].map((p) => (
                  <div key={p} className="bg-slate-100 py-2 dark:bg-slate-800">{p}</div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2">
                <div className="flex items-center justify-center bg-slate-50 text-xs font-semibold text-slate-500 dark:bg-slate-900">
                  Tinggi
                </div>
                <div className="grid place-items-center rounded-xl bg-amber-500/15 p-4 text-center">
                  <ShieldAlert className="mx-auto mb-1 h-4 w-4 text-amber-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">Sedang</span>
                </div>
                <div className="grid place-items-center rounded-xl bg-red-500/15 p-4 text-center">
                  <ShieldAlert className="mx-auto mb-1 h-4 w-4 text-red-500" />
                  <span className="font-semibold text-red-600 dark:text-red-400">R01, R03</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2">
                <div className="flex items-center justify-center bg-slate-50 text-xs font-semibold text-slate-500 dark:bg-slate-900">
                  Sedang
                </div>
                <div className="grid place-items-center rounded-xl bg-green-500/15 p-4 text-center">
                  <span className="text-xs text-slate-600 dark:text-slate-300">Rendah</span>
                </div>
                <div className="grid place-items-center rounded-xl bg-amber-500/15 p-4 text-center">
                  <ShieldAlert className="mx-auto mb-1 h-4 w-4 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">R02, R04, R05, R06, R07</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2">
                <div className="flex items-center justify-center bg-slate-50 text-xs font-semibold text-slate-500 dark:bg-slate-900">
                  Rendah
                </div>
                <div className="grid place-items-center rounded-xl bg-slate-100 text-xs text-slate-400 dark:bg-slate-800">
                  Tidak ada
                </div>
                <div className="grid place-items-center rounded-xl bg-slate-100 text-xs text-slate-400 dark:bg-slate-800">
                  Tidak ada
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-red-500/40" /> Kritis (skor ≥ 10)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-amber-500/40" /> Sedang (skor 6–9)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-green-500/40" /> Rendah (skor &lt; 6)</span>
          </div>
        </CardContent>
      </Card>

      {/* Risk list */}
      <div className="space-y-5">
        {risikoData.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex items-center gap-4 lg:w-72 lg:shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                    <ShieldAlert className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-red-500/10 px-2 py-0.5 font-mono text-xs font-bold text-red-600 dark:text-red-400">
                        {r.id}
                      </span>
                      <Badge variant="outline">{r.kategori}</Badge>
                    </div>
                    <h2 className="mt-1 font-bold text-slate-900 dark:text-white">{r.nama}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pemilik: {r.pemilik}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {r.deskripsi}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                      Dampak: <b className={dampakColor[r.dampak]}>{r.dampak}</b>
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                      Probabilitas: <b className={probColor[r.probabilitas]}>{r.probabilitas}</b>
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                      Skor: <b className={skorColor(r.skor)}>{r.skor}</b>
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                      Status:{" "}
                      <b className={r.status === "Aktif" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"}>
                        {r.status}
                      </b>
                    </span>
                  </div>

                  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                      <TrendingDown className="h-3.5 w-3.5" /> Strategi Mitigasi
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{r.mitigasi}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}