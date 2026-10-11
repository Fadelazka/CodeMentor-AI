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
  onComplete?: () => void;
  className?: string;
}

export function TypingText({
  text,
  speed = 40,
  delay = 0,
  onComplete,
  className,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayed(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const delayTimer = setTimeout(() => {
      interval = setInterval(() => {
        if (index < text.length) {
          index += 1;
          setDisplayed(text.slice(0, index));
        } else {
          if (interval) clearInterval(interval);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (interval) clearInterval(interval);
    };
  }, [started, text, speed, delay]);

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
  className?: string;
}

export function TypingCodeBlock({
  lines,
  speed = 38,
  lineDelay = 260,
  className,
}: TypingCodeBlockProps) {
  const [activeLine, setActiveLine] = useState(-1);
  const [started, setStarted] = useState(false);
  const [instant, setInstant] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setInstant(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setActiveLine(instant ? lines.length - 1 : 0);
  }, [started, instant, lines.length]);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    []
  );

  const handleLineComplete = useCallback(
    (index: number) => {
      if (instant || index >= lines.length - 1) return;
      const timer = setTimeout(() => setActiveLine(index + 1), lineDelay);
      timersRef.current.push(timer);
    },
    [instant, lines.length, lineDelay]
  );

  return (
    <div ref={containerRef} className={className}>
      {lines.map((tokens, i) => (
        <p key={i} className="whitespace-pre text-muted-foreground">
          <span className="select-none">{i + 1}  </span>
          {instant ? (
            <StaticTokens tokens={tokens} />
          ) : i <= activeLine ? (
            <TypingLine
              tokens={tokens}
              speed={speed}
              active={i === activeLine}
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
  onComplete: () => void;
}

function TypingLine({ tokens, speed, active, onComplete }: TypingLineProps) {
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
    if (!active || count >= total) return;

    const interval = setInterval(() => {
      setCount((current) => {
        const next = Math.min(current + 1, total);
        if (next >= total) clearInterval(interval);
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, total, speed]);

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
