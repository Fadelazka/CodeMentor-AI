"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Sparkline } from "@/components/ui/sparkline";

type Accent = "cyan" | "violet" | "pink" | "green" | "amber";

const accents: Record<Accent, { stroke: string; ring: string; text: string }> = {
  cyan: { stroke: "#FF3B6B", ring: "border-neon-red/25 bg-neon-red/10", text: "text-neon-red" },
  violet: { stroke: "#FF6B35", ring: "border-neon-orange/25 bg-neon-orange/10", text: "text-[#FF6B35]" },
  pink: { stroke: "#FF3B6B", ring: "border-neon-pink/25 bg-neon-pink/10", text: "text-[#FF7C9C]" },
  green: { stroke: "#3DFFA2", ring: "border-neon-green/25 bg-neon-green/10", text: "text-neon-green" },
  amber: { stroke: "#FFC53D", ring: "border-neon-amber/25 bg-neon-amber/10", text: "text-neon-amber" },
};

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trending?: "up" | "down" | "flat";
  positive?: boolean;
  icon: LucideIcon;
  accent?: Accent;
  spark?: number[];
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trending = "up",
  positive = true,
  icon: Icon,
  accent = "cyan",
  spark,
  className,
}: MetricCardProps) {
  const a = accents[accent];

  return (
    <div
      className={cn(
        "glass-panel glass-panel-hover group relative overflow-hidden rounded-2xl p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</p>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110",
            a.ring,
            a.text
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>

      {spark && spark.length > 1 && (
        <div className="mt-4 -mb-1 opacity-80">
          <Sparkline data={spark} stroke={a.stroke} />
        </div>
      )}

      {change && (
        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
              positive ? "bg-neon-green/12 text-neon-green" : "bg-neon-pink/12 text-[#FF7C9C]"
            )}
          >
            {trending === "down" ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <ArrowUpRight className="h-3 w-3" />
            )}
            {change}
          </span>
          <span className="text-[10px] text-white/35">vs periode lalu</span>
        </div>
      )}

      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          accent === "cyan" && "bg-neon-red/12",
          accent === "violet" && "bg-neon-orange/12",
          accent === "pink" && "bg-neon-pink/12",
          accent === "green" && "bg-neon-green/12",
          accent === "amber" && "bg-neon-amber/12"
        )}
      />
    </div>
  );
}
