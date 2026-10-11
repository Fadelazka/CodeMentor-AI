"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Palette,
  Bot,
  Bell,
  User,
  Save,
  KeyRound,
  Download,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/ui/page-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { SettingsSection } from "@/components/settings/settings-section";
import { RadioGroup } from "@/components/settings/radio-group";
import { ToggleSwitch } from "@/components/settings/toggle-switch";

const STORAGE_KEY = "codementor_settings";

interface SettingsState {
  theme: string;
  accent: string;
  editorFont: string;
  aiLanguage: string;
  detailLevel: string;
  autoSave: boolean;
  notifImportantError: boolean;
  notifNewFeature: boolean;
  weeklyMaterial: boolean;
}

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
  const [settings, setSettings] = useState<SettingsState>({
    theme: "gelap",
    accent: "merah",
    editorFont: "sedang",
    aiLanguage: "id",
    detailLevel: "sedang",
    autoSave: true,
    notifImportantError: false,
    notifNewFeature: false,
    weeklyMaterial: true,
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {
      // abaikan data rusak
    }
  }, []);

  const update = <K extends keyof SettingsState,>(key: K, value: SettingsState[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // penyimpanan tidak tersedia
    }
    toast.success("Pengaturan tersimpan ✓");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="// Pengaturan"
        title="Pengaturan"
        description="Kelola preferensi dan tampilan aplikasi Anda"
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
            onChange={(v) => update("theme", v)}
            options={[
              { value: "terang", label: "Terang" },
              { value: "gelap", label: "Gelap" },
              { value: "sistem", label: "Sistem" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Field label="Warna Aksen" hint="Warna utama untuk tombol dan highlight." />
          <RadioGroup
            name="accent"
            value={settings.accent}
            onChange={(v) => update("accent", v)}
            options={[
              { value: "merah", label: "Merah" },
              { value: "orange", label: "Orange" },
              { value: "violet", label: "Violet" },
              { value: "cyan", label: "Cyan" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Field label="Ukuran Font Editor" hint="Ukuran teks pada editor kode." />
          <RadioGroup
            name="editorFont"
            value={settings.editorFont}
            onChange={(v) => update("editorFont", v)}
            options={[
              { value: "kecil", label: "Kecil" },
              { value: "sedang", label: "Sedang" },
              { value: "besar", label: "Besar" },
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
            onChange={(v) => update("aiLanguage", v)}
            options={[
              { value: "id", label: "Bahasa Indonesia" },
              { value: "en", label: "English" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <Field label="Tingkat Detail Jawaban" />
          <RadioGroup
            name="detailLevel"
            value={settings.detailLevel}
            onChange={(v) => update("detailLevel", v)}
            options={[
              { value: "singkat", label: "Singkat" },
              { value: "sedang", label: "Sedang" },
              { value: "detail", label: "Detail" },
            ]}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Field
            label="Auto-save Chat History"
            hint="Simpan otomatis riwayat percakapan Anda."
          />
          <ToggleSwitch
            checked={settings.autoSave}
            onChange={(v) => update("autoSave", v)}
            label="Auto-save Chat History"
          />
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notifikasi"
        description="Pilih notifikasi yang ingin Anda terima"
      >
        <div className="space-y-3">
          <CheckItem
            id="notif-error"
            label="Error penting"
            checked={settings.notifImportantError}
            onChange={(v) => update("notifImportantError", v)}
          />
          <CheckItem
            id="notif-feature"
            label="Update fitur baru"
            checked={settings.notifNewFeature}
            onChange={(v) => update("notifNewFeature", v)}
          />
          <CheckItem
            id="notif-material"
            label="Materi rekomendasi mingguan"
            checked={settings.weeklyMaterial}
            onChange={(v) => update("weeklyMaterial", v)}
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

      <div className="flex justify-end">
        <GradientButton icon={Save} onClick={handleSave}>
          Simpan Pengaturan
        </GradientButton>
      </div>
    </div>
  );
}
