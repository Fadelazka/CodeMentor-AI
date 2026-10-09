"use client";

import { useCallback, useEffect, useState } from "react";

export const INTRO_KEY = "codementor_intro_seen_v1";
export const HINT_KEY = "codementor_intro_hint_shown";
export const OLD_INTRO_KEY = "codementor_intro_seen";

export type IntroSource = "auto" | "skip" | "esc";

export type IntroPayload = {
  seenAt: string;
  skipped: boolean;
  source: IntroSource;
};

export type IntroState = "loading" | "visible" | "hidden";

const isStorageAvailable = () => {
  try {
    const k = "__codementor_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
};

const readStored = (): IntroPayload | null => {
  if (!isStorageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(INTRO_KEY);
    return raw ? (JSON.parse(raw) as IntroPayload) : null;
  } catch {
    return null;
  }
};

/**
 * Migrasi kunci sessionStorage lama menjadi localStorage, lalu bersih.
 */
const migrateLegacy = () => {
  if (!isStorageAvailable()) return;
  try {
    const old = window.sessionStorage.getItem(OLD_INTRO_KEY);
    if (!old) return;
    window.localStorage.setItem(
      INTRO_KEY,
      JSON.stringify({
        seenAt: new Date().toISOString(),
        skipped: true,
        source: "skip",
      } satisfies IntroPayload)
    );
    window.sessionStorage.removeItem(OLD_INTRO_KEY);
  } catch {
    // abaikan; kunci lama dianggap tidak ada
  }
};

export function useIntroState() {
  const [state, setState] = useState<IntroState>("loading");

  const markAsSeen = useCallback((source: IntroSource) => {
    if (isStorageAvailable()) {
      const payload: IntroPayload = {
        seenAt: new Date().toISOString(),
        skipped: source !== "auto",
        source,
      };
      window.localStorage.setItem(INTRO_KEY, JSON.stringify(payload));
    }
    setState("hidden");
  }, []);

  const resetIntro = useCallback(() => {
    if (isStorageAvailable()) {
      window.localStorage.removeItem(INTRO_KEY);
    }
    setState("visible");
  }, []);

  const replayIntro = useCallback(() => {
    if (isStorageAvailable()) {
      window.localStorage.removeItem(INTRO_KEY);
    }
    setState("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showIntro = useCallback(() => {
    setState("visible");
  }, []);

  const getIntroState = useCallback(() => {
    const stored = readStored();
    return { hasSeenIntro: state === "hidden", stored, state };
  }, [state]);

  useEffect(() => {
    migrateLegacy();

    // Override URL hanya aktif di development (untuk QA/demo).
    const isDev = process.env.NODE_ENV === "development";
    if (isDev && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const override = params.get("intro");
      if (override === "force") {
        setState("visible");
        return;
      }
      if (override === "reset") {
        if (isStorageAvailable()) {
          window.localStorage.removeItem(INTRO_KEY);
        }
        setState("visible");
        return;
      }
      if (override === "skip") {
        setState("hidden");
        return;
      }
    }

    // Hormati prefers-reduced-motion: lewati intro otomatis.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stored = readStored();
    if (stored) {
      setState("hidden");
      return;
    }
    if (prefersReducedMotion) {
      markAsSeen("skip");
      return;
    }
    setState("visible");
  }, [markAsSeen]);

  // Sinkronisasi lintas tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === INTRO_KEY) {
        setState(e.newValue ? "hidden" : "visible");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Helper global khusus development.
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    (window as unknown as Record<string, unknown>).__codementor = {
      resetIntro,
      showIntro,
      getIntroState,
    };
    return () => {
      delete (window as unknown as Record<string, unknown>).__codementor;
    };
  }, [resetIntro, showIntro, getIntroState]);

  return {
    state,
    markAsSeen,
    resetIntro,
    replayIntro,
    showIntro,
    getIntroState,
  };
}