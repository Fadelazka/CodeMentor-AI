"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let endTimer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      const nextGlitch = 2000 + Math.random() * 3000; // 2-5 detik
      startTimer = setTimeout(() => {
        setIsGlitching(true);
        const duration = 200 + Math.random() * 200; // 200-400ms
        endTimer = setTimeout(() => {
          setIsGlitching(false);
          schedule();
        }, duration);
      }, nextGlitch);
    };

    schedule();

    return () => {
      if (startTimer) clearTimeout(startTimer);
      if (endTimer) clearTimeout(endTimer);
    };
  }, []);

  return (
    <span
      className={cn("glitch-text relative inline-block align-baseline", className)}
      data-glitching={isGlitching}
    >
      <span
        aria-hidden="true"
        className="glitch-layer glitch-cyan absolute inset-0 text-[#00E5FF]"
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="glitch-layer glitch-violet absolute inset-0 text-[#7C4DFF]"
      >
        {children}
      </span>
      <span className="relative text-[#FF3B6B]">{children}</span>
    </span>
  );
}
