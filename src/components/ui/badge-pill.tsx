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
  cyan: "bg-neon-red/12 text-neon-red border-neon-red/25",
  violet: "bg-neon-orange/12 text-[#FF6B35] border-neon-orange/25",
  pink: "bg-neon-pink/12 text-[#FF7C9C] border-neon-pink/25",
  green: "bg-neon-green/12 text-neon-green border-neon-green/25",
  amber: "bg-neon-amber/12 text-neon-amber border-neon-amber/25",
  neutral: "bg-white/[0.05] text-white/60 border-white/10",
  outline: "bg-transparent text-white/55 border-white/12",
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
