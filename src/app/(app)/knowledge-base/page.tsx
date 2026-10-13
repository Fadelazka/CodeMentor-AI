"use client";

import Link from "next/link";
import { Database, BookOpen, Languages, ArrowRight, LayoutDashboard } from "lucide-react";
import { knowledgeBaseEntries, languageCounts } from "@/data/knowledge-base";
import { languages } from "@/data/mock";
import { KbExplore } from "@/components/knowledge-base/kb-explore";
import { PythonLogo, JavaScriptLogo, JavaLogo, CppLogo, PhpLogo } from "@/components/knowledge-base/language-logos";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";

const languageLogos: Record<string, typeof PythonLogo> = {
  python: PythonLogo,
  javascript: JavaScriptLogo,
  java: JavaLogo,
  cpp: CppLogo,
  php: PhpLogo,
};

export default function KnowledgeBasePage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Knowledge Base"
        icon={Database}
        title="Jelajahi Knowledge Base"
        description="Database yang terus bertumbuh, dikurasi tim CodeMentor AI untuk pola error yang paling sering ditemui. Setiap entri berisi deskripsi penyebab, solusi langkah-demi-langkah, dan contoh kode."
        actions={
          <Link href="/chat">
            <GradientButton icon={ArrowRight}>Analisis Kode Langsung</GradientButton>
          </Link>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricCard
          icon={BookOpen}
          label="Pola error terdokumentasi"
          value="200+"
          accent="cyan"
          spark={[10, 20, 15, 30, 45, 60, 80, 100, 120, 150, 180, 200]}
        />
        <MetricCard
          icon={Languages}
          label="Bahasa didukung"
          value="5"
          accent="green"
          spark={[1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5]}
        />
        <MetricCard
          icon={Database}
          label="Tingkat akurasi penjelasan"
          value="≥85%"
          accent="amber"
          spark={[70, 72, 75, 78, 80, 82, 83, 84, 85, 85, 85, 85]}
        />
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-white">
          Per Bahasa
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {languages.map((lang) => {
            const Logo = languageLogos[lang.value];
            return (
              <Link
                key={lang.value}
                href={`/knowledge-base/${lang.value}`}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:-translate-y-1 hover:border-white/[0.12]"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center">
                  {Logo ? (
                    <Logo className="h-full w-full transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <span className="text-3xl">{lang.icon}</span>
                  )}
                </div>
                <h3 className="font-bold text-white">{lang.label}</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  {languageCounts[lang.value] ?? 0} contoh error di sini
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                  Buka halaman <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div id="daftar" className="scroll-mt-24 mt-16">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-8 items-center justify-center rounded-sm bg-[#FF3B6B]/20 px-3 text-xs font-bold text-[#FF3B6B]">
            KB v1.0
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">
            Telusuri Semua Pola Error
          </h2>
        </div>
        <GlassCard className="p-6">
          <KbExplore entries={knowledgeBaseEntries} showLanguageFilter />
        </GlassCard>
      </div>

      <div className="mt-16 border-t border-white/[0.06] pt-16 text-center">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl text-white">
          Punya error yang tidak ada di sini?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
          Kirim kode Anda ke CodeMentor AI. Penjelasan tetap diberikan meski
          polanya baru, lalu entri baru dikurasi untuk knowledge base.
        </p>
        <div className="mt-6">
          <Link href="/chat">
            <GradientButton icon={ArrowRight} size="lg">
              Coba Sekarang
            </GradientButton>
          </Link>
        </div>
      </div>
    </div>
  );
}