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
          <h3 className="font-display text-base font-semibold text-foreground">
            Rekomendasi Belajar
          </h3>
          <p className="font-mono text-[11px] text-muted-foreground">
            Dipersonalisasi berdasarkan pola error Anda
          </p>
        </div>
        <BookOpen className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <div className="space-y-3">
        {recommendations.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            className="group flex items-start gap-4 border border-border p-4 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border">
              <r.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  {r.type}
                </span>
              </div>
              <h4 className="mt-1 truncate font-display text-sm font-medium text-foreground">
                {r.title}
              </h4>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{r.context}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </div>
  );
}