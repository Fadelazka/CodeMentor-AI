"use client";

import * as React from "react";
import { SkipForward, Play } from "lucide-react";
import {
  IntroSource,
} from "@/hooks/use-intro-state";

type IntroVideoProps = {
  onDone: (source: IntroSource) => void;
  onSkip: () => void;
};

const VIDEO_SRC = "/intro/codementor-intro.mp4";
const POSTER_SRC = "/intro/codementor-intro-poster.jpg";

/**
 * Overlay intro full-screen. Memutar video sekali, lalu menyelesaikan intro
 * (auto) atau melompatinya lewat tombol / tombol Escape.
 */
export function IntroVideo({ onDone, onSkip }: IntroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [ready, setReady] = React.useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = React.useState(false);

  const handleEnded = React.useCallback(() => {
    onDone("auto");
  }, [onDone]);

  const handleError = React.useCallback(() => {
    // Video gagal dimuat — jangan biarkan layar hitam selamanya.
    onDone("skip");
  }, [onDone]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDone("esc");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay diblokir browser — tampilkan tombol play manual.
        setAutoplayBlocked(true);
        setReady(true);
      });
    };
    video.addEventListener("loadeddata", () => setReady(true));
    video.addEventListener("playing", () => {
      setReady(true);
      setAutoplayBlocked(false);
    });
    tryPlay();
    return () => {
      video.removeEventListener("loadeddata", () => setReady(true));
      video.removeEventListener("playing", () => setReady(true));
    };
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        setAutoplayBlocked(false);
      }).catch(() => {
        setAutoplayBlocked(true);
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Video intro CodeMentor AI"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        onError={handleError}
      />

      {!ready && !autoplayBlocked && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Memulai…
          </p>
        </div>
      )}

      {autoplayBlocked && (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#FF3B6B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
            <span className="text-white text-sm font-medium">
              Klik untuk memutar intro
            </span>
          </div>
        </button>
      )}

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-6 right-6 flex cursor-pointer items-center gap-2 rounded-sm border border-zinc-700 bg-zinc-950/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 backdrop-blur transition-colors hover:border-cyan-400 hover:text-cyan-300"
      >
        <SkipForward className="h-3.5 w-3.5" />
        Lewati
      </button>
    </div>
  );
}