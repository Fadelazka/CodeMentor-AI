"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

/** Glow accent yang menyala saat tombol di-hover. */
const glowVariants: Variants = {
  rest: { boxShadow: "0 0 0 0 rgba(255,59,107,0)" },
  hover: {
    boxShadow:
      "0 12px 34px -12px rgba(255,59,107,0.55), 0 0 26px -10px rgba(255,59,107,0.4)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Sapuan cahaya (shimmer) yang menyapu tombol saat di-hover. */
const shimmerVariants: Variants = {
  rest: { x: "-130%", transition: { duration: 0 } },
  hover: { x: "520%", transition: { duration: 0.75, ease: "easeInOut" } },
};

/**
 * Tombol utama form Auth dengan sentuhan premium:
 * - Hover: glow accent + sapuan cahaya (shimmer) sekali.
 * - Tekan: sedikit mengecil (0.98) dengan respons spring.
 */
export function AuthSubmitButton({ className, children, ...props }: ButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={glowVariants}
      className="relative w-full rounded-sm"
    >
      <motion.div
        whileHover={reduce ? undefined : { scale: 1.015 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={
          reduce ? undefined : { type: "spring", stiffness: 340, damping: 24 }
        }
        className="relative w-full"
      >
        <Button className={cn("w-full", className)} {...props}>
          {children}
        </Button>
      </motion.div>

      {!reduce && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm"
        >
          <motion.span
            variants={shimmerVariants}
            className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </span>
      )}
    </motion.div>
  );
}
