'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, Loader2 } from 'lucide-react';

interface FeedbackButtonsProps {
  chatHistoryId: string;
  initialFeedback?: string | null;
}

export function FeedbackButtons({ chatHistoryId, initialFeedback }: FeedbackButtonsProps) {
  const [selected, setSelected] = useState<string | null>(initialFeedback || null);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(!!initialFeedback);

  const handleSelect = (type: string) => {
    if (submitted) return;
    setSelected(type);
    setShowComment(true);
  };

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/chat/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatHistoryId,
          feedback: selected,
          comment,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setShowComment(false);
    } catch (err) {
      console.error(err);
      alert('Gagal kirim feedback. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-xs text-emerald-400 pt-4 border-t border-white/[0.04]">
        <Check className="w-3.5 h-3.5" />
        <span>Terima kasih atas feedback Anda!</span>
      </div>
    );
  }

  return (
    <div className="pt-4 border-t border-white/[0.04] space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-zinc-500 mr-1">Feedback:</span>
        <button
          type="button"
          onClick={() => handleSelect('helpful')}
          disabled={submitting}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            selected === 'helpful'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.05]'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Bermanfaat
        </button>
        <button
          type="button"
          onClick={() => handleSelect('not_helpful')}
          disabled={submitting}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            selected === 'not_helpful'
              ? 'bg-[#FF3B6B]/15 border-[#FF3B6B]/40 text-[#FF3B6B]'
              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.05]'
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          Tidak Membantu
        </button>
      </div>

      {showComment && (
        <div className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Komentar tambahan (opsional)..."
            rows={2}
            disabled={submitting}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#FF3B6B]/40 transition-colors resize-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setShowComment(false);
                setSelected(null);
              }}
              disabled={submitting}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !selected}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF3B6B] to-[#FF6B35] text-xs text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              {submitting ? 'Mengirim...' : 'Kirim Feedback'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
