"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { AuthBackground } from "@/components/auth/auth-background";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { BadgePill } from "@/components/ui/badge-pill";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  QUIZ_QUESTIONS,
  QUIZ_TOTAL,
  calculateQuizScore,
  scoreToAiPreference,
  type QuizLanguage,
} from "@/lib/quiz-questions";

const LANGUAGE_LABEL: Record<QuizLanguage, string> = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  cpp: "C++",
  php: "PHP",
};

const PREFERENCE_INFO: Record<
  "brief" | "medium" | "detailed",
  { label: string; description: string }
> = {
  brief: {
    label: "Singkat",
    description:
      "AI akan menjawab ringkas dan langsung ke inti solusi — cocok untuk kamu yang sudah cukup percaya diri.",
  },
  medium: {
    label: "Sedang",
    description:
      "AI memberi penjelasan seimbang: penyebab, solusi, dan contoh kode seperlunya.",
  },
  detailed: {
    label: "Lengkap",
    description:
      "AI menjelaskan lebih mendalam: akar masalah, langkah perbaikan, dan konsep terkait — cocok untuk pemula.",
  },
};

export function QuizClient() {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [answers, setAnswers] = React.useState<(number | null)[]>(() =>
    Array(QUIZ_TOTAL).fill(null)
  );
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const question = QUIZ_QUESTIONS[current];
  const selected = answers[current];
  const isLast = current === QUIZ_TOTAL - 1;
  const answeredCount = answers.filter((a) => a !== null).length;

  const score = React.useMemo(() => calculateQuizScore(answers), [answers]);
  const preference = scoreToAiPreference(score);
  const correctCount = React.useMemo(
    () =>
      QUIZ_QUESTIONS.reduce(
        (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
        0
      ),
    [answers]
  );

  function selectOption(index: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = index;
      return next;
    });
  }

  function goNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((c) => Math.min(c + 1, QUIZ_TOTAL - 1));
  }

  function goBack() {
    setCurrent((c) => Math.max(c - 1, 0));
  }

  function restart() {
    setAnswers(Array(QUIZ_TOTAL).fill(null));
    setCurrent(0);
    setFinished(false);
  }

  async function startLearning() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, preference }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? "Gagal menyimpan hasil kuis.");
        setSubmitting(false);
        return;
      }

      // Refresh JWT agar token.quizCompletedAt terisi — kalau tidak, middleware
      // akan memantulkan user kembali ke /onboarding/quiz (redirect loop).
      await updateSession();

      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#05060A] text-white">
      <AuthBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrainCircuit className="h-6 w-6 text-neon-red" strokeWidth={1.75} />
            <span className="font-display text-sm font-bold tracking-tight text-white">
              CodeMentor<span className="text-neon-red">_AI</span>
            </span>
          </div>
          <BadgePill tone="cyan" dot>
            Onboarding
          </BadgePill>
        </div>

        {!finished ? (
          <GlassCard hover={false} className="p-6 sm:p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                <span>
                  Soal {current + 1} dari {QUIZ_TOTAL}
                </span>
                <span>{answeredCount}/{QUIZ_TOTAL} terjawab</span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={QUIZ_TOTAL}
                aria-valuenow={answeredCount}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF3B6B] to-[#7C4DFF] transition-all duration-300"
                  style={{ width: `${(answeredCount / QUIZ_TOTAL) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <BadgePill tone="cyan">{LANGUAGE_LABEL[question.language]}</BadgePill>
              <BadgePill tone="outline">Pilihan ganda</BadgePill>
            </div>

            <h1 className="font-display text-lg font-semibold tracking-tight text-white">
              {question.question}
            </h1>

            {question.code && (
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/40 p-4 font-mono text-xs leading-relaxed text-cyan-100">
                <code className="whitespace-pre">{question.code}</code>
              </pre>
            )}

            <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
              {question.options.map((option, index) => {
                const active = selected === index;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => selectOption(index)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                      active
                        ? "border-neon-red/60 bg-neon-red/[0.10] text-white"
                        : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                        active
                          ? "border-neon-red bg-neon-red text-white"
                          : "border-white/25 text-white/50"
                      )}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <GradientButton
                variant="ghost"
                size="md"
                icon={ArrowLeft}
                onClick={goBack}
                disabled={current === 0}
              >
                Sebelumnya
              </GradientButton>

              <GradientButton
                variant="primary"
                size="md"
                iconRight={ArrowRight}
                onClick={goNext}
                disabled={selected === null}
              >
                {isLast ? "Lihat Hasil" : "Lanjut"}
              </GradientButton>
            </div>
          </GlassCard>
        ) : (
          <GlassCard glow className="text-center">
            <div className="flex flex-col items-center">
              <div className="relative h-36 w-36">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <defs>
                    <linearGradient id="quizScoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FF3B6B" />
                      <stop offset="100%" stopColor="#7C4DFF" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl font-bold text-white">{score}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Skor
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-neon-orange" strokeWidth={1.75} />
                <span className="text-sm text-white/60">
                  {correctCount} dari {QUIZ_TOTAL} jawaban benar
                </span>
              </div>

              <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                Preferensi AI kamu: {PREFERENCE_INFO[preference].label}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                {PREFERENCE_INFO[preference].description}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.08] px-3 py-1.5 text-xs text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
                Tingkat penjelasan disesuaikan otomatis
              </div>

              <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <GradientButton variant="ghost" size="md" icon={RotateCcw} onClick={restart} disabled={submitting}>
                  Ulangi Kuis
                </GradientButton>
                <GradientButton
                  variant="primary"
                  size="md"
                  icon={CheckCircle2}
                  loading={submitting}
                  onClick={startLearning}
                >
                  Mulai Belajar
                </GradientButton>
              </div>
            </div>
          </GlassCard>
        )}

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-white/35">
          <BrainCircuit className="h-3.5 w-3.5" strokeWidth={1.75} />
          Jawaban kamu membantu AI menyesuaikan cara menjelaskan.
        </p>
      </div>
    </div>
  );
}
