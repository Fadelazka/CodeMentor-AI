import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Code2, FileCode2, BookOpen, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { languages, sampleErrors } from "@/data/mock";

export const metadata: Metadata = {
  title: "Bahasa Didukung",
  description:
    "CodeMentor AI mendukung 5 bahasa pemrograman: Python, JavaScript, Java, C++, dan PHP dengan knowledge base 200+ error.",
};

const detailBahasa = [
  {
    ...languages[0],
    contohError: ["SyntaxError", "IndexError", "KeyError", "TypeError", "NameError", "ZeroDivisionError"],
    stack: "Jupyter, Django, Flask, Pandas, NumPy",
    kapasitasKB: 52,
  },
  {
    ...languages[1],
    contohError: ["SyntaxError", "ReferenceError", "TypeError", "Uncaught RangeError", "Promise Rejection"],
    stack: "Node.js, React, Next.js, Express",
    kapasitasKB: 48,
  },
  {
    ...languages[2],
    contohError: ["NullPointerException", "ArrayIndexOutOfBounds", "ClassNotFoundException", "InputMismatchException"],
    stack: "Java SE, JDBC, Jakarta EE",
    kapasitasKB: 44,
  },
  {
    ...languages[3],
    contohError: ["Segmentation Fault", "Compilation Error", "Linker Error", "Memory Leak Warning"],
    stack: "STL, CMake, GLIBC++",
    kapasitasKB: 36,
  },
  {
    ...languages[4],
    contohError: ["ParseError", "Undefined Variable", "Fatal Error", "Type Error (PHP)"],
    stack: "Composer, Laravel, Wordpress",
    kapasitasKB: 20,
  },
];

export default function BahasaPage() {
  return (
    <div>
      <section className="section-padding border-b border-border">
        <div className="container-editorial text-center">
          <Eyebrow index="[02]" label="BAHASA DIDUKUNG" className="justify-center" />
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            5 Bahasa Pemrograman, <span className="text-accent">200+ Error</span> Dipahami
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Basis pengetahuan yang terus bertumbuh, dikurasi khusus untuk pola
            error yang paling sering ditemui mahasiswa Indonesia.
          </p>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <div className="grid gap-px border border-border bg-border">
            {detailBahasa.map((b, i) => (
              <div
                key={b.nama}
                className="grid gap-8 bg-background p-8 lg:grid-cols-[1fr_1.5fr]"
              >
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        {b.nama}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {b.extensionLabel}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {b.deskripsi}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ekosistem populer</span>
                      <span className="font-medium text-foreground">{b.stack}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pola error di KB</span>
                      <span className="font-medium text-accent">{b.kapasitasKB} error</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ekstensi file</span>
                      <span className="font-mono text-xs text-foreground">{b.extensions}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Contoh error yang dikenal
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {b.contohError.map((e) => (
                      <span
                        key={e}
                        className="border border-border bg-muted px-3 py-1.5 font-mono text-xs text-foreground"
                      >
                        {e}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Contoh penjelasan singkat
                  </h3>
                  <div className="space-y-3">
                    {sampleErrors[b.value as keyof typeof sampleErrors]
                      ?.slice(0, 2)
                      .map((e) => (
                        <div
                          key={e.code}
                          className="border border-border bg-muted p-4"
                        >
                          <div className="mb-1 font-mono text-sm font-semibold text-accent">
                            {e.code}
                          </div>
                          <p className="mb-2 font-mono text-xs text-muted-foreground">
                            {e.contoh}
                          </p>
                          <div className="flex items-center gap-2 text-xs font-medium text-success">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Solusi: {e.solusi}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial text-center">
          <FileCode2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Bahasa Anda belum ada di daftar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Knowledge base terus diperluas. Beri tahu kami bahasa apa yang Anda
            butuhkan melalui form feedback di aplikasi.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/knowledge-base" className="btn-secondary">
              <BookOpen className="h-4 w-4" /> Jelajahi Knowledge Base
            </Link>
            <Link href="/chat" className="btn-primary">
              <Code2 className="h-4 w-4" /> Coba Analisis Kode
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
