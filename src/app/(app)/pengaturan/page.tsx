'use client';

import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { toast } from 'react-hot-toast';
import { Palette, Bot, Bell, User as UserIcon, KeyRound, Download, Trash2 } from 'lucide-react';
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

  const Option = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className='px-4 py-2 rounded-lg text-sm font-medium transition-all border'
      style={{
        background: active ? 'rgba(255,59,107,0.1)' : 'var(--surface-2)',
        borderColor: active ? '#FF3B6B' : 'var(--border)',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}
    >{children}</button>
  );

  return (
    <div className='max-w-4xl space-y-6'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <p className='text-xs uppercase tracking-wider text-[#FF3B6B] mb-1'>{'// PENGATURAN'}</p>
          <h1 className='text-2xl font-bold' style={{ color: 'var(--text-primary)' }}>Pengaturan</h1>
          <p className='text-sm mt-1' style={{ color: 'var(--text-secondary)' }}>Kelola preferensi dan tampilan aplikasi Anda</p>
        </div>
        <button onClick={() => { resetAll(); toast.success('Direset ke default'); }} className='px-4 py-2 rounded-lg text-sm font-medium transition-colors border' style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>Kembalikan Default</button>
      </div>
    </div>
  );
}
