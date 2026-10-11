"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";

const navLinks = [
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
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-background transition-shadow",
        scrolled ? "border-b border-border shadow-[0_1px_0_0_hsl(var(--border))]" : "border-b border-transparent"
      )}
    >
      <nav className="container-editorial flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Beranda CodeMentor AI">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-xs font-medium uppercase tracking-wider transition-colors",
                isActive(link.href)
                  ? "text-foreground underline decoration-accent decoration-2 underline-offset-8"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer rounded-sm p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Ganti tema"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/masuk">
            <Button variant="ghost" size="sm">
              Masuk
            </Button>
          </Link>
          <Link href="/daftar">
            <Button size="sm">
              Daftar
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Ganti tema"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className="cursor-pointer rounded-sm p-2 text-foreground hover:bg-muted lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-editorial flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-sm px-3 py-2.5 font-mono text-sm font-medium uppercase tracking-wider",
                  isActive(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3 border-t border-border pt-4">
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