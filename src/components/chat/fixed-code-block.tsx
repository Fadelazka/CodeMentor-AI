"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Copy, Check } from "lucide-react";

interface FixedCodeBlockProps {
  code: string;
  language?: string;
}

export function FixedCodeBlock({ code, language = "python" }: FixedCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light") || 
        (!document.documentElement.classList.contains("dark") && window.matchMedia("(prefers-color-scheme: light)").matches));
    };
    checkTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    mediaQuery.addEventListener("change", checkTheme);
    return () => mediaQuery.removeEventListener("change", checkTheme);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const borderColor = isLight ? "rgba(16,185,129,0.3)" : "rgba(16,185,129,0.3)";
  const headerBg = isLight ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.05)";
  const headerBorder = isLight ? "rgba(16,185,129,0.2)" : "rgba(16,185,129,0.2)";
  const headerTextColor = isLight ? "#059669" : "#34d399";
  const buttonTextColor = isLight ? "#059669" : "#34d399";
  const buttonHoverBg = isLight ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.1)";
  const buttonHoverText = isLight ? "#047857" : "#10b981";
  const codeBg = isLight ? "#f0fdf4" : "rgba(16,185,129,0.05)";
  const codeTextColor = isLight ? "#065f46" : "#a7f3d0";

  return (
    <div className="my-4 overflow-hidden rounded-lg border" style={{ borderColor }}>
      <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ backgroundColor: headerBg, borderColor: headerBorder }}>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" style={{ color: headerTextColor }} />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: headerTextColor }}>
            Kode yang Sudah Dibenarkan
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
          style={{ color: buttonTextColor }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = buttonHoverBg; e.currentTarget.style.color = buttonHoverText; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = buttonTextColor; }}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Tersalin
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed" style={{ backgroundColor: codeBg, color: codeTextColor }}>
        <code data-language={language}>{code}</code>
      </pre>
    </div>
  );
}
