import Link from "next/link";
import { FileCode2, ArrowRight, BadgeCheck, Zap, Layers } from "lucide-react";

const bahasaList = [
  {
    nama: "Python",
    icon: "🐍",
    deskripsi: "SintaksError, TypeError, IndexError, dan error umum dalam pengembangan Python.",
    tampilan: "python",
    popular: true,
  },
  {
    nama: "JavaScript",
    icon: "🟨",
    deskripsi: "ReferenceError, SyntaxError, dan error pada lingkungan Node.js & browser.",
    tampilan: "javascript",
  },
  {
    nama: "Java",
    icon: "☕",
    deskripsi: "NullPointerException, ArrayIndexOutOfBounds, dan penanganan exception Java.",
    tampilan: "java",
  },
  {
    nama: "C++",
    icon: "⚡",
    deskripsi: "Segmentation Fault, compilation error, dan isu manajemen memori.",
    tampilan: "cpp",
  },
  {
    nama: "PHP",
    icon: "🐘",
    deskripsi: "ParseError, undefined variable, dan error pengembangan web PHP.",
    tampilan: "php",
  },
];

export function Languages() {
  return (
    <section id="bahasa" className="section-padding">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Bahasa Didukung
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            5 Bahasa Pemrograman Populer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Knowledge base dengan 200+ pola error pada bahasa yang paling banyak
            digunakan di perkuliahan dan industri.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {bahasaList.map((b) => (
            <div
              key={b.nama}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-dark-card"
            >
              {b.popular && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  <BadgeCheck className="h-3 w-3" /> Populer
                </span>
              )}
              <div className="mb-4 text-4xl">{b.icon}</div>
              <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {b.nama}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {b.deskripsi}
              </p>
              <div className="flex items-center justify-center gap-4 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Zap className="h-3 w-3 text-green-500" /> Real-time
                </span>
                <span className="inline-flex items-center gap-1">
                  <Layers className="h-3 w-3 text-blue-500" /> Knowledge base
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/bahasa"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
          >
            <FileCode2 className="h-4 w-4" />
            Detail dukungan bahasa &amp; contoh error
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}