"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  History,
  Shield,
  Settings,
  User,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "Chat AI", icon: MessageSquare },
  { href: "/riwayat", label: "Riwayat", icon: History },
];

const adminItems = [
  { href: "/admin", label: "Admin Panel", icon: Shield },
];

const bottomItems = [
  { href: "/project/overview", label: "Dokumentasi Proyek", icon: Settings },
  { href: "/", label: "Kembali ke Beranda", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  const renderGroup = (title: string, links: typeof items) => (
    <div className="mb-6">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {title}
      </p>
      <nav className="space-y-1">
        {links.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname?.startsWith("/admin")
              : pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white pt-16 lg:block dark:border-slate-800 dark:bg-dark-card">
      <div className="flex h-full flex-col overflow-y-auto p-4 pt-6">
        {renderGroup("Utama", items)}
        {renderGroup("Administrasi", adminItems)}

        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              F
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Fadhel Azka</p>
              <p className="text-xs text-slate-500">Mahasiswa</p>
            </div>
          </div>
          {renderGroup("Lainnya", bottomItems)}
        </div>
      </div>
    </aside>
  );
}