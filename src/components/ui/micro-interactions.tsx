"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Kumpulan micro-interaction untuk FASE 3.
 *
 * Catatan desain:
 * - Garis bawah link memakai CSS transform (`scaleX`) + `origin-center`
 *   supaya langsung responsif bahkan sebelum hidrasi selesai.
 * - Ikon sosial memakai Framer Motion `whileHover` (spring) sehingga
 *   terasa "hidup" namun tetap ringan.
 * - Semua efek otomatis nonaktif saat `prefers-reduced-motion` aktif.
 */

/* ------------------------------------------------------------------ *
 * Link teks: garis bawah memanjang dari TENGAH (scaleX, origin center)
 * ------------------------------------------------------------------ */

interface UnderlineLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> {
  className?: string;
  /** Kelas tambahan untuk garis bawah (mis. warna). */
  lineClassName?: string;
  /** Tampilkan garis bawah permanen (untuk state aktif). */
  active?: boolean;
  /** Isi link (teks dan/atau ikon). */
  children: React.ReactNode;
}

export function UnderlineLink({
  children,
  className,
  lineClassName,
  active = false,
  ...props
}: UnderlineLinkProps) {
  return (
    <Link
      {...props}
      className={cn("group relative inline-flex items-center", className)}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-center bg-current",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          lineClassName
        )}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Ikon sosial: sedikit berputar (rotate 10) + membesar (scale 1.1)
 * ------------------------------------------------------------------ */

interface SocialIconLinkProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
  className?: string;
}

export function SocialIconLink({
  children,
  className,
  ...props
}: SocialIconLinkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      whileHover={reduce ? undefined : { rotate: 10, scale: 1.1 }}
      whileTap={reduce ? undefined : { scale: 0.94, rotate: 0 }}
      transition={
        reduce
          ? undefined
          : { type: "spring", stiffness: 420, damping: 15, mass: 0.5 }
      }
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-sm p-2",
        "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ *
 * Teks/ikon pendukung: membesar halus saat hover (untuk ikon kecil)
 * ------------------------------------------------------------------ */

interface IconPopProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
}

export function IconPop({
  children,
  className,
  scale = 1.12,
  rotate = 0,
}: IconPopProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      whileHover={reduce ? undefined : { scale, rotate }}
      transition={
        reduce
          ? undefined
          : { type: "spring", stiffness: 400, damping: 15, mass: 0.5 }
      }
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
