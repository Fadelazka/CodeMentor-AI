"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  { value: "python", label: "Python", icon: "🐍" },
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "⚙️" },
  { value: "php", label: "PHP", icon: "🐘" },
] as const;

interface LanguageDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageDropdown({ value, onChange }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const selected = LANGUAGES.find((l) => l.value === value) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex h-10 items-center gap-2 rounded-xl border px-3 pr-2 text-sm font-medium outline-none transition-colors focus:border-neon-red/40"
        style={{
          background: "var(--surface-2)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        <span className="text-base leading-none">{selected.icon}</span>
        <span>{selected.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl border shadow-2xl"
            style={{
              background: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            {LANGUAGES.map((lang) => {
              const active = lang.value === value;
              return (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => {
                    onChange(lang.value);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors"
                  style={{
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    background: active ? "var(--surface-3)" : "transparent",
                  }}
                >
                  <span className="text-base leading-none">{lang.icon}</span>
                  <span>{lang.label}</span>
                  {active && <span className="ml-auto text-[#FF3B6B]">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
