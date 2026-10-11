import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  Database,
  History,
  BarChart3,
  BookOpen,
  Zap,
  ShieldCheck,
  PencilRuler,
  Smartphone,
  Download,
  ArrowRight,
  CheckCircle2,
  Monitor,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Fitur",
  description:
    "Fitur lengkap CodeMentor AI: chat debugging real-time, knowledge base 200+ error, rekomendasi materi, dan dashboard admin.",
};

const detailFitur = [
  {
    icon: MessageSquare,
    kategori: "Chat AI",
    title: "Konsultasi Error via Chat",
    desc: "Tanyakan error kode Anda secara langsung dan dapatkan jawaban instan dari AI mentor. Tersedia konteks percakapan, riwayat diskusi, dan akses 24/7.",
    bullets: [
      "Chat real-time dalam Bahasa Indonesia",
      "Konteks percakapan multi-babak",
      "Riwayat diskusi tersimpan otomatis",
      "Ekspor hasil diskusi ke markdown",
    ],
  },
  {
    icon: PencilRuler,
    kategori: "Editor",
    title: "Editor Kode Terintegrasi",
    desc: "Tulis kode langsung di editor (CodeMirror) bertema VS Code di web, atau gunakan ekstensi kami langsung di editor favorit Anda.",
    bullets: [
      "Syntax highlighting 5 bahasa",
      "Deteksi error otomatis saat mengetik (VS Code)",
      "Tombol satu-klik 'Jelaskan Error'",
      "Mode gelap & terang",
    ],
  },
  {
    icon: Database,
    kategori: "Knowledge Base",
    title: "Knowledge Base 200+ Error",
    desc: "Basis pengetahuan berisi 200+ pola error umum yang sudah dikurasi dan diterjemahkan ke Bahasa Indonesia oleh tim AI Engineer.",
    bullets: [
      "Pola error terverifikasi & tervalidasi",
      "Penjelasan dengan contoh kode yang dapat dijalankan",
      "Dilengkapi materi pembelajaran terkait",
      "Selalu diperbarui berdasarkan feedback",
    ],
  },
  {
    icon: Zap,
    kategori: "AI & RAG",
    title: "Groq Llama 3.1 + RAG",
    desc: "Kombinasi model Llama 3.1 di platform Groq yang sangat cepat dengan RAG (Retrieval-Augmented Generation) untuk akurasi tinggi.",
    bullets: [
      "Respons < 5 detik",
      "Retrieval dari knowledge base terverifikasi",
      "Confidence score setiap penjelasan",
      "Akurasi target ≥ 85%",
    ],
  },
  {
    icon: History,
    kategori: "Riwayat",
    title: "Riwayat Error & Analisis",
    desc: "Semua analisis tersimpan aman. Pelajari kembali error yang pernah Anda hadapi dan lacak progres belajar Anda.",
    bullets: [
      "Pencarian riwayat berdasarkan bahasa & tanggal",
      "Filter berdasarkan tingkat kesulitan",
      "Statistik error paling sering terjadi",
      "Ekspor data riwayat",
    ],
  },
  {
    icon: BookOpen,
    kategori: "Belajar",
    title: "Rekomendasi Materi",
    desc: "Setiap penjelasan error disertai rekomendasi materi belajar yang relevan untuk memperdalam pemahaman konsep.",
    bullets: [
      "Materi sesuai konteks error",
      "Referensi buku, artikel, dan video",
      "Peta belajar terstruktur",
      "Progress tracking",
    ],
  },
  {
    icon: BarChart3,
    kategori: "Admin",
    title: "Dashboard Admin Terpadu",
    desc: "Kelola seluruh platform dalam satu dashboard: monitoring penggunaan, performa AI, dan manajemen knowledge base.",
    bullets: [
      "Monitoring penggunaan real-time",
      "Analisis performa & akurasi AI",
      "Manajemen knowledge base (CRUD)",
      "Laporan kepuasan pengguna & feedback",
    ],
  },
];

export default function FiturPage() {
  return (
    <div>
      <section className="section-padding border-b border-border">
        <div className="container-editorial text-center">
          <Eyebrow index="[01]" label="FITUR" className="justify-center" />
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Fitur Lengkap untuk <span className="text-accent">Belajar Debugging</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Dua platform, satu tujuan: membuat Anda paham error kode dalam Bahasa
            Indonesia — di VS Code dan di browser.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/chat" className="btn-primary">
              Coba di Web <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#vscode" className="btn-secondary">
              <Download className="h-4 w-4" /> Instal Ekstensi
            </Link>
          </div>
        </div>
      </section>

      <section id="vscode" className="section-padding border-b border-border">
        <div className="container-editorial">
          <SectionTitle
            eyebrow="KOMPARASI"
            title="Dua Cara Pakai, Satu Pengalaman"
            description="Pilih yang paling nyaman untuk alur kerja Anda."
            center
          />

          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            <div className="relative bg-background p-8">
              <span className="mb-6 inline-block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Ditulis untuk developer
              </span>
              <div className="mb-6 flex h-12 w-12 items-center justify-center">
                <Monitor className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">
                VS Code Extension
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Instal langsung di editor Anda. Error terdeteksi otomatis saat Anda mengetik.
              </p>
              <ul className="space-y-3">
                {[
                  "Deteksi error otomatis saat mengetik",
                  "Tooltip penjelasan instan di panel editor",
                  "Zero konteks switching — tetap fokus pada kode",
                  "Kompatibel dengan VS Code & Cursor",
                  "Ada tombol 'Tanyakan ke CodeMentor AI'",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="mt-8 inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <Download className="h-4 w-4" /> Install Ekstensi
              </Link>
            </div>

            <div className="relative bg-background p-8">
              <span className="mb-6 inline-block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Tanpa instalasi
              </span>
              <div className="mb-6 flex h-12 w-12 items-center justify-center">
                <Smartphone className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">
                Aplikasi Web
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Gunakan langsung dari browser. Cocok untuk latihan dan saat tidak di depan VS Code.
              </p>
              <ul className="space-y-3">
                {[
                  "Editor kode bawaan dengan syntax highlighting",
                  "Chat AI dengan riwayat percakapan",
                  "Pilih bahasa dari 5 opsi",
                  "Rekomendasi materi & peta belajar",
                  "Fitur ekspor hasil analisis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/chat"
                className="mt-8 inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 dark:bg-paper dark:text-ink dark:hover:bg-paper/90"
              >
                Buka Chat AI <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <SectionTitle
            eyebrow="DETAIL"
            title="Jelajahi Semua Kemampuan"
            description="Setiap fitur dirancang untuk mempercepat pemahaman dan mengurangi frustasi saat debugging."
            center
          />

          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {detailFitur.map((f, i) => (
              <div key={f.title} className="group flex flex-col bg-background p-7 transition-colors hover:bg-muted">
                <div className="mb-5 flex items-center justify-between">
                  <f.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="mb-3 font-mono text-[11px] uppercase tracking-wider text-accent">
                  {f.kategori}
                </span>
                <h3 className="mb-2 font-display text-lg font-bold">
                  {f.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
                <ul className="mt-auto space-y-2.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial">
          <div className="bg-ink px-8 py-16 text-paper sm:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-6 font-mono text-xs uppercase tracking-wider text-paper/50">
                [07] MULAI SEKARANG
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Siap Mulai Debugging dengan Lebih Cerdas?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/60">
                Gratis untuk mahasiswa. Setup kurang dari 2 menit.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/daftar"
                  className="inline-flex w-full items-center justify-center gap-2 bg-paper px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-paper/90 sm:w-auto"
                >
                  Daftar Gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex w-full items-center justify-center gap-2 border border-paper/20 px-8 py-4 text-sm font-semibold text-paper transition-colors hover:bg-paper/10 sm:w-auto"
                >
                  Coba Tanpa Registrasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
