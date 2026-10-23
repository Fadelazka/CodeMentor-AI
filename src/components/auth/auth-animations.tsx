"use client";

import type { Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Varian animasi khusus halaman Auth (Fase 2).
 *
 * Tujuannya:hindari pola "fade-up" seragam yang dipakai di landing page,
 * lalu ganti dengan kombinasi scale + stagger + spring agar form terasa
 * hidup namun tetap fokus pada isi form.
 */

/** Container form: muncul dengan scale 0.9 -> 1 + fade in (spring halus). */
export const authCard: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 170, damping: 18, mass: 0.9 },
  },
};

/** Container stagger: isi form (input, tombol, dsb) muncul berurutan. */
export const authStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.14 },
  },
};

/** Item form: fade + naik halus (dipakai untuk input/label/opsi). */
export const authField: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/** Blok judul form: masuk dari kiri sedikit (beda dari input). */
export const authHeading: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Logo di dalam blok judul: membesar dari 0.8 -> 1 (spring). */
export const authBadge: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.7 },
  },
};

/** Ikon status (sukses/error): pop dengan sedikit rotasi. */
export const authStatusIcon: Variants = {
  hidden: { opacity: 0, scale: 0.75, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 280, damping: 16, mass: 0.7 },
  },
};
