"use client";

import { CheckCircle2 } from "lucide-react";

export function CorrectCodeBanner({ explanation }: { explanation: string }) {
  return (
    <div className="my-4 rounded-lg border border-emerald-500/40 bg-emerald-500/[0.08] p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-emerald-400 mb-1">
            ✓ Kode ini sudah benar 100%
          </h3>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
}