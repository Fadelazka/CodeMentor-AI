"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Github, Mail, User as UserIcon, Building2, LogIn, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function MasukPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Berhasil masuk! Mengalihkan ke dashboard...");
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pt-16 pb-16">
      <div className="container-custom max-w-lg">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-dark-card">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Code<span className="text-gradient">Mentor</span> AI
              </span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selamat Datang Kembali
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Masuk untuk melanjutkan sesi belajar debugging Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email kampus
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input type="email" placeholder="nama@kampus.ac.id" className="pl-10" required />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Kata sandi
              </label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <input type="checkbox" className="rounded border-slate-300" />
                Ingat saya
              </label>
              <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Lupa kata sandi?
              </a>
            </div>

            <Button type="submit" loading={isLoading} className="w-full" size="lg">
              <LogIn className="h-4 w-4" /> Masuk
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-slate-400">
              <span className="bg-white px-3 dark:bg-dark-card">atau lanjutkan dengan</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" type="button">
            <Github className="h-4 w-4" /> Masuk dengan GitHub
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Belum punya akun?{" "}
            <Link href="/daftar" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}