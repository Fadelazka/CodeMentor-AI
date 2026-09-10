import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Code2, FileCode2, BookOpen, ArrowRight } from "lucide-react";
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
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-600/5 to-transparent py-20 dark:border-slate-800">
        <div className="container-custom text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Bahasa Didukung
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            5 Bahasa Pemrograman, <span className="text-gradient">200+ Error</span> Dipahami
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Basis pengetahuan yang terus bertumbuh, dikurasi khusus untuk pola
            error yang paling sering ditemui mahasiswa Indonesia.
          </p>
        </div>
      </section>

      {/* Language detail cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-6">
            {detailBahasa.map((b, i) => (
              <div
                key={b.nama}
                className={`grid gap-8 rounded-2xl border border-slate-200 bg-white p-8 lg:grid-cols-[1fr_1.5fr] dark:border-slate-800 dark:bg-dark-card ${
                  i % 2 === 1 ? "lg:bg-slate-50 dark:lg:bg-slate-900/40" : ""
                }`}
              >
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-4xl">{b.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {b.nama}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {b.extensionLabel}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {b.deskripsi}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Ekosistem populer</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200">{b.stack}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Pola error di KB</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">{b.kapasitasKB} error</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Ekstensi file</span>
                      <span className="font-mono text-xs text-slate-700 dark:text-slate-200">{b.extensions}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Contoh error yang dikenal
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {b.contohError.map((e) => (
                      <span
                        key={e}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {e}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Contoh penjelasan singkat
                  </h3>
                  <div className="space-y-3">
                    {sampleErrors[b.value as keyof typeof sampleErrors]
                      ?.slice(0, 2)
                      .map((e) => (
                        <div
                          key={e.code}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60"
                        >
                          <div className="mb-1 font-mono text-sm font-semibold text-red-500">
                            {e.code}
                          </div>
                          <p className="mb-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                            {e.contoh}
                          </p>
                          <div className="flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400">
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

      {/* Searching for a specific language */}
      <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-custom text-center">
          <FileCode2 className="mx-auto mb-4 h-12 w-12 text-blue-500" />
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
            Bahasa Anda belum ada di daftar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
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