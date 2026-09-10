import { BookOpen, ArrowRight, Video, FileText } from "lucide-react";
import Link from "next/link";

const recommendations = [
  {
    title: "Error Handling Python untuk Pemula",
    type: "Artikel",
    icon: FileText,
    context: "Berdasarkan 42 error yang Anda hadapi",
    href: "#",
  },
  {
    title: "Memahami ZeroDivisionError & Validasi Input",
    type: "Video",
    icon: Video,
    context: "Muncul 12x dalam 2 minggu terakhir",
    href: "#",
  },
  {
    title: "Panduan Debugging dengan print() & logging",
    type: "Artikel",
    icon: BookOpen,
    context: "Rekomendasi untuk level Anda",
    href: "#",
  },
];

export function LearningRecommendations() {
  return (
    <div className="card-custom p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Rekomendasi Belajar
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dipersonalisasi berdasarkan pola error Anda
          </p>
        </div>
        <BookOpen className="h-5 w-5 text-blue-500" />
      </div>

      <div className="space-y-4">
        {recommendations.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-500/50 hover:bg-blue-500/5 dark:border-slate-800"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <r.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  {r.type}
                </span>
              </div>
              <h4 className="mt-1 truncate text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {r.title}
              </h4>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{r.context}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}