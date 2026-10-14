"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { X, UserRound, Mail, IdCard, Camera, Upload, ChevronDown } from "lucide-react";
import {
  PythonLogo,
  JavaScriptLogo,
  JavaLogo,
  CppLogo,
  PhpLogo,
} from "@/components/knowledge-base/language-logos";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: { name: string; email: string; nim?: string; image?: string; favoriteLanguage?: string };
}

const LANGUAGES = [
  { value: "python", label: "Python", Logo: PythonLogo },
  { value: "javascript", label: "JavaScript", Logo: JavaScriptLogo },
  { value: "java", label: "Java", Logo: JavaLogo },
  { value: "cpp", label: "C++", Logo: CppLogo },
  { value: "php", label: "PHP", Logo: PhpLogo },
];

export function EditProfileModal({ isOpen, onClose, initialData }: EditProfileModalProps) {
  const { update } = useSession();
  const router = useRouter();
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [nim, setNim] = useState(initialData.nim || "");
  const [favoriteLanguage, setFavoriteLanguage] = useState(initialData.favoriteLanguage || "");
  const [langOpen, setLangOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBusy = isLoading || isUploading;
  const selectedLang = LANGUAGES.find((l) => l.value === favoriteLanguage);

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name);
      setEmail(initialData.email);
      setNim(initialData.nim || "");
      setFavoriteLanguage(initialData.favoriteLanguage || "");
      setImagePreview(initialData.image || "");
      setSelectedFile(null);
      setLangOpen(false);
    }
  }, [isOpen, initialData.name, initialData.email, initialData.nim, initialData.image, initialData.favoriteLanguage]);

  const handleChooseFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      toast.error("Format harus JPG/PNG/WEBP/GIF");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran maksimal 2MB");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!selectedFile) return imagePreview || null;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      const res = await fetch("/api/user/avatar", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal upload foto");
      return data.imageUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) return toast.error("Periksa kembali nama/email");
    setIsLoading(true);
    try {
      if (selectedFile) {
        await uploadAvatar();
      }
      const res = await fetch("/api/user/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.toLowerCase().trim(), nim: nim.trim(), favoriteLanguage }) });
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
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border p-6"
            style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-white">Edit Profil</h2>
              <button type="button" onClick={onClose} className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white" style={{ color: "var(--text-secondary)" }}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center gap-3 pb-2">
                <div className="group relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#FF3B6B]/30 bg-gradient-to-br from-[#FF3B6B]/20 to-[#FF6B35]/20">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Preview" width={96} height={96} unoptimized className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-zinc-400">
                        {name.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleChooseFile}
                    disabled={isBusy}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleChooseFile}
                  disabled={isBusy}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-50"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {selectedFile ? "Ganti Foto" : "Pilih Foto"}
                </button>

                <p className="text-xs text-zinc-500">JPG, PNG, WEBP, GIF. Maks 2MB.</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Nama</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input value={name} onChange={(e) => setName(e.target.value)} disabled={isBusy} className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none disabled:opacity-50" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>NIM</label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input value={nim} onChange={(e) => setNim(e.target.value)} placeholder="Masukkan NIM" disabled={isBusy} className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none disabled:opacity-50" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Bahasa Favorit</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLangOpen((v) => !v)}
                    disabled={isBusy}
                    className="flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm outline-none disabled:opacity-50"
                    style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }}
                  >
                    {selectedLang ? (
                      <span className="flex items-center gap-2">
                        <selectedLang.Logo className="w-5 h-5" />
                        {selectedLang.label}
                      </span>
                    ) : (
                      <span className="text-zinc-500">Pilih bahasa</span>
                    )}
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  </button>
                  {langOpen && (
                    <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border shadow-lg" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.value}
                          type="button"
                          onClick={() => { setFavoriteLanguage(l.value); setLangOpen(false); }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-white/[0.06]"
                          style={{ color: "var(--input-text)" }}
                        >
                          <l.Logo className="w-5 h-5" />
                          {l.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={isBusy} className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none disabled:opacity-50" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--input-text)" }} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2 text-sm" style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>Batal</button>
                <button type="submit" disabled={isBusy} className="rounded-xl bg-gradient-to-r from-[#FF4F9D] to-[#FF3B6B] px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{isUploading ? "Mengunggah..." : "Simpan"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
