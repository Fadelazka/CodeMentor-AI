"use client";

import type { ReactNode } from "react";
import { Palette, Bot, Bell, User, RotateCcw, KeyRound, Download, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/ui/page-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { useSettings } from "@/contexts/SettingsContext";
import type { UserSettings } from "@/lib/settings";
import { SettingsSection } from "@/components/settings/settings-section";
import { RadioGroup } from "@/components/settings/radio-group";
import { ToggleSwitch } from "@/components/settings/toggle-switch";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-zinc-500">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function CheckItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex w-fit cursor-pointer items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white focus-within:text-white"
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded border transition-colors",
          checked ? "border-neon-red bg-neon-red/20" : "border-white/20 bg-white/[0.03]"
        )}
        aria-hidden
      >
        {checked && <Check className="h-3 w-3 text-neon-red" strokeWidth={3} />}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {label}
    </label>
  );
}

export default function PengaturanPage() {
  const { settings, updateSettings, resetAll } = useSettings();

  const change = (partial: Partial<UserSettings>) => {
    updateSettings(partial);
    toast.success("Pengaturan tersimpan", { duration: 1500 });
  };

  const handleReset = () => {
    resetAll();
    toast.success("Pengaturan dikembalikan ke default", { duration: 1500 });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="// Pengaturan"
        title="Pengaturan"
        description="Kelola preferensi dan tampilan aplikasi Anda"
        actions={
          <GradientButton variant="outline" size="sm" icon={RotateCcw} onClick={handleReset}>
            Kembalikan Default
          </GradientButton>
        }
      />

      <SettingsSection
        icon={Palette}
        title="Preferensi Tampilan"
        description="Sesuaikan tema dan tampilan aplikasi"
      >
        <div className="space-y-2">
          <Field label="Tema Aplikasi" hint="Pilih mode tampilan yang nyaman untuk mata." />
          <RadioGroup
            name="theme"
            value={settings.theme}
            onChange={(v) => change({ theme: v as UserSettings["theme"] })}
            options={[
              { value: "light", label: "Terang" },
              { value: "dark", label: "Gelap" },
              { value: "system", label: "Sistem" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Field label="Warna Aksen" hint="Warna utama untuk tombol dan highlight." />
          <RadioGroup
            name="accentColor"
            value={settings.accentColor}
            onChange={(v) => change({ accentColor: v as UserSettings["accentColor"] })}
            options={[
              { value: "red", label: "Merah" },
              { value: "orange", label: "Orange" },
              { value: "violet", label: "Violet" },
              { value: "cyan", label: "Cyan" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Field label="Ukuran Font Editor" hint="Ukuran teks pada editor kode." />
          <RadioGroup
            name="editorFontSize"
            value={settings.editorFontSize}
            onChange={(v) => change({ editorFontSize: v as UserSettings["editorFontSize"] })}
            options={[
              { value: "small", label: "Kecil" },
              { value: "medium", label: "Sedang" },
              { value: "large", label: "Besar" },
            ]}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Bot}
        title="Preferensi AI"
        description="Atur cara AI menjelaskan error"
      >
        <div className="space-y-2">
          <Field label="Bahasa Penjelasan" />
          <RadioGroup
            name="aiLanguage"
            value={settings.aiLanguage}
            onChange={(v) => change({ aiLanguage: v as UserSettings["aiLanguage"] })}
            options={[
              { value: "id", label: "Bahasa Indonesia" },
              { value: "en", label: "English" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Field label="Tingkat Detail Jawaban" />
          <RadioGroup
            name="aiDetailLevel"
            value={settings.aiDetailLevel}
            onChange={(v) => change({ aiDetailLevel: v as UserSettings["aiDetailLevel"] })}
            options={[
              { value: "brief", label: "Singkat" },
              { value: "medium", label: "Sedang" },
              { value: "detailed", label: "Detail" },
            ]}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Field
            label="Auto-save Chat History"
            hint="Simpan otomatis riwayat percakapan Anda."
          />
          <ToggleSwitch
            checked={settings.autoSaveHistory}
            onChange={(v) => change({ autoSaveHistory: v })}
            label="Auto-save Chat History"
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notifikasi"
        description="Pilih notifikasi email yang ingin Anda terima"
      >
        <div className="space-y-3">
          <CheckItem
            id="notif-error"
            label="Error penting"
            checked={settings.emailNotifications.criticalErrors}
            onChange={(v) => change({ emailNotifications: { ...settings.emailNotifications, criticalErrors: v } })}
          />
          <CheckItem
            id="notif-feature"
            label="Update fitur baru"
            checked={settings.emailNotifications.featureUpdates}
            onChange={(v) => change({ emailNotifications: { ...settings.emailNotifications, featureUpdates: v } })}
          />
          <CheckItem
            id="notif-material"
            label="Materi rekomendasi mingguan"
            checked={settings.emailNotifications.weeklyDigest}
            onChange={(v) => change({ emailNotifications: { ...settings.emailNotifications, weeklyDigest: v } })}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={User}
        title="Akun"
        description="Kelola keamanan dan data akun Anda"
      >
        <div className="flex flex-wrap gap-3">
          <GradientButton variant="outline" icon={KeyRound}>
            Ubah Password
          </GradientButton>
          <GradientButton variant="outline" icon={Download}>
            Unduh Data Saya
          </GradientButton>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neon-red/25 bg-neon-red/[0.06] p-4">
          <div>
            <p className="text-sm font-medium text-white">Hapus Akun</p>
            <p className="text-xs text-zinc-400">
              Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-neon-red/40 bg-neon-red/[0.08] px-4 py-2 text-sm font-medium text-neon-red transition-colors hover:bg-neon-red/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/40"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
            Hapus Akun
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}
