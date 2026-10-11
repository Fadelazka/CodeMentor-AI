"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { SettingsCard } from "@/components/settings/settings-card";

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section pengaturan lengkap dengan ikon dan judul.
 */
export function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <SettingsCard className={className}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-neon-red">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-base font-semibold tracking-tight text-white">
            {title}
          </h2>
          {description && <p className="mt-0.5 text-xs text-white/45">{description}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </SettingsCard>
  );
}
