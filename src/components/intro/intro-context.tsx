"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { IntroDevTools } from "./intro-dev-tools";
import { IntroVideo } from "./intro-video";
import {
  HINT_KEY,
  useIntroState,
  type IntroSource,
} from "@/hooks/use-intro-state";

/**
 * Rute aplikasi terproteksi (route group `(app)`). Widget dev intro tidak
 * boleh tampil di sini — hanya di halaman publik/landing.
 */
const APP_ROUTE_PREFIXES = [
  "/dashboard",
  "/chat",
  "/riwayat",
  "/admin",
  "/profil",
  "/pengaturan",
];

function isAppRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

type IntroContextValue = {
  replayIntro: () => void;
  resetIntro: () => void;
};

const IntroContext = React.createContext<IntroContextValue | null>(null);

export function useIntro() {
  const ctx = React.useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro harus dipakai di dalam <IntroProvider>");
  }
  return ctx;
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const { state, markAsSeen, resetIntro, replayIntro } = useIntroState();
  const pathname = usePathname();
  const showDevTools = !isAppRoute(pathname);

  // Kunci scroll saat intro tampil.
  React.useEffect(() => {
    if (state === "visible") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [state]);

  const handleDone = React.useCallback(
    (source: IntroSource) => {
      const shouldHint =
        source === "auto" && !window.localStorage.getItem(HINT_KEY);
      markAsSeen(source);
      if (!shouldHint) return;
      try {
        window.localStorage.setItem(HINT_KEY, "1");
      } catch {
        // penyimpanan tidak tersedia — lewati toast
      }
      toast("Ingin lihat intro lagi? Klik \"Putar ulang intro\" di footer.", {
        duration: 5000,
        icon: "🎬",
      });
    },
    [markAsSeen]
  );

  const value = React.useMemo<IntroContextValue>(
    () => ({ replayIntro, resetIntro }),
    [replayIntro, resetIntro]
  );

  return (
    <IntroContext.Provider value={value}>
      {children}
      {state === "visible" && (
        <IntroVideo onDone={handleDone} onSkip={() => handleDone("skip")} />
      )}
      {showDevTools && <IntroDevTools />}
    </IntroContext.Provider>
  );
}