"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Mail, Building2, LogIn, Eye, EyeOff } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { AuthBackground } from "@/components/auth/auth-background";
import toast from "react-hot-toast";

export default function MasukPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const githubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true";

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
        <div className="rounded-sm border border-border bg-card p-8">
          <div className="mb-8 text-center">
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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
            </div>

            <div>
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded-sm border-border" />
                Ingat saya
              </label>
              <Link href="/lupa-password" className="font-medium text-foreground hover:text-accent">
                Lupa kata sandi?
              </Link>
            </div>

            <Button type="submit" loading={isLoading} className="w-full" size="lg">
              <LogIn className="h-4 w-4" /> Masuk
            </Button>
          </form>

          {githubEnabled && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="bg-card px-3">atau lanjutkan dengan</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/redirect-check" })}
              >
                <Github className="h-4 w-4" /> Masuk dengan GitHub
              </Button>
            </>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/daftar" className="font-semibold text-foreground hover:text-accent">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}