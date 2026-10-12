"use client";

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Database } from "lucide-react";
import { knowledgeBaseEntries, languageCounts } from "@/data/knowledge-base";
import { languages } from "@/data/mock";
import { KbExplore } from "@/components/knowledge-base/kb-explore";
import { PageHeader } from "@/components/ui/page-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { GlassCard } from "@/components/ui/glass-card";

interface Props {
  params: { language: string };
}

export default function KnowledgeBaseLanguagePage({ params }: Props) {
  const lang = languages.find((l) => l.value === params.language);
  if (!lang) notFound();

  const entries = knowledgeBaseEntries.filter((e) => e.language === params.language);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Knowledge Base"
        icon={Database}
        title={lang.nama}
        description={lang.deskripsi}
        actions={
          <Link href="/knowledge-base">
            <GradientButton variant="outline" icon={ArrowLeft} size="sm">
              Kembali
            </GradientButton>
          </Link>
        }
      />

      <div className="mb-6 flex items-center gap-5">
        <span className="text-6xl">{lang.icon}</span>
        <div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-sm bg-[#FF3B6B]/20 px-3 py-1 font-medium text-[#FF3B6B]">
              <Database className="mr-1 inline h-3.5 w-3.5" />
              {languageCounts[lang.value] ?? entries.length} pola error
            </span>
            <span className="rounded-sm bg-white/[0.04] px-3 py-1 text-zinc-400">
              Ekstensi: {lang.extensions}
            </span>
          </div>
        </div>
      </div>

      <GlassCard className="p-6">
        <KbExplore entries={entries} languageName={lang.nama} />
      </GlassCard>
    </div>
  );
}