import { Stat } from "@/components/ui/stat";

const stats = [
  { value: "200+", label: "Pola Error dalam Knowledge Base" },
  { value: "5", label: "Bahasa Pemrograman Didukung" },
  { value: "<5s", label: "Waktu Respons AI" },
  { value: "≥85%", label: "Target Akurasi Penjelasan" },
];

export function Metrics() {
  return (
    <section className="border-b border-border bg-background py-14">
      <div className="container-editorial">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}