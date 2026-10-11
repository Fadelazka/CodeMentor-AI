"use client";

import { Sparkles } from "lucide-react";

const ITEMS = [
  "analisis kode error mu disini!",
  "CodeMentor AI hadir dengan senang hati!",
];

function highlight(word: string, index: number) {
  const lower = word.toLowerCase();
  if (lower.includes("analisis")) {
    return (
      <span key={index} className="text-[#00E5FF]">
        {word}{" "}
      </span>
    );
  }
  if (lower.includes("codementor") || lower === "ai") {
    return (
      <span key={index} className="text-[#7C4DFF]">
        {word}{" "}
      </span>
    );
  }
  return <span key={index}>{word} </span>;
}

function MarqueeContent() {
  return (
    <div className="flex shrink-0">
      {ITEMS.map((item, itemIndex) => (
        <span key={itemIndex} className="mx-8 flex items-center gap-8">
          <Sparkles className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
          <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-white/80 md:text-base">
            {item.split(" ").map(highlight)}
          </span>
        </span>
      ))}
    </div>
  );
}

export function HeroMarquee() {
  return (
    <section
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#0A0E27]/60 py-5 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0A0E27] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0A0E27] to-transparent" />

      <div className="flex w-max animate-marquee whitespace-nowrap">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
}
