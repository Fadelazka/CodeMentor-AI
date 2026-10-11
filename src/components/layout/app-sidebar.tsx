"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  History,
  Shield,
  ArrowUpRight,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "Chat AI", icon: MessageSquare },
  { href: "/riwayat", label: "Riwayat", icon: History },
];

const adminItems = [
  { href: "/admin", label: "Admin", icon: Shield },
];

export function AppSidebar() {
  const pathname = usePathname();

  const renderGroup = (links: typeof items) => (
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
              "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-ink text-paper font-medium dark:bg-paper dark:text-ink"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-mono text-xs uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-border bg-background lg:block">
      <div className="flex h-full flex-col overflow-y-auto px-3 pt-20 pb-4">
        <div className="mb-6">
          <p className="kicker mb-2 px-3">MENU</p>
          {renderGroup(items)}
        </div>
        <div className="mb-6">
          <p className="kicker mb-2 px-3">ADMIN</p>
          {renderGroup(adminItems)}
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-mono text-xs uppercase tracking-wider">Beranda</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}