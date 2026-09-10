import type { Metadata } from "next";
import { Users, BadgeCheck, Crown, Briefcase } from "lucide-react";
import { timData, projectInfo } from "@/data/project-docs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tim Proyek",
  description: "Susunan tim proyek CodeMentor AI beserta peran masing-masing.",
};

export default function TimPage() {
  const sponsor = timData[0];
  const pm = timData[1];
  const timLain = timData.slice(2);

  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Tim Proyek</Badge>
          <Badge variant="outline">{timData.length} anggota</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Tim <span className="text-gradient">CodeMentor AI</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Struktur tim proyek dan pembagian peran strategis, teknis, hingga
          jaminan kualitas.
        </p>
      </div>

      {/* Sponsor & PM */}
      <div className="grid gap-6 md:grid-cols-2">
        {[sponsor, pm].map((p) => (
          <Card
            key={p.nama}
            className={`overflow-hidden border-2 ${
              p.peran === "Project Sponsor / Client"
                ? "border-blue-500/30"
                : "border-indigo-500/30"
            }`}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${p.warna}`} />
            <CardContent className="p-8 text-center">
              <div
                className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${p.warna} text-4xl font-bold text-white shadow-lg`}
              >
                {p.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="mb-2 flex items-center justify-center gap-2">
                {p.peran.includes("Sponsor") ? (
                  <Crown className="h-4 w-4 text-amber-500" />
                ) : (
                  <Briefcase className="h-4 w-4 text-blue-500" />
                )}
                <Badge variant={p.peran.includes("Sponsor") ? "warning" : "default"}>
                  {p.peran}
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{p.nama}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.deskripsi}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team members */}
      <div className="mt-10">
        <div className="mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Anggota Tim</h2>
          <Badge variant="outline">{timLain.length} orang</Badge>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {timLain.map((p) => (
            <Card key={p.nama} className="group p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="relative mb-4">
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${p.warna} text-3xl font-bold text-white shadow-md transition-transform group-hover:scale-105`}
                >
                  {p.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {p.singkatan}
                </span>
              </div>
              <h3 className="text-center text-sm font-bold text-slate-900 dark:text-white">
                {p.nama}
              </h3>
              <div className="mt-2 text-center">
                <Badge variant="outline">{p.peran}</Badge>
              </div>
              <p className="mt-3 text-center text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {p.deskripsi}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Structure note */}
      <Card className="mt-10">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <BadgeCheck className="h-6 w-6 text-blue-500" />
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Tim beroperasi dengan metodologi <b>Agile (Scrum)</b> — sprint 2 mingguan,
            daily stand-up setiap pagi, dan sprint review di akhir setiap fase.
            Semua keputusan akhir disetujui oleh Project Sponsor melalui Project
            Manager. Tim menyelesaikan {projectInfo.kodeKontrak} dalam{" "}
            {projectInfo.totalMinggu} minggu.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}