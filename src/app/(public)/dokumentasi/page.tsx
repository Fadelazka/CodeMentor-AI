import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Lightbulb, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Dokumentasi",
  description:
    "Dokumentasi teknis proyek CodeMentor AI: arsitektur, teknologi, dan cara kerja.",
};

const docsLinks = [
  { href: "/cara-kerja", title: "Cara Kerja", desc: "Alur RAG + Llama 3.1, teknologi yang digunakan", icon: Lightbulb },
  { href: "/fitur", title: "Fitur", desc: "Detail fitur platform CodeMentor AI", icon: Rocket },
  { href: "/bahasa", title: "Bahasa Didukung", desc: "5 bahasa pemrograman populer", icon: Code2 },
  { href: "/knowledge-base", title: "Knowledge Base", desc: "Indeks 200+ pola error", icon: BookOpen },
];

export default function DokumentasiPage() {
  return (
    <div className="pt-16">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-600/5 to-transparent py-20 dark:border-slate-800">
        <div className="container-custom text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Dokumentasi
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Dokumentasi <span className="text-gradient">CodeMentor AI</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Seluruh dokumentasi teknis dan cara kerja platform CodeMentor AI.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
            <code className="font-mono text-blue-600 dark:text-blue-400">MP-TI/CMAI/2026/001</code>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400">Versi 1.0</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400">1 Sep – 15 Des 2026</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {docsLinks.map((d) => (
              <Link key={d.href} href={d.href} className="group">
                <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all group-hover:-translate-y-1 group-hover:border-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-dark-card">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 transition-all group-hover:bg-blue-600">
                    <d.icon className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white dark:text-blue-400" />
                  </div>
                  <h2 className="mb-1.5 font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {d.title}
                  </h2>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{d.desc}</p>
                  <div className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Buka dokumen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}