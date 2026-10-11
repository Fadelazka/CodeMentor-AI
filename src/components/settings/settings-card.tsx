"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

/**
 * Kartu glass untuk menampung satu kelompok pengaturan.
 */
export function SettingsCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <GlassCard className={cn("space-y-5", className)} {...props}>
      {children}
    </GlassCard>
  );
}
