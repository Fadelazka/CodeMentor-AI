'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '@/components/ui/modal';

export interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
}

const fieldClass =
  'w-full h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white ' +
  'placeholder:text-white/30 outline-none transition-colors ' +
  'focus:border-[#FF3B6B]/40 focus:ring-2 focus:ring-[#FF3B6B]/40';

const labelClass = 'text-xs uppercase tracking-wider text-zinc-500';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UserModalProps {
  isOpen: boolean;
  user?: AdminUser | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  email: string;
  password: string;
  role: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  password: '',
  role: 'USER',
};

function toFormState(user?: AdminUser | null): FormState {
  if (!user) return { ...EMPTY_FORM };
  return {
    name: user.name ?? '',
    email: user.email ?? '',
    password: '',
    role: user.role ?? 'USER',
  };
}

export function UserModal({ isOpen, user, onClose, onSaved }: UserModalProps) {
  const isEdit = Boolean(user);
  const [form, setForm] = useState<FormState>(toFormState(user));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(toFormState(user));
      setErrors({});
    }
  }, [isOpen, user]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = 'Nama minimal 2 karakter.';
    }
    if (!form.email.trim()) {
      next.email = 'Email wajib diisi.';
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = 'Format email tidak valid.';
    }
    if (!isEdit && !form.password) {
      next.password = 'Password wajib diisi.';
    } else if (form.password && form.password.length < 6) {
      next.password = 'Password minimal 6 karakter.';
    }
    if (!form.role) next.role = 'Pilih role pengguna.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const method = isEdit ? 'PATCH' : 'POST';
      const url = isEdit && user ? `/api/admin/users/${user.id}` : '/api/admin/users';

      const payload: Record<string, string> = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role,
      };
      if (form.password.trim()) payload.password = form.password;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error ?? 'Gagal menyimpan user.');
        return;
      }

      toast.success(json.message ?? (isEdit ? 'User diperbarui.' : 'User ditambahkan.'));
      onClose();
      onSaved();
    } catch {
      toast.error('Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit User' : 'Tambah User'}
      description="Isi detail akun pengguna CodeMentor AI."
      size="md"
    >
      <div className="space-y-5">
        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Nama Lengkap <span className="text-[#FF3B6B]">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="contoh: Budi Santoso"
            className={fieldClass}
          />
          {errors.name && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.name}</p>}
        </div>

        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Email <span className="text-[#FF3B6B]">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="nama@example.com"
            className={fieldClass}
          />
          {errors.email && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.email}</p>}
        </div>

        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Password {isEdit ? '' : <span className="text-[#FF3B6B]">*</span>}
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            placeholder={isEdit ? 'Kosongkan jika tidak ingin ubah' : 'Minimal 6 karakter'}
            className={fieldClass}
            autoComplete="new-password"
          />
          {errors.password && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.password}</p>}
        </div>

        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Role <span className="text-[#FF3B6B]">*</span>
          </label>
          <select
            value={form.role}
            onChange={(e) => set('role', e.target.value)}
            className={`${fieldClass} appearance-none [&>option]:bg-[#0A0B14]`}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.role && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.role}</p>}
        </div>

        <div className="flex gap-3 justify-end pt-1">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-white/[0.04] border
              border-white/[0.08] text-sm text-white
              hover:bg-white/[0.08] transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-gradient-to-r
              from-[#FF3B6B] to-[#FF6B35] text-sm font-medium
              text-white hover:opacity-90 transition-opacity
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
