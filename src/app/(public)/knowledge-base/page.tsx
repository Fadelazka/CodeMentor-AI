import type { Metadata } from "next";
import Link from "next/link";
import { Database, BookOpen, Languages, ArrowRight } from "lucide-react";
import { knowledgeBaseEntries, languageCounts } from "@/data/knowledge-base";
import { languages } from "@/data/mock";
import { KbExplore } from "@/components/knowledge-base/kb-explore";
import {
  PythonLogo,
  JavaScriptLogo,
  JavaLogo,
  CppLogo,
  PhpLogo,
} from "@/components/knowledge-base/language-logos";

export const metadata: Metadata = {
  title: "Knowledge Base CodeMentor AI",
  description:
    "Jelajahi knowledge base CodeMentor AI: 200+ pola error pemrograman di 5 bahasa, lengkap dengan deskripsi, solusi, dan contoh kode.",
};

function getLanguageLogo(code: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    python: PythonLogo,
    javascript: JavaScriptLogo,
    js: JavaScriptLogo,
    java: JavaLogo,
    cpp: CppLogo,
    cplusplus: CppLogo,
    php: PhpLogo,
  };
  return map[code.toLowerCase()] ?? null;
}

function LanguageLogo({ code, className = "w-12 h-12" }: { code: string; className?: string }) {
  const Logo = getLanguageLogo(code);
  return Logo ? <Logo className={className} /> : null;
}

export default function KnowledgeBasePage() {
  return (
    <div className="pt-16">
      <section className="border-b border-border bg-background py-20">
        <div className="container-editorial">
          <p className="kicker">Knowledge Base</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Jelajahi <span className="text-accent">200+ Pola Error</span> Pemrograman
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Database yang terus bertumbuh, dikurasi tim CodeMentor AI untuk pola
            error yang paling sering ditemui. Setiap entri berisi deskripsi
            penyebab, solusi langkah-demi-langkah, dan contoh kode.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#daftar" className="btn-primary">
              <Database className="h-4 w-4" /> Telusuri Error
            </a>
            <Link href="/chat" className="btn-secondary">
              Analisis Kode Langsung
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial">
          <div className="grid gap-6 sm:grid-cols-3">
            <StatCard icon={<BookOpen className="h-5 w-5" />} label="Pola error terdokumentasi" value="200+" />
            <StatCard icon={<Languages className="h-5 w-5" />} label="Bahasa didukung" value="5" />
            <StatCard icon={<Database className="h-5 w-5" />} label="Tingkat akurasi penjelasan" value="≥85%" />
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground">
              Per Bahasa
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {languages.map((lang) => (
                <Link
                  key={lang.value}
                  href={`/knowledge-base/${lang.value}`}
                  className="group rounded-sm border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-foreground/20"
                >
                  <div className="mb-3 flex h-12 items-center justify-center">
                    <LanguageLogo code={lang.value} />
                  </div>
                  <h3 className="font-bold text-foreground">{lang.nama}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {languageCounts[lang.value] ?? 0} contoh error di sini
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground group-hover:gap-2 transition-all">
                    Buka halaman <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div id="daftar" className="scroll-mt-24">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-8 items-center justify-center rounded-sm bg-ink px-3 text-xs font-bold text-paper">
                KB v1.0
              </div>
              <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
                Telusuri Semua Pola Error
              </h2>
            </div>
            <KbExplore entries={knowledgeBaseEntries} showLanguageFilter />
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-muted/30">
        <div className="container-editorial text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Punya error yang tidak ada di sini?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Kirim kode Anda ke CodeMentor AI. Penjelasan tetap diberikan meski
            polanya baru, lalu entri baru dikurasi untuk knowledge base.
          </p>
          <div className="mt-6">
            <Link href="/chat" className="btn-primary">
              Coba Sekarang
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
    <div className="rounded-sm border border-border bg-card p-6 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-muted text-foreground">
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
