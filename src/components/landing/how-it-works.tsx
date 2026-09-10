import { Code, ArrowDown, Search, BookOpen, Sparkles, ThumbsUp } from "lucide-react";

const langkah = [
  {
    icon: Code,
    step: "01",
    title: "Tempel atau Tulis Kode",
    desc: "Tulis kode Anda langsung di editor VS Code atau tempel pada editor di web CodeMentor AI.",
  },
  {
    icon: Search,
    step: "02",
    title: "Jelaskan Error",
    desc: "Klik tombol 'Jelaskan Error' atau biarkan ekstensi mendeteksi error secara otomatis saat mengetik.",
  },
  {
    icon: BookOpen,
    step: "03",
    title: "AI Menganalisis",
    desc: "CodeMentor AI memproses kode dengan RAG + Groq Llama 3.1, mencocokkan dengan knowledge base 200+ error.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Dapatkan Penjelasan",
    desc: "Penjelasan error dalam Bahasa Indonesia, lengkap dengan penyebab, cara perbaikan, dan contoh kode.",
  },
  {
    icon: ThumbsUp,
    step: "05",
    title: "Belajar & Evaluasi",
    desc: "Pelajari materi rekomendasi, simpan riwayat, dan beri feedback untuk membantu AI semakin cerdas.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Cara Kerja
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Dari Error ke Paham dalam 5 Langkah
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Alur kerja yang sederhana dan intuitif.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {langkah.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < langkah.length - 1 && (
                  <ArrowDown className="absolute -bottom-6 left-1/2 hidden h-5 w-5 -translate-x-1/2 text-blue-400/40 lg:hidden" />
                )}
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                  <item.icon className="h-7 w-7 text-white" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-blue-600 shadow dark:bg-slate-800 dark:text-blue-400">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}