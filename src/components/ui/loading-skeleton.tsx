"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: "line" | "card" | "circle";
}

const base =
  "animate-shimmer rounded-lg bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_25%,rgba(0,0,0,0.08)_37%,rgba(0,0,0,0.04)_63%)] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.09)_37%,rgba(255,255,255,0.04)_63%)]";

export function LoadingSkeleton({ className, count = 1, variant = "line" }: LoadingSkeletonProps) {
  const shape =
    variant === "circle"
      ? "h-10 w-10 rounded-full"
      : variant === "card"
        ? "h-32 rounded-2xl"
        : "h-4";

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn(base, shape, className)} />
      ))}
    </>
  );
}
