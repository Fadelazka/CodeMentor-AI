import type { Metadata } from "next";
import { Calendar, Flag } from "lucide-react";
import { jadwalData, milestoneInfo } from "@/data/project-docs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Jadwal Proyek",
  description: "Timeline proyek 16 minggu CodeMentor AI dengan Gantt chart sederhana dan milestones.",
};

const statusColor: Record<string, string> = {
  Selesai: "bg-green-500/10 text-green-600 dark:text-green-400",
  Berjalan: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Akan datang": "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const statusBar: Record<number, string> = {
  100: "bg-green-500",
  75: "bg-blue-500",
  45: "bg-blue-400",
  20: "bg-purple-400",
  10: "bg-amber-400",
  0: "bg-slate-300 dark:bg-slate-700",
};

export default function JadwalPage() {
  const currentWeek = 10;

  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Jadwal Proyek</Badge>
          <Badge variant="outline">16 minggu</Badge>
          <Badge variant="outline">1 Sep – 15 Des 2026</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Jadwal &amp; <span className="text-gradient">Timeline</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Manajemen jadwal menggunakan 16 minggu kalender, dimulai 1 September
          dan berakhir 15 Desember 2026.
        </p>
      </div>

      {/* Gantt chart */}
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Gantt Chart (Progress Real-time)
          </CardTitle>
          <Badge variant="info">Minggu berjalan: {currentWeek}</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              {/* Week header */}
              <div className="grid grid-cols-[220px_1fr_180px] border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Fase</div>
                <div className="flex py-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="flex-1 border-l border-slate-200 text-center text-[10px] font-medium text-slate-400 dark:border-slate-800">
                      W{i + 1}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</div>
              </div>

              {/* Rows */}
              {jadwalData.map((f) => {
                const weekWidth = (f.durasiMinggu / 16) * 100;
                const weekOffset = ((f.mingguKe - 1) / 16) * 100;
                return (
                  <div
                    key={f.fase}
                    className="grid grid-cols-[220px_1fr_180px] border-b border-slate-100 transition-colors hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-900/30"
                  >
                    <div className="px-4 py-3">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{f.fase}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{f.detail}</div>
                    </div>
                    <div className="relative py-3">
                      <div className="absolute inset-y-0 flex w-full items-center">
                        <div
                          className="mx-1 h-6 rounded-full ring-2 ring-white dark:ring-slate-900"
                          style={{
                            width: `calc(${weekWidth}% - 8px)`,
                            marginLeft: `calc(${weekOffset}% + 4px)`,
                          }}
                        >
                          <div
                            className={`h-full rounded-full ${statusBar[f.progress]}`}
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${statusBar[f.progress]}`}
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {f.progress}%
                        </span>
                      </div>
                      <div className="mt-1 text-[10px] text-slate-400">
                        {f.start} – {f.end}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-amber-500" />
            Milestones Proyek
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-5 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {milestoneInfo.milestones.map((m) => (
              <div key={m.nama} className="relative flex items-start gap-5">
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                  <Flag className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex flex-1 flex-col gap-1 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{m.nama}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Minggu ke-{m.minggu} • {m.tanggal}
                    </div>
                  </div>
                  <Badge className={statusColor[m.status]}>{m.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Calendar className="h-4 w-4" />
        Jadwal disusun berdasarkan kontrak MP-TI/CMAI/2026/001. Revisi jadwal memerlukan persetujuan sponsor.
      </p>
    </div>
  );
}