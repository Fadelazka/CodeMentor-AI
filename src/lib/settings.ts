"use client";

export interface UserSettings {
  theme: "light" | "dark" | "system";
  accentColor: "red" | "orange" | "violet" | "cyan";
  editorFontSize: "small" | "medium" | "large";
  aiLanguage: "id" | "en";
  aiDetailLevel: "brief" | "medium" | "detailed";
  autoSaveHistory: boolean;
  emailNotifications: {
    criticalErrors: boolean;
    featureUpdates: boolean;
    weeklyDigest: boolean;
  };
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  accentColor: "red",
  editorFontSize: "medium",
  aiLanguage: "id",
  aiDetailLevel: "medium",
  autoSaveHistory: true,
  emailNotifications: {
    criticalErrors: false,
    featureUpdates: false,
    weeklyDigest: true,
  },
};

const STORAGE_KEY = "codementor_user_settings_v1";
const SETTINGS_VERSION_KEY = "codementor_settings_version";
const CURRENT_SETTINGS_VERSION = "v2";

export function loadSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    const settings = {
      ...DEFAULT_SETTINGS,
      ...parsed,
      emailNotifications: {
        ...DEFAULT_SETTINGS.emailNotifications,
        ...(parsed.emailNotifications ?? {}),
      },
    };
    // Migration: force dark theme for old settings versions
    const version = localStorage.getItem(SETTINGS_VERSION_KEY);
    if (version !== CURRENT_SETTINGS_VERSION) {
      return { ...settings, theme: "dark" as const };
    }
    return settings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  localStorage.setItem(SETTINGS_VERSION_KEY, CURRENT_SETTINGS_VERSION);
  // Trigger storage event for other tabs
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: STORAGE_KEY,
      newValue: JSON.stringify(settings),
    })
  );
}

export function resetSettings() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export const SETTINGS_STORAGE_KEY = STORAGE_KEY;
