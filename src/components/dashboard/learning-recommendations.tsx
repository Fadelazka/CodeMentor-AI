import Link from "next/link";
import { BookOpen, ArrowUpRight, Video, FileText } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgePill } from "@/components/ui/badge-pill";

const recommendations = [
  {
    title: "Error Handling Python untuk Pemula",
    type: "Artikel",
    tone: "cyan" as const,
    icon: FileText,
    context: "Berdasarkan 42 error yang Anda hadapi",
    href: "#",
  },
  {
    title: "Memahami ZeroDivisionError & Validasi Input",
    type: "Video",
    tone: "violet" as const,
    icon: Video,
    context: "Muncul 12x dalam 2 minggu terakhir",
    href: "#",
  },
  {
    title: "Panduan Debugging dengan print() & logging",
    type: "Artikel",
    tone: "cyan" as const,
    icon: BookOpen,
    context: "Rekomendasi untuk level Anda",
    href: "#",
  },
];

export function LearningRecommendations() {
  return (
    <GlassCard>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-white">Rekomendasi Belajar</h3>
          <p className="mt-0.5 text-xs text-white/45">Dipersonalisasi berdasarkan pola error Anda</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-neon-red">
          <BookOpen className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            className="group flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60">
              <r.icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <BadgePill tone={r.tone} className="mb-1.5">
                {r.type}
              </BadgePill>
              <h4 className="truncate font-display text-sm font-medium text-white">{r.title}</h4>
              <p className="mt-0.5 text-[11px] text-white/40">{r.context}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}
