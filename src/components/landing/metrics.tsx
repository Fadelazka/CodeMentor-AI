import { Stat } from "@/components/ui/stat";

const stats = [
  { value: "200+", label: "Pola Error dalam Knowledge Base" },
  { value: "5", label: "Bahasa Pemrograman Didukung" },
  { value: "<5 detik", label: "Waktu Respons AI" },
  { value: "≥85%", label: "Target Akurasi Penjelasan" },
];

export function Metrics() {
  return (
    <section className="border-y border-slate-200 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 py-14 dark:border-slate-800">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}