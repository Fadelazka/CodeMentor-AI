"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { X, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { type Notification, saveNotifications } from "@/lib/notifications";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  info: { Icon: Info, color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
  success: { Icon: CheckCircle2, color: "text-neon-green", bg: "bg-neon-green/10" },
  warning: { Icon: AlertTriangle, color: "text-neon-amber", bg: "bg-neon-amber/10" },
  error: { Icon: XCircle, color: "text-neon-red", bg: "bg-neon-red/10" },
} as const;

export function NotificationDropdown({
  notifications,
  onClose,
  onUpdate,
}: {
  notifications: Notification[];
  onClose: () => void;
  onUpdate: (n: Notification[]) => void;
}) {
  const router = useRouter();

  const labels = useMemo(
    () =>
      notifications.map((n) =>
        formatDistanceToNow(n.timestamp, { addSuffix: true, locale: idLocale })
      ),
    [notifications]
  );

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
    onUpdate(updated);
  };

  const clearAll = () => {
    saveNotifications([]);
    onUpdate([]);
  };

  const handleClick = (notif: Notification) => {
    const updated = notifications.map((n) => (n.id === notif.id ? { ...n, read: true } : n));
    saveNotifications(updated);
    onUpdate(updated);

    if (notif.actionUrl) {
      router.push(notif.actionUrl);
      onClose();
    }
  };

  return (
    <div className="animate-fade-in absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40 dark:border-white/[0.08] dark:bg-[#0A0B14] dark:shadow-black/40 sm:w-96">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifikasi</h3>
        <div className="flex items-center gap-1">
          {notifications.length > 0 && (
            <>
              <button
                onClick={markAllRead}
                className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                title="Tandai semua sudah dibaca"
              >
                <CheckCheck className="h-4 w-4" />
              </button>
              <button
                onClick={clearAll}
                className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-neon-red/10 hover:text-neon-red dark:text-zinc-400"
                title="Hapus semua"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
            title="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-white/[0.04]">
              <Info className="h-5 w-5 text-slate-500 dark:text-zinc-500" />
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-500">Belum ada notifikasi</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-white/[0.04]">
            {notifications.map((notif, i) => {
              const { Icon, color, bg } = ICON_MAP[notif.type];
              return (
                <button
                  key={notif.id}
                  onClick={() => handleClick(notif)}
                  className={cn(
                    "flex w-full gap-3 p-4 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/[0.03]",
                    !notif.read && "bg-slate-50 dark:bg-white/[0.02]"
                  )}
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", bg)}>
                    <Icon className={cn("h-4 w-4", color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn("truncate text-sm font-medium", !notif.read ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-zinc-400")}>
                        {notif.title}
                      </p>
                      {!notif.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-neon-red" />}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-zinc-500">{notif.message}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-600">{labels[i]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-center dark:border-white/[0.06] dark:bg-white/[0.02]">
          <button onClick={onClose} className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white">
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
