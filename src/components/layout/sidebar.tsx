"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  MessagesSquare,
  History,
  BookOpen,
  ShieldCheck,
  Home,
  Settings,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { LogoMark } from "@/components/brand/logo-mark";

const COLLAPSE_KEY = "codementor_sidebar_collapsed";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export function getNavSections(isAdmin: boolean): NavSection[] {
  return [
    {
      label: "Utama",
      items: [
        ...(isAdmin
          ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
          : []),
        { href: "/chat", label: "Chat AI", icon: MessagesSquare, badge: "AI" },
        { href: "/riwayat", label: "Riwayat", icon: History },
      ],
    },
    {
      label: "Kelola",
      items: [
        { href: "/pengetahuan", label: "Pengetahuan", icon: BookOpen },
        ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }] : []),
      ],
    },
  ];
}

type SidebarContextValue = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem(COLLAPSE_KEY) === "1") setCollapsed(true);
  }, []);

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }),
    [collapsed, toggleCollapsed, mobileOpen]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

interface SidebarLinkProps {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarLink({ item, collapsed, onNavigate }: SidebarLinkProps) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
        collapsed && "justify-center px-0",
        active
          ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#FF3B6B]" />
      )}
      <item.icon
        className={cn(
          "h-[18px] w-[18px] shrink-0",
          active
            ? "text-neon-red"
            : "text-slate-400 group-hover:text-neon-red dark:text-slate-500 dark:group-hover:text-neon-red"
        )}
        strokeWidth={1.75}
      />
      {!collapsed && <span className="flex-1 truncate font-medium tracking-tight">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="rounded-full border border-neon-orange/30 bg-neon-orange/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#FF6B35]">
          {item.badge}
        </span>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip content={item.label} side="right" className="w-full">
        <div className="w-full">{link}</div>
      </Tooltip>
    );
  }

  return link;
}

export function SidebarSection({
  section,
  collapsed,
  onNavigate,
}: {
  section: NavSection;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-5">
      {!collapsed && (
        <p className="mb-2 px-3 font-mono text-[9px] uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
          {section.label}
        </p>
      )}
      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarLink key={item.href} item={item} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 px-2", collapsed && "justify-center px-0")}>
      <LogoMark className="h-9 w-9 shrink-0" size={36} />
      {!collapsed && (
        <span className="leading-tight">
          <span className="block font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            CodeMentor
          </span>
          <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-neon-red">
            _AI
          </span>
        </span>
      )}
    </Link>
  );
}

function SidebarFooter({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const links: NavItem[] = [
    { href: "/profil", label: "Profil", icon: User },
    { href: "/pengaturan", label: "Pengaturan", icon: Settings },
  ];
  return (
    <div className="space-y-1 border-t border-slate-200 pt-4 dark:border-white/20">
      {links.map((item) => (
        <SidebarLink key={item.href} item={item} collapsed={collapsed} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const sections = getNavSections(isAdmin);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200 bg-white backdrop-blur-xl transition-[width] duration-300 dark:border-white/20 dark:bg-[#12141D] lg:flex",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-3 dark:border-white/20">
        <SidebarBrand collapsed={collapsed} />
        {!collapsed && (
          <button
            onClick={toggleCollapsed}
            aria-label="Tutup sidebar"
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
        )}
      </div>

      <div className={cn("sidebar-scroll flex-1 overflow-y-auto px-3 py-5", collapsed && "px-2")}>
        {sections.map((section) => (
          <SidebarSection key={section.label} section={section} collapsed={collapsed} />
        ))}
      </div>

      <div className={cn("px-3 pb-4", collapsed && "px-2")}>
        {collapsed && (
          <button
            onClick={toggleCollapsed}
            aria-label="Buka sidebar"
            className="mb-3 flex w-full items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
        )}
        <SidebarFooter collapsed={collapsed} />
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const sections = getNavSections(isAdmin);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className={cn("fixed inset-0 z-50 lg:hidden pointer-events-none", mobileOpen ? "pointer-events-auto" : "")}>
      <div
        onClick={() => setMobileOpen(false)}
        className={cn(
          "absolute inset-0 bg-[#050818]/70 backdrop-blur-sm transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "absolute inset-y-0 left-0 flex w-[268px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-white/20 dark:bg-[#12141D]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-white/20">
          <SidebarBrand collapsed={false} />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white/50 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="sidebar-scroll flex-1 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <SidebarSection
              key={section.label}
              section={section}
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
        </div>
        <div className="px-3 pb-4">
          <SidebarFooter collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </div>
      </aside>
    </div>
  );
}
