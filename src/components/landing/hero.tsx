"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { GlitchText } from "@/components/ui/glitch-text";
import { TypingCodeBlock, type CodeToken } from "@/components/ui/typing-text";
import { CountUp } from "@/components/landing/count-up";
import { fadeUp, staggerContainer } from "@/components/landing/animations";

const CODE_LINES: CodeToken[][] = [
  [
    { text: "def", className: "text-foreground" },
    { text: " hitung_ratarata(" },
    { text: "nilai", className: "text-foreground" },
    { text: "):" },
  ],
  [{ text: "    total = 0" }],
  [
    { text: "    " },
    { text: "for", className: "text-foreground" },
    { text: " n " },
    { text: "in", className: "text-foreground" },
    { text: " nilai:" },
  ],
  [{ text: "        total += n" }],
  [{ text: "    result = total / len(nilai)" }],
  [
    { text: "    " },
    { text: "return", className: "text-foreground" },
    { text: " result" },
  ],
  [],
  [{ text: "print(hitung_ratarata([]))" }],
];

export function Hero() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const reduce = useReducedMotion();

  // Show a simple loading state while session is loading to prevent hydration issues
  if (status === "loading") {
    return (
      <section className="relative isolate overflow-hidden border-b border-[#333] pt-32 pb-20 sm:pt-40 sm:pb-28">
        <HeroBackground />
        <div className="container-editorial relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-center text-zinc-500">
              <div className="w-12 h-12 border-2 border-[#FF3B6B] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="font-mono text-sm">Memuat...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleClick = () => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    } else {
      router.push("/masuk");
    }
  };

return (
    <section className="relative isolate overflow-hidden border-b border-[#333] pt-32 pb-20 sm:pt-40 sm:pb-28">
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
              <span className="text-[#FF3B6B]">[01]</span>
              AI MENTOR PEMROGRAMAN UNTUK MAHASISWA
              <span className="h-px w-10 bg-[#333]" />
            </p>

            <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Paham <GlitchText>Error</GlitchText> Kode Anda, Tanpa Harus
              Bertanya Ke Mana-Mana.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              CodeMentor AI menjelaskan error pemrograman secara real-time dalam
              Bahasa Indonesia. Dukung 5 bahasa pemrograman dan basis
              pengetahuan 200+ error.
            </p>

            <motion.div
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "visible"}
              variants={staggerContainer}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <motion.button
                variants={fadeUp}
                onClick={handleClick}
                whileHover={reduce ? undefined : { scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#FF3B6B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3B6B]/80 focus:outline-none focus:ring-2 focus:ring-[#FF3B6B] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Coba CodeMentor AI
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-sm"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(255,59,107,0)",
                        "0 0 30px rgba(255,59,107,0.4)",
                        "0 0 0 rgba(255,59,107,0)",
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
              <motion.div variants={fadeUp} className="inline-flex">
                <Link
                  href="/ekstensi-vscode"
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-[#333] bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#FF3B6B]/50 hover:bg-[#1a1a1a]"
                >
                  <Download className="h-4 w-4" />
                  Ekstensi VS Code
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#333] pt-6"
            >
              <motion.div
                variants={fadeUp}
                whileHover={reduce ? undefined : { scale: 1.05, transition: { duration: 0.2 } }}
                className="group"
              >
                <p className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#FF3B6B]">
                  <CountUp end={5} />
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Bahasa didukung
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={reduce ? undefined : { scale: 1.05, transition: { duration: 0.2 } }}
                className="group"
              >
                <p className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#FF3B6B]">
                  <CountUp end={200} suffix="+" />
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Pola error
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={reduce ? undefined : { scale: 1.05, transition: { duration: 0.2 } }}
                className="group"
              >
                <p className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#FF3B6B]">
                  &lt;<CountUp end={5} suffix="s" />
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Waktu respons
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                whileHover={reduce ? undefined : { scale: 1.05, transition: { duration: 0.2 } }}
                className="group"
              >
                <p className="font-display text-2xl font-bold text-white transition-colors group-hover:text-[#FF3B6B]">
                  &ge;<CountUp end={85} suffix="%" />
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  Akurasi
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Terminal mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="border border-[#333] bg-[#0A0B14]">
              <div className="flex items-center justify-between border-b border-[#333] px-5 py-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  main.py
                </p>
                <p className="font-mono text-[11px] text-zinc-500">
                  RUN
                </p>
              </div>

              <div className="p-5 font-mono text-[13px] leading-7 sm:p-6">
                <TypingCodeBlock lines={CODE_LINES} speed={38} lineDelay={260} />
                <p className="mt-2 whitespace-pre text-zinc-500">$ </p>
                <div className="mt-4 border border-[#FF3B6B]/40 bg-[#FF3B6B]/5 p-4">
                  <p className="flex items-center gap-2 text-[#FF3B6B]">
                    <span className="text-white">Traceback</span> (most recent call last):
                  </p>
                  <p className="mt-1 text-[#FF3B6B]">ZeroDivisionError: division by zero</p>
                </div>
              </div>

              <div className="border-t border-[#333] p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">[Output] Kodementor AI</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Error terjadi karena <span className="text-white">nilai</span> kosong, sehingga
                  <span className="font-mono text-[#FF3B6B]"> len(nilai) = 0</span> dan terjadi pembagian
                  dengan nol. Perbaiki dengan validasi
                  <span className="font-mono text-white"> if not nilai</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


