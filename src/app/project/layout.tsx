"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClipboardList, FileText, GitBranch, Calendar, Wallet, ShieldAlert, Table2, Users } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const docsNav = [
  { href: "/project/overview", label: "Overview", icon: ClipboardList },
  { href: "/project/charter", label: "Project Charter", icon: FileText },
  { href: "/project/wbs", label: "WBS", icon: GitBranch },
  { href: "/project/jadwal", label: "Jadwal", icon: Calendar },
  { href: "/project/anggaran", label: "Anggaran", icon: Wallet },
  { href: "/project/risiko", label: "Risiko", icon: ShieldAlert },
  { href: "/project/raci", label: "RACI", icon: Table2 },
  { href: "/project/tim", label: "Tim", icon: Users },
];

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <div className="pt-16">
        <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="container-custom flex gap-1 overflow-x-auto py-3">
            {docsNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}