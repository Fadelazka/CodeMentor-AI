"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Transisi halaman global (full-bleed fade) untuk route grup (public).
 *
 * - Murni opacity (tanpa slide/translate) supaya transisi terasa lembut
 *   dan tidak mengganggu elemen `position: fixed` (mis. AuthBackground).
 * - `mode="popLayout"`: halaman lama dilepas dari flow (position: absolute)
 *   sehingga halaman baru langsung occupy flow -> terjadi crossfade tanpa
 *   layout jump dan tanpa jeda/flash kosong di antaranya.
 * - `initial={false}`: tidak ada animasi pada load pertama (halaman langsung tampil).
 * - `useReducedMotion`: durasi menjadi 0 bila pengguna mengaktifkan
 *   reduced motion di OS.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Kembalikan posisi scroll ke atas saat berpindah halaman (selain navigasi ber-anchor).
  // Pakai behavior "instant" karena globals.css mengaktifkan `scroll-behavior: smooth`.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.45, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.35, ease: EASE } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
