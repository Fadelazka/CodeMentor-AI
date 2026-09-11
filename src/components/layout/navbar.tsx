"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Code2, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/fitur", label: "Fitur" },
  { href: "/cara-kerja", label: "Cara Kerja" },
  { href: "/bahasa", label: "Bahasa" },
  { href: "/knowledge-base", label: "Pengetahuan" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/80"
          : "bg-transparent"
      )}
    >
      <nav className="container-custom flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Code<span className="text-gradient">Mentor</span> AI
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Ganti tema"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link href="/masuk">
            <Button variant="ghost" size="sm">
              Masuk
            </Button>
          </Link>
          <Link href="/daftar">
            <Button size="sm">Daftar Gratis</Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <Link href="/masuk" className="flex-1">
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href="/daftar" className="flex-1">
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}