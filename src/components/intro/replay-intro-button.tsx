"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { useIntro } from "./intro-context";

/**
 * Tombol halus untuk memutar ulang video intro. Dipakai di footer dan area
 * tidak mencolok lainnya.
 */
export function ReplayIntroButton() {
  const { replayIntro } = useIntro();

  return (
    <button
      type="button"
      onClick={replayIntro}
      className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-cyan-400"
      title="Putar ulang video intro"
    >
      <RotateCcw className="h-3.5 w-3.5" />
      Putar ulang intro
    </button>
  );
}