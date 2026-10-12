'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '@/components/ui/modal';
import { getLanguageLabel } from '@/lib/utils';

export interface KbRecord {
  id: string;
  language: string;
  errorCode: string;
  title: string;
  description: string;
  solution: string;
  examples: string | null;
  tags: string[];
  isActive: boolean;
  updatedAt?: string;
}

const LANGUAGES = ['python', 'javascript', 'java', 'cpp', 'php'];

const fieldClass =
  'w-full h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white ' +
  'placeholder:text-white/30 outline-none transition-colors ' +
  'focus:border-[#FF3B6B]/40 focus:ring-2 focus:ring-[#FF3B6B]/40';

const textareaClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white ' +
  'placeholder:text-white/30 outline-none transition-colors resize-y ' +
  'focus:border-[#FF3B6B]/40 focus:ring-2 focus:ring-[#FF3B6B]/40';

const labelClass = 'text-xs uppercase tracking-wider text-zinc-500';

interface KbModalProps {
  isOpen: boolean;
  record?: KbRecord | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  language: string;
  errorCode: string;
  title: string;
  description: string;
  solution: string;
  examples: string;
  tags: string;
  isActive: boolean;
}

const EMPTY_FORM: FormState = {
  language: 'python',
  errorCode: '',
  title: '',
  description: '',
  solution: '',
  examples: '',
  tags: '',
  isActive: true,
};

function toFormState(record?: KbRecord | null): FormState {
  if (!record) return { ...EMPTY_FORM };
  return {
    language: record.language,
    errorCode: record.errorCode,
    title: record.title,
    description: record.description,
    solution: record.solution,
    examples: record.examples ?? '',
    tags: (record.tags ?? []).join(', '),
    isActive: record.isActive,
  };
}

export function KbModal({ isOpen, record, onClose, onSaved }: KbModalProps) {
  const isEdit = Boolean(record);
  const [form, setForm] = useState<FormState>(toFormState(record));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(toFormState(record));
      setErrors({});
    }
  }, [isOpen, record]);

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
    if (!form.language) next.language = 'Pilih bahasa pemrograman.';
    if (!form.errorCode.trim()) next.errorCode = 'Tipe error wajib diisi.';
    if (!form.title.trim()) next.title = 'Judul wajib diisi.';
    if (!form.description.trim()) next.description = 'Deskripsi masalah wajib diisi.';
    if (!form.solution.trim()) next.solution = 'Solusi wajib diisi.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit && record
        ? `/api/admin/knowledge-base?id=${record.id}`
        : '/api/admin/knowledge-base';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: form.language,
          errorCode: form.errorCode.trim(),
          title: form.title.trim(),
          description: form.description.trim(),
          solution: form.solution.trim(),
          examples: form.examples.trim() ? form.examples : null,
          tags: form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          isActive: form.isActive,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? 'Gagal menyimpan rekaman.');
        return;
      }

      toast.success(json.message ?? (isEdit ? 'Rekaman diperbarui.' : 'Rekaman ditambahkan.'));
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
      title={isEdit ? 'Edit Rekaman Error' : 'Tambah Rekaman Error'}
      description="Isi detail rekaman knowledge base yang ingin disimpan."
      size="lg"
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={`block mb-1.5 ${labelClass}`}>
              Bahasa Pemrograman <span className="text-[#FF3B6B]">*</span>
            </label>
            <select
              value={form.language}
              onChange={(e) => set('language', e.target.value)}
              className={`${fieldClass} appearance-none [&>option]:bg-[#0A0B14]`}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {getLanguageLabel(lang)}
                </option>
              ))}
            </select>
            {errors.language && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.language}</p>}
          </div>

          <div>
            <label className={`block mb-1.5 ${labelClass}`}>
              Jenis Error <span className="text-[#FF3B6B]">*</span>
            </label>
            <input
              value={form.errorCode}
              onChange={(e) => set('errorCode', e.target.value)}
              placeholder="contoh: ZeroDivisionError"
              className={`${fieldClass} font-mono`}
            />
            {errors.errorCode && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.errorCode}</p>}
          </div>
        </div>

        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Judul / Nama Error <span className="text-[#FF3B6B]">*</span>
          </label>
          <input
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="contoh: Pembagian dengan Nol"
            className={fieldClass}
          />
          {errors.title && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.title}</p>}
        </div>

        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Deskripsi Masalah <span className="text-[#FF3B6B]">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Jelaskan situasi saat error terjadi..."
            rows={3}
            className={textareaClass}
          />
          {errors.description && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.description}</p>}
        </div>

        <div>
          <label className={`block mb-1.5 ${labelClass}`}>
            Solusi / Cara Perbaikan <span className="text-[#FF3B6B]">*</span>
          </label>
          <textarea
            value={form.solution}
            onChange={(e) => set('solution', e.target.value)}
            placeholder="Langkah-langkah memperbaiki error..."
            rows={3}
            className={textareaClass}
          />
          {errors.solution && <p className="mt-1 text-xs text-[#FF3B6B]">{errors.solution}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={`block mb-1.5 ${labelClass}`}>
              Contoh Kode Bermasalah
            </label>
            <textarea
              value={form.examples}
              onChange={(e) => set('examples', e.target.value)}
              placeholder="Tempel potongan kode di sini..."
              rows={4}
              className={`${textareaClass} font-mono text-xs`}
            />
          </div>

          <div>
            <label className={`block mb-1.5 ${labelClass}`}>
              Konsep Terkait
            </label>
            <input
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
              placeholder="contoh: Exception Handling, Division"
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-zinc-600">Pisahkan dengan koma.</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-white">Status</p>
            <p className="text-xs text-zinc-500">
              {form.isActive ? 'Aktif: tersedia untuk RAG retrieval' : 'Nonaktif: disembunyikan'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={form.isActive}
            onClick={() => set('isActive', !form.isActive)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              form.isActive ? 'bg-[#FF3B6B]' : 'bg-white/[0.08]'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                form.isActive ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
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