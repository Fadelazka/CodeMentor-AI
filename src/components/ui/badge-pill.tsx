"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "cyan" | "violet" | "pink" | "green" | "amber" | "neutral" | "outline";

interface BadgePillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
  icon?: React.ElementType;
}

const tones: Record<Tone, string> = {
  cyan: "bg-neon-red/12 text-[#D31B4C] border-neon-red/25 dark:text-neon-red",
  violet: "bg-neon-orange/12 text-[#C2410C] border-neon-orange/25 dark:text-[#FF6B35]",
  pink: "bg-neon-pink/12 text-[#DB2777] border-neon-pink/25 dark:text-[#FF7C9C]",
  green: "bg-neon-green/12 text-emerald-600 border-neon-green/25 dark:text-neon-green",
  amber: "bg-neon-amber/12 text-amber-600 border-neon-amber/25 dark:text-neon-amber",
  neutral: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-white/[0.05] dark:text-white/60 dark:border-white/10",
  outline: "bg-transparent text-slate-600 border-slate-300 dark:text-white/55 dark:border-white/12",
};

export function BadgePill({ tone = "neutral", dot, icon: Icon, className, children, ...props }: BadgePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {Icon && <Icon className="h-3 w-3" strokeWidth={2} />}
      {children}
    </span>
  );
}
