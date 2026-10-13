"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Modal } from "@/components/ui/modal";
import { GradientButton } from "@/components/ui/gradient-button";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500";

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-zinc-600 transition-all focus:border-neon-red/50 focus:outline-none focus:ring-2 focus:ring-neon-red/40 disabled:opacity-50";

const toggleClass =
  "absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-white";

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    if (isLoading) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password baru minimal 6 karakter");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    if (currentPassword === newPassword) {
      setError("Password baru harus berbeda dengan yang lama");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data.error || "Gagal mengubah password";
        setError(message);
        toast.error(message);
        setIsLoading(false);
        return;
      }

      toast.success("Password berhasil diubah");
      setSuccess(true);

      setTimeout(() => {
        void signOut({ callbackUrl: "/masuk" });
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Coba lagi.");
      toast.error("Terjadi kesalahan. Coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ubah Password"
      description="Ganti password akun Anda"
      size="sm"
    >
      {success ? (
        <div className="py-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20"
          >
            <CheckCircle2 className="h-8 w-8 text-emerald-400" strokeWidth={1.75} />
          </motion.div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            Password Berhasil Diubah
          </h3>
          <p className="mb-4 text-sm text-zinc-400">
            Anda akan otomatis logout dalam beberapa detik. Silakan login kembali
            dengan password baru Anda.
          </p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-xl border border-neon-red/30 bg-neon-red/10 p-3"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-neon-red"
                strokeWidth={1.75}
              />
              <p className="text-sm text-neon-red">{error}</p>
            </motion.div>
          )}

          <div>
            <label htmlFor="current-password" className={labelClass}>
              Password Lama
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                placeholder="Masukkan password lama"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className={toggleClass}
                aria-label={showCurrent ? "Sembunyikan password lama" : "Tampilkan password lama"}
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="new-password" className={labelClass}>
              Password Baru
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
                placeholder="Minimal 6 karakter"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className={toggleClass}
                aria-label={showNew ? "Sembunyikan password baru" : "Tampilkan password baru"}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {newPassword && newPassword.length < 6 && (
              <p className="mt-1.5 text-xs text-amber-400">
                Minimal 6 karakter ({newPassword.length}/6)
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirm-password" className={labelClass}>
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
                placeholder="Ulangi password baru"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className={toggleClass}
                aria-label={showConfirm ? "Sembunyikan konfirmasi" : "Tampilkan konfirmasi"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1.5 text-xs text-neon-red">Konfirmasi tidak cocok</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <GradientButton
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isLoading}
            >
              Batal
            </GradientButton>
            <GradientButton type="submit" className="flex-1" loading={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Password"}
            </GradientButton>
          </div>
        </form>
      )}
    </Modal>
  );
}
