"use client";

import Link from "next/link";
import { ArrowRight, Download, Sparkles, TerminalSquare, GitBranch, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-20 right-0 h-[300px] w-[400px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="container-custom relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            <Sparkles className="h-4 w-4" />
            Belajar Debugging Jadi Lebih Mudah
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
          >
            Paham <span className="text-gradient">Error Kode</span> Anda,
            <br />
            dalam Bahasa Indonesia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            CodeMentor AI menjelaskan error pemrograman secara real-time dalam
            Bahasa Indonesia. Tersedia sebagai ekstensi VS Code dan aplikasi
            web — dengan dukungan 5 bahasa pemrograman populer dan basis
            pengetahuan 200+ error.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/chat"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 sm:w-auto"
            >
              Coba CodeMentor AI
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/fitur#vscode"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Download className="h-4 w-4" />
              Install Ekstensi VS Code
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-500" /> Gratis untuk mahasiswa
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GitBranch className="h-4 w-4 text-blue-500" /> 5 bahasa pemrograman
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TerminalSquare className="h-4 w-4 text-purple-500" /> RAG + Llama 3.1
            </span>
          </motion.div>
        </div>

        {/* Mockup preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-blue-950/10 dark:border-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto rounded-md bg-slate-100 px-16 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                codementor.ai/chat
              </div>
            </div>
            <div className="grid gap-0 bg-white sm:grid-cols-2 dark:bg-dark-card">
              <div className="border-r border-slate-200 bg-slate-50 p-6 font-mono text-sm leading-relaxed dark:border-slate-800 dark:bg-slate-950">
                <p className="mb-4 text-xs text-slate-400">main.py</p>
                <p><span className="text-blue-500">def</span> <span className="text-amber-500">hitung_ratarata</span>(nilai):</p>
                <p className="pl-4">total = <span className="text-emerald-500">0</span></p>
                <p className="pl-4"><span className="text-blue-500">for</span> n <span className="text-blue-500">in</span> nilai:</p>
                <p className="pl-8">total += n</p>
                <p className="pl-4">result = total / len(nilai)</p>
                <p className="pl-4"><span className="text-blue-500">return</span> result</p>
                <p className="mt-4 text-red-500" >...</p>
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                  <p className="mb-2 text-xs font-semibold text-red-500">ZeroDivisionError</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">division by zero — line 5</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-3 w-3" />
                    Jawaban CodeMentor AI
                  </span>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    Error ZeroDivisionError terjadi karena Anda membagi total dengan nilai yang panjangnya 0 (nol).
                  </p>
                  <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="mb-2 font-medium text-slate-700 dark:text-slate-200">Perbaikan yang disarankan:</p>
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300">
                      if len(nilai) == 0:{"\n"}    return 0
                    </p>
                  </div>
                  <p className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs font-medium text-green-600 dark:text-green-400">
                    <ShieldCheck className="h-4 w-4" />
                    Confidence: 92% | Bahan diskusi: operasi aritmatika &amp; validasi input
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}