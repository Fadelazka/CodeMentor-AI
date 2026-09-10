import Link from "next/link";
import { MessageSquare, Database, History, BookOpen, BarChart3, ShieldCheck, PencilRuler, Zap } from "lucide-react";

const fiturUtama = [
  {
    icon: MessageSquare,
    title: "Chat Debugging Real-time",
    desc: "Chat dengan AI untuk konsultasi error kode, dibalas instan dalam Bahasa Indonesia.",
  },
  {
    icon: PencilRuler,
    title: "Editor Kode Terintegrasi",
    desc: "Tulis atau tempel kode Anda pada editor, pilih bahasa, dan minta penjelasan — langsung dari VS Code ekstensi maupun aplikasi web.",
  },
  {
    icon: Database,
    title: "Knowledge Base 200+ Error",
    desc: "Basis pengetahuan berisi 200+ pola error umum dengan solusi yang sudah terverifikasi untuk 5 bahasa pemrograman.",
  },
  {
    icon: Zap,
    title: "RAG + Groq Llama 3.1",
    desc: "Teknologi RAG (Retrieval-Augmented Generation) terintegrasi dengan Llama 3.1 di platform Groq untuk respons yang cepat dan akurat.",
  },
  {
    icon: History,
    title: "Riwayat Error",
    desc: "Semua riwayat analisis tersimpan rapi sehingga Anda bisa mempelajari kembali error yang pernah terjadi.",
  },
  {
    icon: BookOpen,
    title: "Rekomendasi Materi",
    desc: "Dapatkan rekomendasi materi pembelajaran yang sesuai dengan pola error yang Anda hadapi.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Admin",
    desc: "Monitoring penggunaan, performa AI, dan kelola knowledge base dalam satu dashboard komprehensif.",
  },
  {
    icon: ShieldCheck,
    title: "Akurasi ≥ 85%",
    desc: "Target akurasi penjelasan ≥85% dengan respons kurang dari 5 detik untuk pengalaman belajar yang maksimal.",
  },
];

export function Features() {
  return (
    <section id="fitur" className="section-padding">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Semua yang Anda Butuhkan untuk Belajar &amp; Debugging
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Dirancang khusus untuk membantu mahasiswa Indonesia memahami error
            kode mereka secara mandiri.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fiturUtama.map((fitur) => (
            <div
              key={fitur.title}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-dark-card"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 transition-all group-hover:from-blue-500 group-hover:to-indigo-600">
                <fitur.icon className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {fitur.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {fitur.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fitur"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
          >
            Lihat semua fitur secara detail
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}