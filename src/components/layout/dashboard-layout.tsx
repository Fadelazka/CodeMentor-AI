"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, MobileSidebar, useSidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useSettings } from "@/contexts/SettingsContext";
import { cn } from "@/lib/utils";

function Shell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const { resolvedTheme } = useSettings();

  return (
    <div
      className={cn(
        "dashboard-shell dashboard-grid-bg relative min-h-screen",
        // HAPUS "text-white" di sini agar tidak menimpa warna teks komponen lain
        resolvedTheme === "dark" ? "dark" : "theme-light"
      )}
    >
      <Sidebar />
      <MobileSidebar />
      <div
        className={cn(
          "relative flex min-h-screen flex-col transition-[padding-left] duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        )}
      >
        <Topbar />
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Shell>{children}</Shell>
    </SidebarProvider>
  );
}