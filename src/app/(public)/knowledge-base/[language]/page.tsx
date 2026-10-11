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
      <section className="border-b border-border bg-background py-16">
        <div className="container-editorial">
          <Link
            href="/knowledge-base"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Semua Knowledge Base
          </Link>
          <div className="flex items-center gap-5">
            <span className="text-6xl">{lang.icon}</span>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {lang.nama}
              </h1>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                {lang.deskripsi}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-sm bg-muted px-3 py-1 font-medium text-foreground">
                  <Database className="mr-1 inline h-3.5 w-3.5" />
                  {languageCounts[lang.value] ?? entries.length} pola error
                </span>
                <span className="rounded-sm bg-muted/50 px-3 py-1 text-muted-foreground">
                  Ekstensi: {lang.extensions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial">
          <KbExplore entries={entries} languageName={lang.nama} />
        </div>
      </section>
    </div>
  );
}
