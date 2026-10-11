"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { NotificationDropdown } from "@/components/layout/notification-dropdown";
import {
  loadNotifications,
  type Notification,
  NOTIFICATIONS_UPDATED_EVENT,
} from "@/lib/notifications";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(loadNotifications());

    const refresh = () => setNotifications(loadNotifications());
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    // Poll occasionally to catch changes from other tabs / sources.
    const interval = setInterval(refresh, 30000);

    return () => {
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      clearInterval(interval);
    };
  }, []);

  // Close on outside click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-white/60 transition-colors hover:border-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/40"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-neon-red px-1 text-[10px] font-bold text-white ring-2 ring-[#05060A]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          onClose={() => setIsOpen(false)}
          onUpdate={setNotifications}
        />
      )}
    </div>
  );
}
