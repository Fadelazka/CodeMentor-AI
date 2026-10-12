import Link from "next/link";
import { ArrowRight, MessageSquare, Database, History, BookOpen, BarChart3, ShieldCheck, PencilRuler, Zap } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeUp, FadeRight, StaggerContainer, StaggerItem } from "@/components/landing/animations";

const fiturUtama = [
  { icon: MessageSquare, title: "Chat Debugging Real-time", desc: "Chat dengan AI untuk konsultasi error kode, dibalas instan dalam Bahasa Indonesia." },
  { icon: PencilRuler, title: "Editor Kode Terintegrasi", desc: "Tulis atau tempel kode pada editor, pilih bahasa, dan minta penjelasan — dari VS Code maupun web." },
  { icon: Database, title: "Knowledge Base 200+ Error", desc: "Basis pengetahuan berisi 200+ pola error umum dengan solusi terverifikasi untuk 5 bahasa." },
  { icon: Zap, title: "RAG + Groq Llama 3.1", desc: "RAG terintegrasi dengan Llama 3.1 di platform Groq untuk respons yang cepat dan akurat." },
  { icon: History, title: "Riwayat Error", desc: "Semua riwayat analisis tersimpan rapi sehingga Anda bisa mempelajari kembali kesalahan yang pernah terjadi." },
  { icon: BookOpen, title: "Rekomendasi Materi", desc: "Dapatkan rekomendasi materi pembelajaran yang sesuai dengan pola error yang Anda hadapi." },
  { icon: BarChart3, title: "Dashboard Admin", desc: "Monitoring penggunaan, performa AI, dan kelola knowledge base dalam satu dashboard." },
  { icon: ShieldCheck, title: "Akurasi ≥ 85%", desc: "Target akurasi ≥85% dengan respons kurang dari 5 detik untuk pengalaman belajar maksimal." },
];

export function Features() {
  return (
    <section id="fitur" className="section-padding border-b border-border">
      <div className="container-editorial">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <FadeRight>
            <Eyebrow index="[04]" label="FITUR UNGGULAN" />
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Semua yang Anda Butuhkan untuk Belajar &amp; Debugging
            </h2>
          </FadeRight>
          <FadeUp delay={0.1} className="max-w-sm">
            <p className="text-base leading-relaxed text-muted-foreground">
              Dirancang khusus untuk membantu mahasiswa Indonesia memahami error
              kode secara mandiri.
            </p>
          </FadeUp>
        </div>

        <StaggerContainer className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {fiturUtama.map((fitur, i) => (
            <StaggerItem key={fitur.title} lift className="group flex flex-col bg-background p-8 transition-colors hover:bg-muted">
              <div className="mb-8 flex items-center justify-between">
                <fitur.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.5} />
                <p className="font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="mb-2 font-display text-base font-semibold">{fitur.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{fitur.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12">
          <Link
            href="/fitur"
            className="group inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-foreground"
          >
            Lihat semua fitur secara detail
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
