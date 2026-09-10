import type { Metadata } from "next";
import { Table2, HelpCircle } from "lucide-react";
import { raciData } from "@/data/project-docs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Matriks RACI",
  description: "Matriks RACI proyek CodeMentor AI: pembagian peran dan tanggung jawab.",
};

const roleColorMap: Record<string, string> = {
  R: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  A: "bg-red-500/15 text-red-700 dark:text-red-300",
  C: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  I: "bg-slate-300/40 text-slate-600 dark:bg-slate-700/40 dark:text-slate-300",
};

const roleTooltip: Record<string, string> = {
  R: "Responsible — pelaksana utama",
  A: "Accountable — penanggung jawab akhir",
  C: "Consulted — diajak konsultasi",
  I: "Informed — diberi informasi",
};

export default function RaciPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Matriks RACI</Badge>
          <Badge variant="outline">{raciData.matrix.length} aktivitas</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Matriks <span className="text-gradient">RACI</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Pembagian peran dan tanggung jawab (Responsible, Accountable, Consulted,
          Informed) untuk seluruh aktivitas kunci proyek.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <CardTitle className="flex items-center gap-2">
            <Table2 className="h-5 w-5 text-blue-500" />
            Pembagian Peran &amp; Tanggung Jawab
          </CardTitle>
          <div className="hidden flex-wrap items-center gap-3 sm:flex">
            {["R", "A", "C", "I"].map((l) => (
              <span key={l} title={roleTooltip[l]} className="flex items-center gap-1 text-xs text-slate-500">
                <b className={`inline-flex h-5 w-5 items-center justify-center rounded ${roleColorMap[l]}`}>{l}</b>
                {roleTooltip[l].split("—")[0].trim()}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
                  <th className="sticky left-0 bg-slate-50 px-4 py-3 font-semibold dark:bg-slate-900/40">
                    Aktivitas / Peran
                  </th>
                  {raciData.roles.map((role) => (
                    <th key={role} className="px-3 py-3 text-center font-semibold">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {raciData.matrix.map((row) => (
                  <tr key={row.aktivitas} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="sticky left-0 bg-white px-4 py-3 font-medium text-slate-800 dark:bg-slate-950 dark:text-slate-200">
                      {row.aktivitas}
                    </td>
                    {raciData.roles.map((role) => {
                      const val = row[role as keyof typeof row] as string;
                      if (!val) return <td key={role} className="px-3 py-3 text-center text-slate-300 dark:text-slate-700">—</td>;
                      return (
                        <td key={role} className="px-3 py-3 text-center">
                          <span
                            title={roleTooltip[val]}
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${roleColorMap[val]}`}
                          >
                            {val}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend mobile */}
      <Card className="mt-6 sm:hidden">
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
            <HelpCircle className="h-4 w-4 text-blue-500" /> Keterangan
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["R", "A", "C", "I"].map((l) => (
              <div key={l} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <b className={`inline-flex h-5 w-5 items-center justify-center rounded ${roleColorMap[l]}`}>{l}</b>
                {roleTooltip[l]}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}