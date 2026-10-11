"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CodeToken {
  text: string;
  className?: string;
}

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypingText({
  text,
  speed = 40,
  delay = 0,
  loop = true,
  loopDelay = 3000,
  onComplete,
  className,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);
  const firstRunRef = useRef(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      indexRef.current = text.length;
      setDisplayed(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    if (indexRef.current >= text.length) {
      if (!loop) return;
      const restartTimer = setTimeout(() => {
        indexRef.current = 0;
        setDisplayed("");
        setIsComplete(false);
      }, loopDelay);
      return () => clearTimeout(restartTimer);
    }

    const startDelay = firstRunRef.current ? delay : 0;
    firstRunRef.current = false;

    const delayTimer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));

        if (indexRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, isComplete, text, speed, delay, loop, loopDelay]);

  return (
    <span ref={containerRef} className={className}>
      {displayed}
      <span
        className={cn(
          "ml-0.5 inline-block h-[1.1em] w-[0.6em] align-middle bg-cyan-400",
          isComplete && "animate-pulse"
        )}
        aria-hidden="true"
      />
    </span>
  );
}

interface TypingCodeBlockProps {
  lines: CodeToken[][];
  speed?: number;
  lineDelay?: number;
  loop?: boolean;
  loopDelay?: number;
  className?: string;
}

export function TypingCodeBlock({
  lines,
  speed = 38,
  lineDelay = 260,
  loop = true,
  loopDelay = 3000,
  className,
}: TypingCodeBlockProps) {
  const [activeLine, setActiveLine] = useState(-1);
  const [generation, setGeneration] = useState(0);
  const [started, setStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [instant, setInstant] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setInstant(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !started) {
      setStarted(true);
      setActiveLine(instant ? lines.length - 1 : 0);
      setGeneration((g) => g + 1);
    }
  }, [isVisible, started, instant, lines.length]);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );

  const handleLineComplete = useCallback(
    (index: number) => {
      if (instant) return;

      if (index < lines.length - 1) {
        const timer = setTimeout(() => setActiveLine(index + 1), lineDelay);
        timersRef.current.push(timer);
        return;
      }

      if (loop) {
        const timer = setTimeout(() => {
          setActiveLine(0);
          setGeneration((g) => g + 1);
        }, loopDelay);
        timersRef.current.push(timer);
      }
    },
    [instant, lines.length, lineDelay, loop, loopDelay]
  );

  const paused = !isVisible;

  return (
    <div ref={containerRef} className={className}>
      {lines.map((tokens, i) => (
        <p key={`${generation}-${i}`} className="whitespace-pre text-muted-foreground">
          <span className="select-none">{i + 1}  </span>
          {instant ? (
            <StaticTokens tokens={tokens} />
          ) : i <= activeLine ? (
            <TypingLine
              tokens={tokens}
              speed={speed}
              active={i === activeLine}
              paused={paused}
              onComplete={() => handleLineComplete(i)}
            />
          ) : (
            <span className="opacity-0" aria-hidden="true">
              {"\u00A0"}
            </span>
          )}
        </p>
      ))}
    </div>
  );
}

function StaticTokens({ tokens }: { tokens: CodeToken[] }) {
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={token.className}>
          {token.text}
        </span>
      ))}
    </>
  );
}

interface TypingLineProps {
  tokens: CodeToken[];
  speed: number;
  active: boolean;
  paused: boolean;
  onComplete: () => void;
}

function TypingLine({ tokens, speed, active, paused, onComplete }: TypingLineProps) {
  const total = useMemo(
    () => tokens.reduce((sum, token) => sum + token.text.length, 0),
    [tokens]
  );
  const [count, setCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const firedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active || paused || count >= total) return;

    const interval = setInterval(() => {
      setCount((current) => {
        const next = Math.min(current + 1, total);
        if (next >= total) clearInterval(interval);
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, total, speed]);

  useEffect(() => {
    if (active && count >= total && !firedRef.current) {
      firedRef.current = true;
      onCompleteRef.current();
    }
  }, [active, count, total]);

  let remaining = count;

  return (
    <>
      {tokens.map((token, i) => {
        if (remaining <= 0) return null;
        const visible = token.text.slice(0, remaining);
        remaining -= token.text.length;
        return (
          <span key={i} className={token.className}>
            {visible}
          </span>
        );
      })}
      {active && (
        <span
          className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[2px] animate-pulse bg-cyan-400 align-middle"
          aria-hidden="true"
        />
      )}
    </>
  );
}
