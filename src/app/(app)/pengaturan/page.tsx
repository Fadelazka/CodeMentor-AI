'use client';

import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { toast } from 'react-hot-toast';
import {
  Palette,
  Bot,
  Bell,
  User as UserIcon,
  KeyRound,
  Download,
  Trash2,
} from 'lucide-react';
import { ChangePasswordModal } from '@/components/settings/change-password-modal';

export default function PengaturanPage() {
  const { settings, updateSettings, resetAll } = useSettings();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleUpdate = (key: string, value: any) => {
    updateSettings({ [key]: value });
    toast.success('Pengaturan tersimpan');
  };

  const handleDownloadData = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch('/api/user/export');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `codementor-data-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Data berhasil diunduh');
    } catch {
      toast.error('Gagal mengunduh data');
    } finally {
      setIsDownloading(false);
    }
  };

  const Option = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
      style={{
        background: active ? 'rgba(255, 59, 107, 0.1)' : 'var(--surface-2)',
        borderColor: active ? '#FF3B6B' : 'var(--border)',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#FF3B6B] mb-1">
            {'// PENGATURAN'}
          </p>
          <h1
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Pengaturan
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            Kelola preferensi dan tampilan aplikasi Anda
          </p>
        </div>
        <button
          onClick={() => {
            resetAll();
            toast.success('Direset ke default');
          }}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
          style={{
            background: 'var(--surface-2)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          Kembalikan Default
        </button>
      </div>

      {/* Section: Preferensi Tampilan */}
      <div
        className="rounded-xl border p-6 space-y-6"
        style={{ background: 'var(--surface-1)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF3B6B]/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-[#FF3B6B]" />
          </div>
          <div>
            <h3
              className="text-base font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Preferensi Tampilan
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Sesuaikan tema dan tampilan aplikasi
            </p>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Tema Aplikasi
          </label>
          <div className="flex flex-wrap gap-2">
            <Option
              active={settings.theme === 'light'}
              onClick={() => handleUpdate('theme', 'light')}
            >
              Terang
            </Option>
            <Option
              active={settings.theme === 'dark'}
              onClick={() => handleUpdate('theme', 'dark')}
            >
              Gelap
            </Option>
            <Option
              active={settings.theme === 'system'}
              onClick={() => handleUpdate('theme', 'system')}
            >
              Sistem
            </Option>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Warna Aksen
          </label>
          <div className="flex flex-wrap gap-2">
            <Option
              active={settings.accentColor === 'red'}
              onClick={() => handleUpdate('accentColor', 'red')}
            >
              Merah
            </Option>
            <Option
              active={settings.accentColor === 'orange'}
              onClick={() => handleUpdate('accentColor', 'orange')}
            >
              Orange
            </Option>
            <Option
              active={settings.accentColor === 'violet'}
              onClick={() => handleUpdate('accentColor', 'violet')}
            >
              Violet
            </Option>
            <Option
              active={settings.accentColor === 'cyan'}
              onClick={() => handleUpdate('accentColor', 'cyan')}
            >
              Cyan
            </Option>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Ukuran Font Editor
          </label>
          <div className="flex flex-wrap gap-2">
            <Option
              active={settings.editorFontSize === 'small'}
              onClick={() => handleUpdate('editorFontSize', 'small')}
            >
              Kecil
            </Option>
            <Option
              active={settings.editorFontSize === 'medium'}
              onClick={() => handleUpdate('editorFontSize', 'medium')}
            >
              Sedang
            </Option>
            <Option
              active={settings.editorFontSize === 'large'}
              onClick={() => handleUpdate('editorFontSize', 'large')}
            >
              Besar
            </Option>
          </div>
        </div>
      </div>

      {/* Section: Preferensi AI */}
      <div
        className="rounded-xl border p-6 space-y-6"
        style={{ background: 'var(--surface-1)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF3B6B]/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#FF3B6B]" />
          </div>
          <div>
            <h3
              className="text-base font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Preferensi AI
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Atur cara AI menjelaskan error
            </p>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Bahasa Penjelasan
          </label>
          <div className="flex flex-wrap gap-2">
            <Option
              active={settings.aiLanguage === 'id'}
              onClick={() => handleUpdate('aiLanguage', 'id')}
            >
              Bahasa Indonesia
            </Option>
            <Option
              active={settings.aiLanguage === 'en'}
              onClick={() => handleUpdate('aiLanguage', 'en')}
            >
              English
            </Option>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Tingkat Detail Jawaban
          </label>
          <div className="flex flex-wrap gap-2">
            <Option
              active={settings.aiDetailLevel === 'brief'}
              onClick={() => handleUpdate('aiDetailLevel', 'brief')}
            >
              Singkat
            </Option>
            <Option
              active={settings.aiDetailLevel === 'medium'}
              onClick={() => handleUpdate('aiDetailLevel', 'medium')}
            >
              Sedang
            </Option>
            <Option
              active={settings.aiDetailLevel === 'detailed'}
              onClick={() => handleUpdate('aiDetailLevel', 'detailed')}
            >
              Detail
            </Option>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Auto-save Chat History
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Simpan otomatis riwayat percakapan Anda.
            </p>
          </div>
          <button
            onClick={() =>
              handleUpdate('autoSaveHistory', !settings.autoSaveHistory)
            }
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.autoSaveHistory ? 'bg-[#FF3B6B]' : 'bg-zinc-400'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                settings.autoSaveHistory ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Section: Notifikasi */}
      <div
        className="rounded-xl border p-6 space-y-4"
        style={{ background: 'var(--surface-1)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF3B6B]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#FF3B6B]" />
          </div>
          <div>
            <h3
              className="text-base font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Notifikasi
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Pilih notifikasi email yang ingin Anda terima
            </p>
          </div>
        </div>

        {[
          { key: 'criticalErrors' as const, label: 'Error penting' },
          { key: 'featureUpdates' as const, label: 'Update fitur baru' },
          { key: 'weeklyDigest' as const, label: 'Materi rekomendasi mingguan' },
        ].map((item) => (
          <label
            key={item.key}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={settings.emailNotifications?.[item.key] || false}
              onChange={(e) =>
                handleUpdate('emailNotifications', {
                  ...settings.emailNotifications,
                  [item.key]: e.target.checked,
                })
              }
              className="w-4 h-4 rounded accent-[#FF3B6B] cursor-pointer"
            />
            <span
              className="text-sm"
              style={{ color: 'var(--text-primary)' }}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {/* Section: Akun */}
      <div
        className="rounded-xl border p-6 space-y-4"
        style={{ background: 'var(--surface-1)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF3B6B]/10 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-[#FF3B6B]" />
          </div>
          <div>
            <h3
              className="text-base font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Akun
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Kelola keamanan dan data akun Anda
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsChangePasswordOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
            style={{
              background: 'var(--surface-2)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <KeyRound className="w-4 h-4" />
            Ubah Password
          </button>

          <button
            onClick={handleDownloadData}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border disabled:opacity-50"
            style={{
              background: 'var(--surface-2)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Mengunduh...' : 'Unduh Data Saya'}
          </button>
        </div>

        <div className="p-4 rounded-lg bg-[#FF3B6B]/[0.04] border border-[#FF3B6B]/20">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Hapus Akun
              </h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Tindakan ini permanen dan tidak dapat dibatalkan.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF3B6B]/10 border border-[#FF3B6B]/30 text-sm text-[#FF3B6B] font-medium hover:bg-[#FF3B6B]/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Akun
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}
