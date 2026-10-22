"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/brand/logo-mark";
import { AuthBackground } from "@/components/auth/auth-background";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const reduce = useReducedMotion();

  // Helper animasi: fade-in + slide-up dengan delay (stagger antar elemen)
  const fadeUp = (delay = 0, distance = 20) => ({
    initial: reduce ? false : { opacity: 0, y: distance },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Gagal memproses permintaan.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background pt-16 pb-16">
        <AuthBackground />
        <div className="container-editorial relative z-10 max-w-lg">
          <motion.div {...fadeUp(0)}>
            <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <motion.div
                {...fadeUp(0.15, 12)}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                  animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10"
                >
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </motion.div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-foreground">Tautan dikirim</h1>
                  <p className="text-sm text-muted-foreground">
                    Jika email terdaftar, kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
                  </p>
                </div>
              </motion.div>
              <motion.div {...fadeUp(0.3)}>
                <Button asChild className="w-full" variant="outline" size="lg">
                  <Link href="/masuk">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke halaman masuk
                  </Link>
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background pt-16 pb-16">
      <AuthBackground />
      <div className="container-editorial relative z-10 max-w-lg">
        <motion.div {...fadeUp(0)}>
          <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
            <motion.div {...fadeUp(0.1, 12)} className="space-y-2 text-center">
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2"
                aria-label="Beranda CodeMentor AI"
              >
                <LogoMark className="h-10 w-10" size={40} />
                <span className="text-lg font-bold text-foreground">
                  Code<span className="text-accent">Mentor</span> AI
                </span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Lupa Kata Sandi?
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={reduce ? false : { opacity: 0, y: -10 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div {...fadeUp(0.2, 12)} className="space-y-2">
                <Label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="email"
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.3, 12)}>
                <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Kirim Tautan Reset
                </Button>
              </motion.div>
            </form>

            <motion.div {...fadeUp(0.4)} className="text-center text-sm">
              <Link
                href="/masuk"
                className="font-medium text-foreground hover:text-accent flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke halaman masuk
              </Link>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
