import type { Metadata } from "next";
import Link from "next/link";
import { Database, BookOpen, Languages, Sparkles, ArrowRight } from "lucide-react";
import { knowledgeBaseEntries, languageCounts } from "@/data/knowledge-base";
import { languages } from "@/data/mock";
import { KbExplore } from "@/components/knowledge-base/kb-explore";

export const metadata: Metadata = {
  title: "Knowledge Base CodeMentor AI",
  description:
    "Jelajahi knowledge base CodeMentor AI: 200+ pola error pemrograman di 5 bahasa, lengkap dengan deskripsi, solusi, dan contoh kode.",
};

export default function KnowledgeBasePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-600/5 to-transparent py-20 dark:border-slate-800">
        <div className="container-custom">
          <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Knowledge Base
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Jelajahi <span className="text-gradient">200+ Pola Error</span> Pemrograman
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Database yang terus bertumbuh, dikurasi tim CodeMentor AI untuk pola
            error yang paling sering ditemui. Setiap entri berisi deskripsi
            penyebab, solusi langkah-demi-langkah, dan contoh kode.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#daftar" className="btn-primary">
              <Database className="h-4 w-4" /> Telusuri Error
            </a>
            <Link href="/chat" className="btn-secondary">
              <Sparkles className="h-4 w-4" /> Analisis Kode Langsung
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-3">
            <StatCard icon={<BookOpen className="h-5 w-5" />} label="Pola error terdokumentasi" value="200+" />
            <StatCard icon={<Languages className="h-5 w-5" />} label="Bahasa didukung" value="5" />
            <StatCard icon={<Sparkles className="h-5 w-5" />} label="Tingkat akurasi penjelasan" value="≥85%" />
          </div>

          {/* Language quick links */}
          <div className="mt-12">
            <h2 className="mb-6 text-center text-2xl font-bold tracking-tight dark:text-white">
              Per Bahasa
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {languages.map((lang) => (
                <Link
                  key={lang.value}
                  href={`/knowledge-base/${lang.value}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-dark-card"
                >
                  <div className="mb-3 text-3xl">{lang.icon}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{lang.nama}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {languageCounts[lang.value] ?? 0} contoh error di sini
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 dark:text-blue-400 transition-all">
                    Buka halaman <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div id="daftar" className="scroll-mt-24">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 px-3 text-xs font-bold text-white">
                KB v1.0
              </div>
              <h2 className="text-center text-2xl font-bold tracking-tight dark:text-white">
                Telusuri Semua Pola Error
              </h2>
            </div>
            <KbExplore entries={knowledgeBaseEntries} showLanguageFilter />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
            Punya error yang tidak ada di sini?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Kirim kode Anda ke CodeMentor AI. Penjelasan tetap diberikan meski
            polanya baru, lalu entri baru dikurasi untuk knowledge base.
          </p>
          <div className="mt-6">
            <Link href="/chat" className="btn-primary">
              <Sparkles className="h-4 w-4" /> Coba Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-dark-card">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}