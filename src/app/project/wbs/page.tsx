import type { Metadata } from "next";
import { GitBranch, ChevronDown } from "lucide-react";
import { wbsData, projectInfo } from "@/data/project-docs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Work Breakdown Structure",
  description: "Work Breakdown Structure (WBS) proyek CodeMentor AI per fase.",
};

export default function WbsPage() {
  const totalWork = wbsData.reduce((acc, w) => acc + w.deliverables.length, 0);

  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Work Breakdown Structure</Badge>
          <Badge variant="outline"><span className="font-semibold">{wbsData.length}</span>&nbsp;fase</Badge>
          <Badge variant="outline"><span className="font-semibold">{totalWork}</span>&nbsp;deliverables</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Work Breakdown <span className="text-gradient">Structure</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Pembagian pekerjaan proyek CodeMentor AI menjadi 10 fase utama dengan
          total {totalWork} deliverables yang dapat dilacak.
        </p>
      </div>

      {/* Tree structure */}
      <div className="space-y-4">
        {wbsData.map((fase, faseIdx) => (
          <Card key={fase.fase} className="overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/40">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${fase.warna}`}>
                {faseIdx + 1}
              </span>
              <div className="flex-1">
                <h2 className="font-bold text-slate-900 dark:text-white">{fase.fase}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {fase.deliverables.length} deliverables
                </p>
              </div>
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </div>
            <CardContent className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {fase.deliverables.map((d) => (
                <div
                  key={d.id}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-500/50 hover:shadow-md dark:border-slate-800"
                >
                  <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {d.id}
                  </span>
                  <span className="text-sm font-medium leading-snug text-slate-700 dark:text-slate-300">
                    {d.nama}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card className="mt-8">
        <CardContent className="flex flex-wrap items-center gap-x-8 gap-y-2 p-6">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Total fase: {wbsData.length}</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Total deliverables: {totalWork}</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Durasi: {projectInfo.totalMinggu} minggu</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Stakeholder: {projectInfo.tim}</span>
        </CardContent>
      </Card>
    </div>
  );
}