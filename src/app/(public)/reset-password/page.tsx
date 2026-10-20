"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Kata sandi berhasil diatur ulang</h1>
            <p className="text-sm text-muted-foreground">
              Anda akan dialihkan ke halaman masuk...
            </p>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link href="/masuk">Masuk Sekarang</Link>
        </Button>
      </Card>
    );
  }

  if (!token && !error) {
    return (
      <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <Loader2 className="h-6 w-6 animate-spin text-red-400" />
          </div>
        </div>
      </Card>
    );
  }

  if (!token) {
    return (
      <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Tautan tidak valid</h1>
            <p className="text-sm text-muted-foreground">
              Tautan reset password tidak valid atau tidak lengkap.
            </p>
          </div>
        </div>
        <Button asChild className="w-full" variant="outline">
          <Link href="/lupa-password">Kirim ulang tautan</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Atur Ulang Kata Sandi</h1>
        <p className="text-sm text-muted-foreground">
          Masukkan kata sandi baru untuk akun Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi Baru</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Atur Ulang Kata Sandi
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link
          href="/masuk"
          className="font-medium text-foreground hover:text-accent flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke halaman masuk
        </Link>
      </div>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container flex min-h-screen flex-col items-center justify-center px-4">
        <Suspense
          fallback={
            <Card className="w-full max-w-md space-y-6 border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            </Card>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
