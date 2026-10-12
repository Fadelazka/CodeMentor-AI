import { CountUp } from "@/components/landing/count-up";
import { StaggerContainer, StaggerItem } from "@/components/landing/animations";

const stats = [
  { end: 200, prefix: "", suffix: "+", label: "Pola Error dalam Knowledge Base" },
  { end: 5, prefix: "", suffix: "", label: "Bahasa Pemrograman Didukung" },
  { end: 5, prefix: "<", suffix: "s", label: "Waktu Respons AI" },
  { end: 85, prefix: "≥", suffix: "%", label: "Target Akurasi Penjelasan" },
];

export function Metrics() {
  return (
    <section className="border-b border-border bg-background py-14">
      <div className="container-editorial">
        <StaggerContainer className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} lift className="border-l border-border pl-5">
              <div className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
