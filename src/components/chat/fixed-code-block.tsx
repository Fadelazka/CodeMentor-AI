"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Check } from "lucide-react";

interface FixedCodeBlockProps {
  code: string;
  language?: string;
}

export function FixedCodeBlock({ code, language = "python" }: FixedCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-emerald-500/30 bg-emerald-950/20">
      <div className="flex items-center justify-between border-b border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Kode yang Sudah Dibenarkan
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
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

      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-emerald-100">
        <code data-language={language}>{code}</code>
      </pre>
    </div>
  );
}
