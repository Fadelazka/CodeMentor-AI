'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Loader2, Check } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TYPES = [
  { value: 'helpful', label: '👍 Bermanfaat', color: 'emerald' },
  { value: 'not_helpful', label: '👎 Tidak Membantu', color: 'red' },
  { value: 'suggestion', label: '💡 Saran', color: 'amber' },
  { value: 'bug', label: '🐛 Laporkan Bug', color: 'violet' },
];

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reset = () => {
    setType('');
    setMessage('');
    setSubmitted(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      alert('Gagal kirim feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0A0B14] p-6 space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Terima kasih!</h3>
              <p className="text-sm text-zinc-400">Feedback Anda sangat berarti untuk kami.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF3B6B]/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#FF3B6B]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Kirim Feedback</h3>
                    <p className="text-xs text-zinc-500">Bantu kami tingkatkan CodeMentor AI</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-3">
                    Jenis Feedback
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setType(t.value)}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          type === t.value
                            ? 'bg-[#FF3B6B]/10 border-[#FF3B6B] text-[#FF3B6B]'
                            : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.05]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Pesan (opsional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ceritakan lebih detail..."
                    rows={4}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#FF3B6B]/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-sm text-white font-medium hover:bg-white/[0.08] transition-colors disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !type}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#FF3B6B] to-[#FF6B35] text-sm text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {submitting ? 'Mengirim...' : 'Kirim Feedback'}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
