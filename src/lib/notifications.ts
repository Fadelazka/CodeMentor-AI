export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  actionUrl?: string;
}

const STORAGE_KEY = "codementor_notifications_v1";
export const NOTIFICATIONS_STORAGE_KEY = STORAGE_KEY;
export const NOTIFICATIONS_UPDATED_EVENT = "notifications-updated";

export function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Notification[]) : getDefaultNotifications();
  } catch {
    return [];
  }
}

export function saveNotifications(notifs: Notification[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(NOTIFICATIONS_UPDATED_EVENT));
}

export function addNotification(notif: Omit<Notification, "id" | "timestamp" | "read">) {
  const list = loadNotifications();
  const newNotif: Notification = {
    ...notif,
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
    read: false,
  };
  const updated = [newNotif, ...list].slice(0, 50); // max 50
  saveNotifications(updated);
  return newNotif;
}

function getDefaultNotifications(): Notification[] {
  const now = Date.now();
  return [
    {
      id: "welcome",
      type: "info",
      title: "Selamat datang di CodeMentor AI!",
      message: "Mulai debugging dengan menempelkan kode Anda di halaman Chat.",
      timestamp: now - 1000 * 60 * 5,
      read: false,
      actionUrl: "/chat",
    },
    {
      id: "tip1",
      type: "success",
      title: "Tips: Sertakan pesan error",
      message: "Semakin lengkap pesan error, semakin akurat analisis AI.",
      timestamp: now - 1000 * 60 * 60,
      read: false,
    },
    {
      id: "feature1",
      type: "info",
      title: "Fitur baru: Dashboard Baru",
      message: "Cek tampilan dashboard dengan grafik interaktif.",
      timestamp: now - 1000 * 60 * 60 * 24,
      read: true,
      actionUrl: "/dashboard",
    },
  ];
}
