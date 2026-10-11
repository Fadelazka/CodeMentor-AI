"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-sm gap-2",
};

const variants: Record<Variant, string> = {
  primary:
    "text-[#050818] bg-[linear-gradient(92deg,#FF3B6B_0%,#FF6B35_100%)] hover:opacity-90 focus-visible:ring-white/40",
  outline:
    "border border-white/12 bg-white/[0.04] text-white hover:border-neon-red/50 hover:bg-white/[0.07] focus-visible:ring-neon-red/40",
  ghost:
    "bg-transparent text-white/65 hover:bg-white/[0.06] hover:text-white focus-visible:ring-white/20",
  danger:
    "bg-neon-pink/90 text-white hover:bg-neon-pink focus-visible:ring-neon-pink/50",
};

export function GradientButton({
  className,
  variant = "primary",
  size = "md",
  loading,
  href,
  icon: Icon,
  iconRight: IconRight,
  children,
  disabled,
  ...props
}: GradientButtonProps) {
  const classes = cn(
    "inline-flex select-none items-center justify-center rounded-xl font-medium tracking-tight transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060A]",
    "disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    variants[variant],
    className
  );

  const content = (
    <>
      {loading ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        Icon && <Icon className="h-4 w-4" strokeWidth={1.75} />
      )}
      {children}
      {IconRight && <IconRight className="h-4 w-4" strokeWidth={1.75} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
