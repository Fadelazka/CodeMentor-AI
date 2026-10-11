"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType;
  trailing?: React.ReactNode;
}

export function SectionLabel({ icon: Icon, trailing, className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn("mb-4 flex items-center justify-between gap-3", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 text-neon-red" strokeWidth={2} />}
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/45">
          {children}
        </span>
        <span className="h-px w-8 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      {trailing}
    </div>
  );
}
