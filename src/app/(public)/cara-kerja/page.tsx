import type { Metadata } from "next";
import Link from "next/link";
import { Code, Search, Cpu, Terminal, BookOpenCheck, FileText, Rss, Database } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";

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
    icon: Terminal,
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
    <div>
      <section className="section-padding border-b border-border">
        <div className="container-editorial text-center">
          <Eyebrow index="[03]" label="CARA KERJA" className="justify-center" />
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Di Balik Layar <span className="text-accent">Penjelasan Error</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Dari kode yang Anda tempel hingga penjelasan Bahasa Indonesia yang
            mudah dipahami — begini alurnya bekerja.
          </p>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <SectionTitle
            eyebrow="ALUR ANALISIS"
            title="Enam Tahap Analisis Error"
            description="Enam tahap yang mengubah pesan error membingungkan menjadi penjelasan bermakna."
            center
          />

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {tahapAlur.map((t) => (
              <div key={t.nomor} className="flex flex-col bg-background p-7">
                <div className="mb-4 flex items-center justify-between">
                  <t.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {t.nomor}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">
                  {t.title}
                </h3>
                <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <SectionTitle
            eyebrow="TEKNOLOGI"
            title="Teknologi di Belakangnya"
            description="Kombinasi model AI modern dan knowledge base yang dikurasi dengan teliti."
            center
          />

          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {teknologi.map((t) => (
              <div key={t.nama} className="flex gap-4 bg-background p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                  <t.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-display font-bold">{t.nama}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      {t.peran}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <SectionTitle
            eyebrow="PANDUAN"
            title="Pengalaman Penggunaan Sehari-hari"
            description="Beginilah alur penggunaan CodeMentor AI dari sudut pandang mahasiswa."
            center
          />

          <div className="mx-auto max-w-2xl">
            <div className="relative space-y-8 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-border">
              {alurLangkahPraktis.map((l) => (
                <div key={l.langkah} className="relative flex gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-ink font-mono text-xs font-bold text-paper dark:bg-paper dark:text-ink">
                    {String(l.langkah).padStart(2, "0")}
                  </div>
                  <div className="flex-1 border border-border bg-background p-5">
                    <h3 className="mb-1 font-display font-bold">{l.judul}</h3>
                    <p className="text-sm text-muted-foreground">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Coba Langsung Sekarang
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
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
