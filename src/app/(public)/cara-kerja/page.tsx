import type { Metadata } from "next";
import Link from "next/link";
import { Code, Search, Cpu, Sparkles, BookOpenCheck, Terminal, FileText, Rss, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Cara Kerja",
  description:
    "Pahami cara kerja CodeMentor AI: alur analisis error, teknologi RAG + Llama 3.1, dan bagaimana penjelasan dihasilkan dalam Bahasa Indonesia.",
};

const tahapAlur = [
  {
    icon: Code,
    nomor: "01",
    title: "Input Kode",
    desc: "Pengguna menulis kode di editor VS Code (deteksi otomatis) atau menempel kode + pesan error di aplikasi web.",
  },
  {
    icon: Search,
    nomor: "02",
    title: "Identifikasi Error",
    desc: "Sistem mengekstrak pesan error, stack trace, dan konteks kode di sekitar baris yang bermasalah.",
  },
  {
    icon: Cpu,
    nomor: "03",
    title: "Analisis dengan RAG",
    desc: "Pipeline RAG melakukan retrieval dari knowledge base 200+ error untuk mencari pola paling relevan dengan query.",
  },
  {
    icon: Database,
    nomor: "04",
    title: "Generasi Jawaban",
    desc: "Groq Llama 3.1 menggabungkan konteks kode + hasil retrieval untuk menyusun penjelasan dalam Bahasa Indonesia.",
  },
  {
    icon: Sparkles,
    nomor: "05",
    title: "Confidence Score",
    desc: "Setiap jawaban diberi skor keyakinan (confidence) berdasarkan kecocokan retrieval dan validasi internal.",
  },
  {
    icon: BookOpenCheck,
    nomor: "06",
    title: "Feedback & Learning",
    desc: "Pengguna memberi feedback (membantu/tidak). Data ini dipakai untuk memperbaiki kualitas knowledge base.",
  },
];

const teknologi = [
  {
    icon: Terminal,
    nama: "Groq Llama 3.1",
    peran: "LLM Utama",
    desc: "Model Llama 3.1 dijalankan pada infrastruktur Groq yang memberikan inferensi sangat cepat (<5 detik).",
  },
  {
    icon: Database,
    nama: "Knowledge Base RAG",
    peran: "Kurasi Manusia + AI",
    desc: "200+ pola error dikurasi tim AI Engineer, diterjemahkan, dan disimpan dalam bentuk terstruktur.",
  },
  {
    icon: Rss,
    nama: "Vector Embedding",
    peran: "Retrieval",
    desc: "Dokumen diubah menjadi embedding vektor sehingga pencarian error serupa menjadi presisi dan cepat.",
  },
  {
    icon: FileText,
    nama: "Context Engineering",
    peran: "Prompt & Konteks",
    desc: "Pesan error, potongan kode, dan hasil retrieval disusun menjadi konteks optimal untuk model.",
  },
];

const alurLangkahPraktis = [
  {
    langkah: 1,
    judul: "Buka VS Code Anda",
    detail: "Pastikan ekstensi CodeMentor AI sudah terpasang. Anda juga bisa menggunakan aplikasi web di codementor.ai/chat.",
  },
  {
    langkah: 2,
    judul: "Menulis Kode Seperti Biasa",
    detail: "Ekstensi akan menandai error dengan ikon berwarna merah di editor, sama seperti inferensi biasa namun dengan deteksi yang lebih dalam.",
  },
  {
    langkah: 3,
    judul: "Hover / Klik 'Jelaskan Error'",
    detail: "Arahkan kursor ke garis merah atau klik tombol 'Jelaskan Error' untuk membuka panel penjelasan dari CodeMentor AI.",
  },
  {
    langkah: 4,
    judul: "Baca Penjelasan & Contoh Perbaikan",
    detail: "Panel menampilkan penyebab error, cara memperbaiki, contoh kode, dan materi rekomendasi — semua dalam Bahasa Indonesia.",
  },
  {
    langkah: 5,
    judul: "Terapkan & Beri Feedback",
    detail: "Salin perbaikan yang disarankan, terapkan, lalu beri feedback untuk membantu meningkatkan kualitas AI.",
  },
];

export default function CaraKerjaPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-600/5 to-transparent py-20 dark:border-slate-800">
        <div className="container-custom text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Cara Kerja
          </span>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Di Balik Layar <span className="text-gradient">Penjelasan Error</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Dari kode yang Anda tempel hingga penjelasan Bahasa Indonesia yang
            mudah dipahami — begini alurnya bekerja.
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Alur Analisis Error
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Enam tahap yang mengubah pesan error membingungkan menjadi penjelasan bermakna.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tahapAlur.map((t, i) => (
              <div key={t.nomor} className="relative rounded-xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-dark-card">
                {i < tahapAlur.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-blue-500/30 lg:block"
                    style={{ display: i % 3 === 2 ? "none" : "block" }}
                  />
                )}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                    <t.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-slate-100 dark:text-slate-800">
                    {t.nomor}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {t.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teknologi */}
      <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Teknologi di Belakangnya
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Kombinasi model AI modern dan knowledge base yang dikurasi dengan teliti.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {teknologi.map((t) => (
              <div key={t.nama} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-dark-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                  <t.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{t.nama}</h3>
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                      {t.peran}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Langkah praktis */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Pengalaman Penggunaan Sehari-hari
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Beginilah alur penggunaan CodeMentor AI dari sudut pandang mahasiswa.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative space-y-8 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-purple-500">
              {alurLangkahPraktis.map((l) => (
                <div key={l.langkah} className="relative flex gap-6">
                  <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                    {l.langkah}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-dark-card">
                    <h3 className="mb-1 font-bold text-slate-900 dark:text-white">{l.judul}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
            Coba Langsung Sekarang
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            Rasakan sendiri bagaimana CodeMentor AI menjelaskan error kode Anda.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/chat" className="btn-primary">Buka Chat AI</Link>
            <Link href="/fitur#vscode" className="btn-secondary">Install VS Code Extension</Link>
          </div>
        </div>
      </section>
    </div>
  );
}