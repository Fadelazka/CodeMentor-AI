"use client";

import * as React from "react";
import { useIntro } from "./intro-context";

/**
 * Panel mengambang kecil khusus mode development untuk memutar ulang intro
 * tanpa membuka konsol. Tidak dirender di produksi.
 */
export function IntroDevTools() {
  const { replayIntro } = useIntro();
  const [open, setOpen] = React.useState(false);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 left-4 z-[90]">
      {open ? (
        <div className="flex flex-col gap-2 border border-zinc-700 bg-zinc-950/90 p-3 shadow-xl backdrop-blur">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            Dev: Intro
          </p>
          <button
            type="button"
            onClick={replayIntro}
            className="cursor-pointer rounded-sm border border-cyan-500/40 px-3 py-1.5 font-mono text-xs text-cyan-300 transition-colors hover:bg-cyan-500/10"
          >
            Putar ulang intro
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="cursor-pointer rounded-sm px-3 py-1 text-left font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Tutup
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-sm border border-dashed border-zinc-700 bg-zinc-950/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500 backdrop-blur transition-colors hover:border-cyan-400/60 hover:text-cyan-300"
        >
          Intro
        </button>
      )}
    </div>
  );
}