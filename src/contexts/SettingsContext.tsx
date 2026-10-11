"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  loadSettings,
  saveSettings,
  resetSettings,
  DEFAULT_SETTINGS,
  type UserSettings,
} from "@/lib/settings";

const ACCENT_MAP: Record<
  UserSettings["accentColor"],
  { primary: string; rgb: string; secondary: string; secondaryRgb: string }
> = {
  red: { primary: "#FF3B6B", rgb: "255 59 107", secondary: "#FF6B35", secondaryRgb: "255 107 53" },
  orange: { primary: "#FF6B35", rgb: "255 107 53", secondary: "#FFB020", secondaryRgb: "255 176 32" },
  violet: { primary: "#7C4DFF", rgb: "124 77 255", secondary: "#A855F7", secondaryRgb: "168 85 247" },
  cyan: { primary: "#00E5FF", rgb: "0 229 255", secondary: "#06B6D4", secondaryRgb: "6 182 212" },
};

const FONT_SIZE_MAP = { small: "12px", medium: "14px", large: "16px" } as const;

type ResolvedTheme = "light" | "dark";

interface SettingsContextValue {
  settings: UserSettings;
  resolvedTheme: ResolvedTheme;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetAll: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function resolveTheme(theme: UserSettings["theme"]): ResolvedTheme {
  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applySettingsToDOM(settings: UserSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = resolveTheme(settings.theme);

  // Theme
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  root.classList.toggle("theme-light", resolved === "light");
  root.style.colorScheme = resolved;
  // Keep the legacy ThemeProvider's key in sync so it does not fight us.
  try {
    window.localStorage.setItem("theme", resolved);
    window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: resolved }));
  } catch {
    /* ignore */
  }

  // Accent color
  const accent = ACCENT_MAP[settings.accentColor];
  root.style.setProperty("--accent-primary", accent.primary);
  root.style.setProperty("--accent-secondary", accent.secondary);
  root.style.setProperty("--accent-primary-rgb", accent.rgb);
  root.style.setProperty("--accent-secondary-rgb", accent.secondaryRgb);

  // Editor font size
  root.style.setProperty("--editor-font-size", FONT_SIZE_MAP[settings.editorFontSize]);

  // Dashboard shell background
  root.style.setProperty("--shell-bg", resolved === "dark" ? "#05060a" : "#f4f5f7");
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    setResolvedTheme(resolveTheme(loaded.theme));
    applySettingsToDOM(loaded);
  }, []);

  // React to system theme changes when in "system" mode.
  useEffect(() => {
    if (settings.theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = resolveTheme("system");
      setResolvedTheme(resolved);
      applySettingsToDOM(settings);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [settings]);

  // Sync across tabs.
  useEffect(() => {
    const handler = () => {
      const loaded = loadSettings();
      setSettings(loaded);
      setResolvedTheme(resolveTheme(loaded.theme));
      applySettingsToDOM(loaded);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const updateSettings = (partial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next: UserSettings = {
        ...prev,
        ...partial,
        emailNotifications: {
          ...prev.emailNotifications,
          ...(partial.emailNotifications ?? {}),
        },
      };
      saveSettings(next);
      applySettingsToDOM(next);
      setResolvedTheme(resolveTheme(next.theme));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("settings-updated"));
      }
      return next;
    });
  };

  const resetAll = () => {
    const defaults: UserSettings = {
      ...DEFAULT_SETTINGS,
      emailNotifications: { ...DEFAULT_SETTINGS.emailNotifications },
    };
    resetSettings();
    setSettings(defaults);
    applySettingsToDOM(defaults);
    setResolvedTheme(resolveTheme(defaults.theme));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("settings-updated"));
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, resolvedTheme, updateSettings, resetAll }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}
