"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    success: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    warning: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    danger: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    info: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    outline: "border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}