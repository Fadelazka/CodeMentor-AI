'use client';

import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Hapus Rekaman Error?',
  description = 'Tindakan ini tidak dapat dibatalkan.',
  isLoading = false,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#FF3B6B]/10 
            flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-[#FF3B6B]" />
          </div>
          <p className="text-sm text-zinc-400 mt-2.5">
            {description}
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-white/[0.04] 
              border border-white/[0.08] text-sm text-white 
              hover:bg-white/[0.08] transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-gradient-to-r 
              from-[#FF3B6B] to-[#FF6B35] text-sm font-medium 
              text-white hover:opacity-90 transition-opacity
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </Modal>
  );
}