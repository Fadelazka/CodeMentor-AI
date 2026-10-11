"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "glass-panel flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center",
        className
      )}
    >
      {Icon && (
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/40">
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </span>
      )}
      <h3 className="font-display text-base font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/45">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
