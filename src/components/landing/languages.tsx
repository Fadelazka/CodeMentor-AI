import Link from "next/link";
import { ArrowRight, Zap, Layers } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeUp, FadeRight, StaggerContainer, StaggerItem } from "@/components/landing/animations";

const bahasaList = [
  { nama: "Python", token: "py", deskripsi: "SyntaxError, TypeError, IndexError, dan error umum dalam pengembangan Python.", popular: true },
  { nama: "JavaScript", token: "js", deskripsi: "ReferenceError, SyntaxError, dan error pada lingkungan Node.js & browser." },
  { nama: "Java", token: "java", deskripsi: "NullPointerException, ArrayIndexOutOfBounds, dan penanganan exception Java." },
  { nama: "C++", token: "cpp", deskripsi: "Segmentation Fault, compilation error, dan isu manajemen memori." },
  { nama: "PHP", token: "php", deskripsi: "ParseError, undefined variable, dan error pengembangan web PHP." },
];

export function Languages() {
  return (
    <section id="bahasa" className="section-padding border-b border-border">
      <div className="container-editorial">
        <FadeUp>
          <Eyebrow index="[06]" label="BAHASA DIDUKUNG" />
        </FadeUp>
        <FadeRight>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            5 Bahasa Pemrograman Populer
          </h2>
        </FadeRight>
        <FadeUp delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Knowledge base dengan 200+ pola error pada bahasa yang paling banyak
            digunakan di perkuliahan dan industri.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {bahasaList.map((b) => (
            <StaggerItem
              key={b.nama}
              lift
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-muted"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  .{b.token}
                </span>
                {b.popular && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent">populer</span>
                )}
              </div>
              <h3 className="mb-1 font-display text-lg font-semibold">{b.nama}</h3>
              <p className="mb-8 flex-1 text-xs leading-relaxed text-muted-foreground">{b.deskripsi}</p>
              <div className="mt-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Zap className="h-3 w-3 text-accent" /> real-time
                </span>
                <span className="inline-flex items-center gap-1">
                  <Layers className="h-3 w-3" /> KB
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12">
          <Link
            href="/bahasa"
            className="group inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-foreground"
          >
            Detail dukungan bahasa &amp; contoh error
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
