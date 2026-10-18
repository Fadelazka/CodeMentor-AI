import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz/quiz-client";

export const metadata: Metadata = {
  title: "Kuis Kemampuan",
  description: "Kuis singkat untuk mengukur kemampuan coding dan menyesuaikan gaya penjelasan AI.",
};

export default function OnboardingQuizPage() {
  return <QuizClient />;
}
