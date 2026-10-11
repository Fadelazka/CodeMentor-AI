"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, MessageSquarePlus, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/layout/sidebar";
import { BadgePill } from "@/components/ui/badge-pill";
import { GradientButton } from "@/components/ui/gradient-button";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  chat: "Chat AI",
  riwayat: "Riwayat",
  admin: "Admin",
  "knowledge-base": "Pengetahuan",
  pengaturan: "Pengaturan",
};

export function Topbar() {
  const { setMobileOpen } = useSidebar();
  const pathname = usePathname();
  const segment = pathname?.split("/").filter(Boolean)[0] ?? "";
  const breadcrumb = LABELS[segment] ?? "Ruang Kerja";

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
            âŒ˜K
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

        <Link
          href="/pengaturan"
          className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] py-1 pl-1 pr-3 transition-colors hover:border-white/[0.12]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#FF3B6B,#FF6B35)] text-xs font-bold text-[#050818]">
            F
          </span>
          <span className="hidden text-xs font-medium text-white/80 sm:block">Fadhel</span>
        </Link>
      </div>
    </header>
  );
}
