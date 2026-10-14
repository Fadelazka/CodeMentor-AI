"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { X, UserRound, Mail, IdCard } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: { name: string; email: string; nim?: string };
}

export function EditProfileModal({ isOpen, onClose, initialData }: EditProfileModalProps) {
  const { update } = useSession();
  const router = useRouter();
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [nim, setNim] = useState(initialData.nim || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name);
      setEmail(initialData.email);
      setNim(initialData.nim || "");
    }
  }, [isOpen, initialData.name, initialData.email, initialData.nim]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) return toast.error("Periksa kembali nama/email");
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.toLowerCase().trim(), nim: nim.trim() }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal");
      await update();
      router.refresh();
      toast.success("Profil diperbarui");
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-md rounded-2xl border p-6"
            style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
          >
            <button type="button" onClick={onClose} className="absolute right-4 top-4 text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-6 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Edit Profil</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Nama</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>NIM</label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input value={nim} onChange={(e)=>setNim(e.target.value)} placeholder="Masukkan NIM" disabled={isLoading} className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none disabled:opacity-50" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2 text-sm" style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>Batal</button>
                <button type="submit" disabled={isLoading} className="rounded-xl bg-gradient-to-r from-[#FF4F9D] to-[#FF3B6B] px-4 py-2 text-sm font-medium text-white disabled:opacity-50">Simpan</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
