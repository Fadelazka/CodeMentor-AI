"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

/* ------------------------------------------------------------------ *
 * Variasi arah & jenis animasi (Fase 1 — variasi animasi UI/UX)
 * Dipakai agar tidak semua elemen memakai "fade-up" yang seragam.
 * ------------------------------------------------------------------ */

/** Masuk dari kanan ke kiri (x: 28 -> 0). */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
};

/** Masuk dari bawah ke atas (y: 28 -> 0). */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/** Masuk dari kanan ke kiri dengan pantulan halus (spring) + sedikit rotasi. */
export const springSlideLeft: Variants = {
  hidden: { opacity: 0, x: 64, rotate: 1.4 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.9 },
  },
};

/** Turun dari atas dengan pantulan halus (spring). */
export const springSlideDown: Variants = {
  hidden: { opacity: 0, y: -64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 26, mass: 0.8 },
  },
};

/**
 * Arah animasi yang bisa dipilih lewat prop `direction`.
 * - "left"  : elemen masuk dari sisi kiri (bergerak ke kanan)
 * - "right" : elemen masuk dari sisi kanan (bergerak ke kiri)
 * - "up"    : elemen masuk dari bawah
 * - "down"  : elemen masuk dari atas
 * - "scale" : elemen membesar dari 0.9 -> 1
 */
export type RevealDirection = "left" | "right" | "up" | "down" | "scale";

export const directionVariants: Record<RevealDirection, Variants> = {
  left: slideRight,
  right: slideLeft,
  up: fadeUp,
  down: slideDown,
  scale: scaleIn,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={slideRight}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  lift = false,
  variants: itemVariants = fadeUp,
  hover,
}: RevealProps & {
  lift?: boolean;
  variants?: Variants;
  hover?: TargetAndTransition;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={
        reduce
          ? undefined
          : (hover ?? (lift ? { y: -4, transition: { duration: 0.2 } } : undefined))
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveal generik dengan arah animasi yang bisa dipilih.
 * Contoh: <Reveal direction="right">...</Reveal> -> elemen masuk dari kanan.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps & { direction?: RevealDirection }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={directionVariants[direction]}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
