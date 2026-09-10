import { Accordion } from "@/components/ui/accordion";

const faqItems = [
  {
    title: "CodeMentor AI itu apa?",
    content:
      "CodeMentor AI adalah AI mentor pemrograman yang membantu mahasiswa memahami error kode dalam Bahasa Indonesia. Tersedia sebagai ekstensi VS Code dan aplikasi web yang mendukung 5 bahasa pemrograman populer.",
  },
  {
    title: "Apakah CodeMentor AI gratis?",
    content:
      "Ya, CodeMentor AI tersedia gratis untuk mahasiswa selama periode program. Cukup daftar dengan email kampus Anda untuk mendapatkan akses penuh ke semua fitur.",
  },
  {
    title: "Bahasa pemrograman apa saja yang didukung?",
    content:
      "CodeMentor AI mendukung 5 bahasa pemrograman: Python, JavaScript, Java, C++, dan PHP. Knowledge base berisi 200+ pola error umum yang terus diperbarui.",
  },
  {
    title: "Bagaimana saya menginstal ekstensi VS Code?",
    content:
      "Buka Visual Studio Code, masuk ke tab Extensions, cari 'CodeMentor AI', lalu klik Install. Setelah terpasang, ekstensi akan otomatis mendeteksi error saat Anda mengetik kode.",
  },
  {
    title: "Seberapa cepat respons AI-nya?",
    content:
      "Dengan teknologi Groq Llama 3.1 dan optimasi RAG, CodeMentor AI menargetkan respons di bawah 5 detik untuk setiap analisis error.",
  },
  {
    title: "Apakah kode saya aman?",
    content:
      "Keamanan adalah prioritas. Kode yang Anda tempel hanya digunakan untuk analisis error dan tidak dibagikan ke pihak ketiga. Lihat kebijakan privasi kami untuk detail lebih lanjut.",
  },
  {
    title: "Apakah ada fitur optimasi otomatis kode?",
    content:
      "Tidak. Sesuai ruang lingkup proyek, CodeMentor AI fokus pada penjelasan error dan rekomendasi belajar. Fitur auto-fix tidak termasuk dalam program ini untuk mendorong pemahaman konsep.",
  },
  {
    title: "Bagaimana performa AI diukur?",
    content:
      "Performa diukur melalui 4 metrik utama: akurasi penjelasan ≥85%, waktu respons <5 detik, kepuasan pengguna pada UAT ≥80%, dan penurunan pertanyaan debugging ≥30%.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}