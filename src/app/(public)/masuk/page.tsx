"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Mail, Building2, LogIn, Eye, EyeOff } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
} from "@/components/auth/auth-animations";
import { UnderlineLink } from "@/components/ui/micro-interactions";
import toast from "react-hot-toast";

export default function MasukPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const githubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true";
  const reduce = useReducedMotion();

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
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={authCard}
        >
          <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
            <motion.div variants={authStagger}>
              <motion.div variants={authHeading} className="mb-8 text-center">
                <motion.div variants={authBadge} className="mb-6 inline-flex items-center gap-2">
                  <Link href="/" className="inline-flex items-center gap-2">
                    <LogoMark className="h-10 w-10" size={40} />
                    <span className="text-lg font-bold text-foreground">
                      Code<span className="text-accent">Mentor</span> AI
                    </span>
                  </Link>
                </motion.div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Selamat Datang Kembali
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Masuk untuk melanjutkan sesi belajar debugging Anda.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={authField}>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <AuthInput
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    }
                  />
                </motion.div>

                <motion.div variants={authField}>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Kata sandi
                  </label>
                  <AuthInput
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    }
                  >
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={reduce ? undefined : { scale: 1.08, rotate: 8 }}
                      whileTap={reduce ? undefined : { scale: 0.92 }}
                      transition={reduce ? undefined : { duration: 0.15 }}
                      className="absolute inset-y-0 right-2 my-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </motion.button>
                  </AuthInput>
                </motion.div>

                <motion.div
                  variants={authField}
                  className="flex items-center justify-between text-sm"
                >
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded-sm border-border" />
                    Ingat saya
                  </label>
                  <UnderlineLink
                    href="/lupa-password"
                    lineClassName="bg-accent"
                    className="font-medium text-foreground transition-colors hover:text-accent"
                  >
                    Lupa kata sandi?
                  </UnderlineLink>
                </motion.div>

                <motion.div variants={authField}>
                  <AuthSubmitButton type="submit" loading={isLoading} size="lg">
                    <LogIn className="h-4 w-4" /> Masuk
                  </AuthSubmitButton>
                </motion.div>
              </form>

              {githubEnabled && (
                <>
                  <motion.div variants={authField} className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider text-muted-foreground">
                      <span className="bg-card px-3">atau lanjutkan dengan</span>
                    </div>
                  </motion.div>

                  <motion.div variants={authField}>
                    <motion.div
                      whileHover={reduce ? undefined : { scale: 1.015, y: -2 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      transition={
                        reduce ? undefined : { type: "spring", stiffness: 340, damping: 24 }
                      }
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                        type="button"
                        onClick={() => signIn("github", { callbackUrl: "/redirect-check" })}
                      >
                        <Github className="h-4 w-4" /> Masuk dengan GitHub
                      </Button>
                    </motion.div>
                  </motion.div>
                </>
              )}

              <motion.div variants={authField} className="mt-6 text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <UnderlineLink
                  href="/daftar"
                  lineClassName="bg-accent"
                  className="font-semibold text-foreground transition-colors hover:text-accent"
                >
                  Daftar gratis
                </UnderlineLink>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
