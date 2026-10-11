"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { HeroBackground } from "@/components/hero/HeroBackground";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border pt-32 pb-20 sm:pt-40 sm:pb-28">
      <HeroBackground />
      <div className="container-editorial relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6"
          >
            <p className="kicker flex items-center gap-3">
              <span className="text-accent">[01]</span>
              AI MENTOR PEMROGRAMAN UNTUK MAHASISWA
              <span className="h-px w-10 bg-border" />
            </p>

            <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Paham{" "}
              <span className="text-accent decoration-accent underline decoration-2 underline-offset-8">
                Error
              </span>{" "}
              Kode Anda, Tanpa Harus Bertanya Ke Mana-Mana.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              CodeMentor AI menjelaskan error pemrograman secara real-time dalam
              Bahasa Indonesia. Dukung 5 bahasa pemrograman dan basis
              pengetahuan 200+ error.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/chat"
                className="btn-primary"
              >
                Coba CodeMentor AI
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/fitur#vscode"
                className="btn-secondary"
              >
                <Download className="h-4 w-4" />
                Ekstensi VS Code
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6">
              <div>
                <p className="font-display text-2xl font-bold">5</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Bahasa didukung
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">200+</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Pola error
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">&lt;5s</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Waktu respons
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">≥85%</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Akurasi
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terminal mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  main.py
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  RUN
                </p>
              </div>

              <div className="p-5 font-mono text-[13px] leading-7 sm:p-6">
                <p className="text-muted-foreground">1  <span className="text-foreground">def</span> hitung_ratarata(<span className="text-foreground">nilai</span>):</p>
                <p className="text-muted-foreground">2      total = 0</p>
                <p className="text-muted-foreground">3      <span className="text-foreground">for</span> n <span className="text-foreground">in</span> nilai:</p>
                <p className="text-muted-foreground">4          total += n</p>
                <p className="text-muted-foreground">5      result = total / len(nilai)</p>
                <p className="text-muted-foreground">6      <span className="text-foreground">return</span> result</p>
                <p className="text-muted-foreground">7</p>
                <p className="text-muted-foreground">8  print(hitung_ratarata([]))</p>
                <p className="mt-2 text-muted-foreground">$ </p>
                <div className="mt-4 border border-accent/40 bg-accent/5 p-4">
                  <p className="flex items-center gap-2 text-accent">
                    <span className="text-foreground">Traceback</span> (most recent call last):
                  </p>
                  <p className="mt-1 text-accent">ZeroDivisionError: division by zero</p>
                </div>
              </div>

              <div className="border-t border-border p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">[Output] Kodementor AI</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Error terjadi karena <span className="text-foreground">nilai</span> kosong, sehingga
                  <span className="font-mono text-accent"> len(nilai) = 0</span> dan terjadi pembagian
                  dengan nol. Perbaiki dengan validasi
                  <span className="font-mono text-foreground"> if not nilai</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}