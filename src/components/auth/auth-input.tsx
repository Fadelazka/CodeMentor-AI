"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Ikon di sisi kiri input (biasanya sudah diberi kelas `absolute`). */
  icon?: React.ReactNode;
  /** Konten tambahan di dalam wrapper (mis. tombol lihat/sembunyikan sandi). */
  children?: React.ReactNode;
  /** Kelas tambahan untuk wrapper input. */
  wrapperClassName?: string;
}

/**
 * Input form dengan feedback fokus:
 * - Border/ring accent menyala halus saat input difokuskan (transition halus).
 * - Input sedikit membesar (1.2%) saat fokus -> terasa "hidup".
 * - Cincin cahaya accent (box-shadow) muncul cepat lalu memudar saat blur.
 */
export function AuthInput({
  icon,
  children,
  className,
  wrapperClassName,
  onFocus,
  onBlur,
  ...props
}: AuthInputProps) {
  const [focused, setFocused] = React.useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={false}
      className={cn("relative", wrapperClassName)}
      animate={reduce ? undefined : { scale: focused ? 1.012 : 1 }}
      transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.5 }}
    >
      {icon}

      <Input
        className={cn("pl-10", className)}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />

      {/* Cincin cahaya accent saat fokus */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-sm"
        initial={false}
        animate={reduce ? undefined : { opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          boxShadow:
            "0 0 0 3px rgba(255,59,107,0.16), 0 12px 28px -16px rgba(255,59,107,0.6)",
        }}
      />

      {children}
    </motion.div>
  );
}
