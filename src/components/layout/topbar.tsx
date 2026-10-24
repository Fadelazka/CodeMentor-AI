"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  MessageSquare,
  MessageSquarePlus,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/components/layout/sidebar";
import { NotificationBell } from "@/components/layout/notification-bell";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";
import { FeedbackModal } from "@/components/chat/feedback-modal";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  chat: "Chat AI",
  riwayat: "Riwayat",
  admin: "Admin",
  "knowledge-base": "Pengetahuan",
  profil: "Profil",
  pengaturan: "Pengaturan",
};

export function Topbar() {
  const { setMobileOpen } = useSidebar();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const segment = pathname?.split("/").filter(Boolean)[0] ?? "";
  const breadcrumb = LABELS[segment] ?? "Ruang Kerja";

  const name = session?.user?.name ?? "Fadhel";
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-white lg:hidden"
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <nav className="hidden items-center gap-1.5 text-sm md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500 dark:text-white/35">CodeMentor</span>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-white/20" />
        <span className="font-medium text-slate-900 dark:text-white">{breadcrumb ?? "Ruang Kerja"}</span>
      </nav>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <BadgePill tone="green" dot className="hidden xl:inline-flex">
          AI Online
        </BadgePill>

        {pathname?.startsWith("/chat") && (
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:hover:bg-white/[0.08]"
          >
            <MessageSquare className="w-4 h-4" />
            Feedback
          </button>
        )}

        <NotificationBell />

        <GradientButton href="/chat" size="sm" icon={MessageSquarePlus} className="hidden md:inline-flex">
          Tanya Baru
        </GradientButton>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1 pl-1 pr-3 transition-colors hover:border-slate-300 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-white/[0.12]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-xs font-bold text-[#050818]">
              {initial}
            </span>
            <span className="hidden text-xs font-medium text-slate-700 dark:text-white/80 sm:block">{name}</span>
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                aria-hidden
                onClick={() => setMenuOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-300/40 dark:border-white/[0.08] dark:bg-[#0A0B14] dark:shadow-black/40"
              >
                <div className="border-b border-slate-200 px-3 py-2 dark:border-white/[0.06]">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-white/40">
                    {session?.user?.email ?? "fadhel@example.com"}
                  </p>
                </div>

                <Link
                  href="/profil"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  <User className="h-4 w-4" strokeWidth={1.75} />
                  Profil
                </Link>

                <Link
                  href="/pengaturan"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  <Settings className="h-4 w-4" strokeWidth={1.75} />
                  Pengaturan
                </Link>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-neon-red transition-colors hover:bg-neon-red/[0.08]"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </header>
  );
}
