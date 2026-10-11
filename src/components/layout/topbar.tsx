"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  Search,
  Bell,
  MessageSquarePlus,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useSidebar } from "@/components/layout/sidebar";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";

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
  const menuRef = useRef<HTMLDivElement>(null);

  const segment = pathname?.split("/").filter(Boolean)[0] ?? "";
  const breadcrumb = LABELS[segment] ?? "Ruang Kerja";

  const name = session?.user?.name ?? "Fadhel";
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/[0.06] bg-[#05060A]/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
        className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <nav className="hidden items-center gap-1.5 text-sm md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">CodeMentor</span>
        <ChevronRight className="h-3.5 w-3.5 text-white/20" />
        <span className="font-medium text-white/80">{breadcrumb ?? "Ruang Kerja"}</span>
      </nav>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            type="text"
            placeholder="Cari error, bahasa, riwayat..."
            className="h-9 w-44 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-14 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:w-60 focus:border-white/[0.12] focus:bg-white/[0.05] lg:w-56"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-white/40 lg:block">
            Ctrl K
          </kbd>
        </div>

        <BadgePill tone="green" dot className="hidden xl:inline-flex">
          AI Online
        </BadgePill>

        <button
          aria-label="Notifikasi"
          className="relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-white/60 transition-colors hover:border-white/[0.12] hover:text-white"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neon-pink" />
        </button>

        <GradientButton href="/chat" size="sm" icon={MessageSquarePlus} className="hidden md:inline-flex">
          Tanya Baru
        </GradientButton>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] py-1 pl-1 pr-3 transition-colors hover:border-white/[0.12]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-xs font-bold text-[#050818]">
              {initial}
            </span>
            <span className="hidden text-xs font-medium text-white/80 sm:block">{name}</span>
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
                className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0A0B14] p-1.5 shadow-2xl shadow-black/40"
              >
                <div className="border-b border-white/[0.06] px-3 py-2">
                  <p className="truncate text-sm font-medium text-white">{name}</p>
                  <p className="truncate text-xs text-white/40">
                    {session?.user?.email ?? "fadhel@example.com"}
                  </p>
                </div>

                <Link
                  href="/profil"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <User className="h-4 w-4" strokeWidth={1.75} />
                  Profil
                </Link>

                <Link
                  href="/pengaturan"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Settings className="h-4 w-4" strokeWidth={1.75} />
                  Pengaturan
                </Link>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => signOut({ callbackUrl: "/masuk" })}
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
    </header>
  );
}
