"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  padded?: boolean;
}

export function GlassCard({
  className,
  hover = true,
  glow = false,
  padded = true,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden rounded-2xl",
        padded && "p-5 sm:p-6",
        hover && "glass-panel-hover",
        glow && "shadow-glow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex items-start justify-between gap-4", className)} {...props} />;
}

export function GlassCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-base font-semibold tracking-tight text-white", className)}
      {...props}
    />
  );
}

export function GlassCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-0.5 text-xs text-white/45", className)} {...props} />;
}

export function GlassCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
