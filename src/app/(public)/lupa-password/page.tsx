"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/brand/logo-mark";
import { AuthBackground } from "@/components/auth/auth-background";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import {
  authBadge,
  authCard,
  authField,
  authHeading,
  authStagger,
  authStatusIcon,
} from "@/components/auth/auth-animations";
import { UnderlineLink } from "@/components/ui/micro-interactions";
import { UnderlineLink } from "@/components/ui/micro-interactions";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const reduce = useReducedMotion();

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
          <motion.div
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "visible"}
            variants={authCard}
          >
            <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <motion.div variants={authStagger}>
                <motion.div
                  variants={authHeading}
                  className="flex flex-col items-center space-y-4 text-center"
                >
                  <motion.div
                    variants={authStatusIcon}
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
                <motion.div variants={authField}>
                  <Button asChild className="w-full" variant="outline" size="lg">
                    <Link href="/masuk">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Kembali ke halaman masuk
                    </Link>
                  </Button>
                </motion.div>
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
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={authCard}
        >
          <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
            <motion.div variants={authStagger}>
              <motion.div variants={authHeading} className="space-y-2 text-center">
                <motion.div variants={authBadge} className="mb-6 inline-flex items-center gap-2">
                  <Link
                    href="/"
                    aria-label="Beranda CodeMentor AI"
                    className="inline-flex items-center gap-2"
                  >
                    <LogoMark className="h-10 w-10" size={40} />
                    <span className="text-lg font-bold text-foreground">
                      Code<span className="text-accent">Mentor</span> AI
                    </span>
                  </Link>
                </motion.div>
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

                <motion.div variants={authField} className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Email
                  </Label>
                  <AuthInput
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    icon={
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    }
                  />
                </motion.div>

                <motion.div variants={authField}>
                  <AuthSubmitButton type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Kirim Tautan Reset
                  </AuthSubmitButton>
                </motion.div>
              </form>

              <motion.div variants={authField} className="text-center text-sm">
                <UnderlineLink
                  href="/masuk"
                  lineClassName="bg-accent"
                  className="gap-2 font-medium text-foreground transition-colors hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke halaman masuk
                </UnderlineLink>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
