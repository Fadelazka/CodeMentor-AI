import type { Metadata } from "next";
import { Wallet, PiggyBank, TrendingUp, Coins, Building2 } from "lucide-react";
import { anggaranData } from "@/data/project-docs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Anggaran",
  description: "Rincian anggaran proyek CodeMentor AI total Rp194.700.000.",
};

export default function AnggaranPage() {
  const kategoriColors: Record<number, string> = {
    0: "bg-blue-500",
    1: "bg-purple-500",
    2: "bg-amber-500",
    3: "bg-green-500",
    4: "bg-slate-400",
  };

  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="info">Anggaran Proyek</Badge>
          <Badge variant="outline">Versi 1.0</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Anggaran Proyek <span className="text-gradient">Rp194.700.000</span>
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          Rincian biaya proyek CodeMentor AI berdasarkan kategori sumber daya.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-2 text-sm text-blue-100">
              <Coins className="h-4 w-4" /> Total Anggaran
            </div>
            <p className="text-2xl font-bold">{formatRupiah(anggaranData.total)}</p>
          </CardContent>
        </Card>
        {[
          { label: "Sumber Daya Manusia", value: anggaranData.manusia, icon: TrendingUp, color: "text-blue-600 dark:text-blue-400 bg-blue-500/10" },
          { label: "Infrastruktur & Cloud", value: anggaranData.infrastruktur, icon: Building2, color: "text-purple-600 dark:text-purple-400 bg-purple-500/10" },
          { label: "Perangkat & Lisensi", value: anggaranData.perangkat, icon: PiggyBank, color: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
          { label: "Kontingensi Risiko", value: anggaranData.kontingensi, icon: Wallet, color: "text-green-600 dark:text-green-400 bg-green-500/10" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className={`mb-3 inline-flex rounded-xl p-2.5 ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</div>
              <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Allocation bar */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Alokasi Anggaran per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-6 w-full overflow-hidden rounded-full">
            {[
              { kategori: "SDM", total: 143000000, warna: "bg-blue-500" },
              { kategori: "Infrastruktur", total: 19200000, warna: "bg-purple-500" },
              { kategori: "Perangkat", total: 22000000, warna: "bg-amber-500" },
              { kategori: "Operasional", total: 5000000, warna: "bg-green-500" },
              { kategori: "Kontingensi", total: 9000000, warna: "bg-slate-400" },
            ].map((k) => (
              <div
                key={k.kategori}
                className={k.warna}
                style={{ width: `${(k.total / anggaranData.total) * 100}%` }}
                title={`${k.kategori}: ${formatRupiah(k.total)}`}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { nama: "Sumber Daya Manusia", total: 143000000, warna: "bg-blue-500" },
              { nama: "Infrastruktur & Cloud", total: 19200000, warna: "bg-purple-500" },
              { nama: "Perangkat & Lisensi", total: 22000000, warna: "bg-amber-500" },
              { nama: "Operasional & Pelatihan", total: 5000000, warna: "bg-green-500" },
              { nama: "Kontingensi", total: 9000000, warna: "bg-slate-400" },
            ].map((k) => (
              <div key={k.nama}>
                <div className="mb-1 flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${k.warna}`} />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{k.nama}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatRupiah(k.total)}
                </span>
                <span className="ml-1 text-xs text-slate-400">
                  {((k.total / anggaranData.total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense items */}
      <div className="mt-8 space-y-6">
        {anggaranData.tabel.map((kategori, katIdx) => (
          <Card key={kategori.kategori}>
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <CardTitle>{kategori.kategori}</CardTitle>
              <div className="flex items-center gap-3">
                <Badge variant="outline">Subtotal</Badge>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {formatRupiah(kategori.subtotal)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800">
                      <th className="px-6 py-3 font-semibold">Item</th>
                      <th className="px-6 py-3 font-semibold">Jumlah</th>
                      <th className="px-6 py-3 font-semibold">Biaya Satuan</th>
                      <th className="px-6 py-3 font-semibold">Total</th>
                      <th className="px-6 py-3 font-semibold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {kategori.items.map((i) => (
                      <tr key={i.nama} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <td className="px-6 py-3.5">
                          <div className="font-semibold text-slate-900 dark:text-white">{i.nama}</div>
                          {i.peran !== "-" && (
                            <span className="mt-0.5 inline-flex rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                              {i.peran}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">{i.jumlah}</td>
                        <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">{i.satuan}</td>
                        <td className="px-6 py-3.5 font-mono font-semibold text-slate-900 dark:text-white">
                          {formatRupiah(i.total)}
                        </td>
                        <td className="px-6 py-3.5 text-xs text-slate-500 dark:text-slate-400">{i.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total */}
      <Card className="mt-8 border-blue-500/30 bg-blue-500/5">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Total Anggaran Proyek
            </div>
            <div className="mt-1 text-3xl font-bold text-blue-700 dark:text-blue-300">
              {formatRupiah(anggaranData.total)}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4" /> {anggaranData.sumberDana}
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs text-slate-500">Total biaya perhitungan</div>
            <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {formatRupiah(anggaranData.totalTerhitung)}
            </div>
            <div className="mt-2 border-t border-slate-200 pt-2 text-xs text-slate-500 dark:border-slate-800">
              Selisih (negosiasi/persentase kompresi):{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatRupiah(anggaranData.selisih)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}