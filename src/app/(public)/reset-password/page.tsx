"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Lock, ArrowLeft, Loader2, CheckCircle, AlertCircle, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/brand/logo-mark";
import { AuthBackground } from "@/components/auth/auth-background";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const reduce = useReducedMotion();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Helper animasi: fade-in + slide-up dengan delay (stagger antar elemen)
  const fadeUp = (delay = 0, distance = 20) => ({
    initial: reduce ? false : { opacity: 0, y: distance },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  useEffect(() => {
    if (!token) {
      setError("Tautan reset tidak valid atau tidak lengkap.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Tautan reset tidak valid atau tidak lengkap.");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/masuk"), 3000);
      } else {
        setError(data.error || "Gagal mengatur ulang kata sandi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
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
              <h1 className="text-2xl font-bold text-foreground">
                Kata sandi berhasil diatur ulang
              </h1>
              <p className="text-sm text-muted-foreground">
                Anda akan dialihkan ke halaman masuk...
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.3)}>
            <Button asChild className="w-full" size="lg">
              <Link href="/masuk">Masuk Sekarang</Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  if (!token && !error) {
    return (
      <motion.div {...fadeUp(0)}>
        <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              animate={reduce ? undefined : { rotate: 360 }}
              transition={reduce ? undefined : { duration: 1, repeat: Infinity, ease: "linear" }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10"
            >
              <Loader2 className="h-6 w-6 animate-spin text-red-400" />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!token) {
    return (
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10"
            >
              <AlertCircle className="h-6 w-6 text-red-400" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Tautan tidak valid</h1>
              <p className="text-sm text-muted-foreground">
                Tautan reset password tidak valid atau tidak lengkap.
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.3)}>
            <Button asChild className="w-full" variant="outline" size="lg">
              <Link href="/lupa-password">Kirim ulang tautan</Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  return (
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
            Atur Ulang Kata Sandi
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan kata sandi baru untuk akun Anda.
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
              htmlFor="password"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Kata Sandi Baru
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                autoComplete="new-password"
              />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.3, 12)} className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Konfirmasi Kata Sandi
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi kata sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
                autoComplete="new-password"
              />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.4, 12)}>
            <Button type="submit" disabled={isLoading} className="w-full" size="lg">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              Atur Ulang Kata Sandi
            </Button>
          </motion.div>
        </form>

        <motion.div {...fadeUp(0.5)} className="text-center text-sm">
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
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background pt-16 pb-16">
      <AuthBackground />
      <div className="container-editorial relative z-10 max-w-lg">
        <Suspense
          fallback={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              </Card>
            </motion.div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
