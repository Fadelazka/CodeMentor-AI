import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Database } from "lucide-react";
import { knowledgeBaseEntries, languageCounts } from "@/data/knowledge-base";
import { languages } from "@/data/mock";
import { KbExplore } from "@/components/knowledge-base/kb-explore";

interface Props {
  params: { language: string };
}

export function generateStaticParams() {
  return languages.map((lang) => ({ language: lang.value }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = languages.find((l) => l.value === params.language);
  if (!lang) return {};
  return {
    title: `Knowledge Base ${lang.nama}`,
    description: `Pola error paling umum di ${lang.nama} ${lang.extensions} dengan solusi langkah-demi-langkah dari CodeMentor AI.`,
  };
}

export default function KnowledgeBaseLanguagePage({ params }: Props) {
  const lang = languages.find((l) => l.value === params.language);
  if (!lang) notFound();

  const entries = knowledgeBaseEntries.filter((e) => e.language === params.language);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-600/5 to-transparent py-16 dark:border-slate-800">
        <div className="container-custom">
          <Link
            href="/knowledge-base"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" /> Semua Knowledge Base
          </Link>
          <div className="flex items-center gap-5">
            <span className="text-6xl">{lang.icon}</span>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                {lang.nama}
              </h1>
              <p className="mt-2 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                {lang.deskripsi}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 font-medium text-blue-600 dark:text-blue-400">
                  <Database className="mr-1 inline h-3.5 w-3.5" />
                  {languageCounts[lang.value] ?? entries.length} pola error
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Ekstensi: {lang.extensions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="section-padding">
        <div className="container-custom">
          <KbExplore entries={entries} languageName={lang.nama} />
        </div>
      </section>
    </div>
  );
}