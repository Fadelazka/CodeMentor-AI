"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/components/landing/animations";

export function CTA() {
  const reduce = useReducedMotion();
  return (
    <section className="section-padding">
      <div className="container-editorial">
        <div className="bg-ink px-8 py-16 text-paper sm:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 font-mono text-xs uppercase tracking-wider text-paper/50"
            >
              [09] MULAI SEKARANG
            </motion.p>
            <motion.h2
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Mulai Pahami Error Kode Anda Hari Ini
            </motion.h2>
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/60"
            >
              Bergabunglah dengan ribuan mahasiswa yang sudah terbantu memahami
              error kode mereka dalam Bahasa Indonesia.
            </motion.p>
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <motion.div variants={fadeUp} className="w-full sm:w-auto">
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  <Link
                    href="/daftar"
                    className="group inline-flex w-full items-center justify-center gap-2 bg-paper px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-paper/90 sm:w-auto"
                  >
                    Daftar Gratis
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div variants={fadeUp} className="w-full sm:w-auto">
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  <Link
                    href="/ekstensi-vscode"
                    className="group inline-flex w-full items-center justify-center gap-2 border border-paper/20 px-8 py-4 text-sm font-semibold text-paper transition-colors hover:border-paper/50 hover:bg-paper/10 sm:w-auto"
                  >
                    <Download className="h-4 w-4" />
                    Install Ekstensi VS Code
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 font-mono text-[11px] text-paper/40"
            >
              GRATIS UNTUK MAHASISWA · TANPA KARTU KREDIT · SETUP DALAM 2 MENIT
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
