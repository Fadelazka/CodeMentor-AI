"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Mail, User as UserIcon, Building2, UserPlus, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { AuthBackground } from "@/components/auth/auth-background";
import toast from "react-hot-toast";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function DaftarPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(json.error ?? "Gagal membuat akun.");
        setIsLoading(false);
        return;
      }

      toast.success("Akun berhasil dibuat, silakan masuk.");
      router.push("/masuk");
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background pt-16 pb-16">
      <AuthBackground />
      <div className="relative z-10 w-full max-w-lg">
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
                Buat Akun Gratis
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Daftar dengan email kampus untuk akses penuh.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div {...fadeUp(0.18, 12)}>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Nama lengkap
                </label>
                <div className="relative">
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Nama lengkap Anda"
                    className="pl-10"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.26, 12)}>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Email kampus
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="nama@kampus.ac.id"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.34, 12)}>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Kata sandi
                </label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    className="pl-10 pr-10"
                    minLength={8}
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

              <motion.div {...fadeUp(0.42, 12)} className="space-y-2 rounded-sm bg-muted/30 p-3">
                <p className="text-sm font-semibold text-foreground">Program studi</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  <select className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm text-foreground">
                    <option>Informatika</option>
                    <option>Sistem Informasi</option>
                    <option>Teknik Komputer</option>
                    <option>Teknologi Informasi</option>
                    <option>Ilmu Komputer</option>
                    <option>Lainnya</option>
                  </select>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.5, 12)}>
                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="mt-0.5 rounded-sm border-border" required />
                  <span>
                    Saya menyetujui{" "}
                    <a href="#" className="font-medium text-foreground hover:text-accent">
                      Ketentuan Layanan
                    </a>{" "}
                    dan{" "}
                    <a href="#" className="font-medium text-foreground hover:text-accent">
                      Kebijakan Privasi
                    </a>
                  </span>
                </label>
              </motion.div>

              <motion.div {...fadeUp(0.58, 12)}>
                <Button type="submit" loading={isLoading} className="w-full" size="lg">
                  <UserPlus className="h-4 w-4" /> Buat Akun
                </Button>
              </motion.div>
            </form>

            {githubEnabled && (
              <>
                <motion.div {...fadeUp(0.66, 12)} className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="bg-card px-3">atau daftar dengan</span>
                  </div>
                </motion.div>

                <motion.div {...fadeUp(0.72, 12)}>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => signIn("github", { callbackUrl: "/redirect-check" })}
                  >
                    <Github className="h-4 w-4" /> Daftar dengan GitHub
                  </Button>
                </motion.div>
              </>
            )}

            <motion.div {...fadeUp(0.78)} className="mt-6 space-y-2">
              {["Gratis selamanya untuk mahasiswa", "Akses penuh ke semua fitur", "Tanpa kartu kredit"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {f}
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.84)} className="mt-6 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/masuk" className="font-semibold text-foreground hover:text-accent">
                Masuk di sini
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
