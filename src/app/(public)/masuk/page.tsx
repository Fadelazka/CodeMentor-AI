"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Mail, Building2, LogIn, Eye, EyeOff } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { AuthBackground } from "@/components/auth/auth-background";
import toast from "react-hot-toast";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MasukPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const githubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true";
  const reduce = useReducedMotion();

  // Helper animasi: fade-in + slide-up dengan delay (stagger antar elemen)
  const fadeUp = (delay = 0, distance = 20) => ({
    initial: reduce ? false : { opacity: 0, y: distance },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Email atau kata sandi salah");
        setIsLoading(false);
        return;
      }

      const session = await getSession();
      const isAdmin = session?.user?.role === "ADMIN";
      toast.success(
        isAdmin
          ? "Berhasil masuk! Mengalihkan ke dashboard..."
          : "Berhasil masuk! Mengalihkan ke chat..."
      );
      window.location.href = isAdmin ? "/dashboard" : "/chat";
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background pt-16 pb-16">
      <AuthBackground />
      <div className="container-editorial relative z-10 max-w-lg">
        <motion.div {...fadeUp(0)}>
          <div className="rounded-sm border border-border bg-card p-8">
            <motion.div {...fadeUp(0.1, 12)} className="mb-8 text-center">
              <Link href="/" className="mb-6 inline-flex items-center gap-2">
                <LogoMark className="h-10 w-10" size={40} />
                <span className="text-lg font-bold text-foreground">
                  Code<span className="text-accent">Mentor</span> AI
                </span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Selamat Datang Kembali
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Masuk untuk melanjutkan sesi belajar debugging Anda.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div {...fadeUp(0.2, 12)}>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.28, 12)}>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Kata sandi
                </label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={reduce ? undefined : { scale: 1.08 }}
                    whileTap={reduce ? undefined : { scale: 0.92 }}
                    transition={reduce ? undefined : { duration: 0.15 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                {...fadeUp(0.36, 12)}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded-sm border-border" />
                  Ingat saya
                </label>
                <Link
                  href="/lupa-password"
                  className="font-medium text-foreground hover:text-accent"
                >
                  Lupa kata sandi?
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.44, 12)}>
                <Button type="submit" loading={isLoading} className="w-full" size="lg">
                  <LogIn className="h-4 w-4" /> Masuk
                </Button>
              </motion.div>
            </form>

            {githubEnabled && (
              <>
                <motion.div {...fadeUp(0.52, 12)} className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="bg-card px-3">atau lanjutkan dengan</span>
                  </div>
                </motion.div>

                <motion.div {...fadeUp(0.58, 12)}>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => signIn("github", { callbackUrl: "/redirect-check" })}
                  >
                    <Github className="h-4 w-4" /> Masuk dengan GitHub
                  </Button>
                </motion.div>
              </>
            )}

            <motion.div {...fadeUp(0.64)} className="mt-6 text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link href="/daftar" className="font-semibold text-foreground hover:text-accent">
                Daftar gratis
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
