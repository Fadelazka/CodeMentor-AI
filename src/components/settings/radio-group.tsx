"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
}

/**
 * Grup radio custom dengan aksen merah. Aksesibel via input tersembunyi
 * dan focus ring pada label.
 */
export function RadioGroup({ name, value, onChange, options, className }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <label
            key={opt.value}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-[#FF3B6B]/40",
              selected
                ? "border-neon-red/40 bg-neon-red/[0.08] text-white"
                : "border-white/[0.06] bg-white/[0.03] text-white/60 hover:border-white/[0.12] hover:text-white"
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                selected ? "border-neon-red" : "border-white/25"
              )}
              aria-hidden
            >
              {selected && <span className="h-2 w-2 rounded-full bg-neon-red" />}
            </span>
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
