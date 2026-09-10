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
    <div className="pt-16">
      {/* Hero section */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-600/5 to-transparent py-20 dark:border-slate-800">
        <div className="container-custom text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Fitur
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Fitur Lengkap untuk <span className="text-gradient">Belajar Debugging</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
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

      {/* VS Code vs Web comparison */}
      <section id="vscode" className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Dua Cara Pakai, Satu Pengalaman
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Pilih yang paling nyaman untuk alur kerja Anda.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-50 p-8 dark:bg-slate-900">
              <span className="absolute right-4 top-4 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                Ditulis untuk developer
              </span>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                <Monitor className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                VS Code Extension
              </h3>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
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
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Download className="h-4 w-4" /> Install Ekstensi
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-dark-card">
              <span className="absolute right-4 top-4 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                Tanpa instalasi
              </span>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600">
                <Smartphone className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                Aplikasi Web
              </h3>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
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
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/chat"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-green-700 hover:to-emerald-700"
              >
                Buka Chat AI <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed features grid */}
      <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Jelajahi Semua Kemampuan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Setiap fitur dirancang untuk mempercepat pemahaman dan mengurangi frustasi saat debugging.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detailFitur.map((f) => (
              <div key={f.title} className="group rounded-xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-dark-card">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                    <f.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {f.kategori}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.desc}
                </p>
                <ul className="space-y-2.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-14 text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Siap Mulai Debugging dengan Lebih Cerdas?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Gratis untuk mahasiswa. Setup kurang dari 2 menit.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/daftar" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">
                Daftar Gratis
              </Link>
              <Link href="/chat" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20">
                Coba Tanpa Registrasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}