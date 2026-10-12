"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/components/landing/animations";

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
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <motion.header
      initial={reduce ? false : { y: -40, opacity: 0 }}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full bg-background transition-shadow",
        scrolled ? "border-b border-border shadow-[0_1px_0_0_hsl(var(--border))]" : "border-b border-transparent"
      )}
    >
      <nav className="container-editorial flex h-16 items-center justify-between gap-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="shrink-0"
        >
          <Link href="/" aria-label="Beranda CodeMentor AI">
            <Wordmark />
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={staggerContainer}
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={fadeIn}>
              <Link
                href={link.href}
                className={cn(
                  "group relative font-mono text-xs font-medium uppercase tracking-wider transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="hidden items-center gap-2 lg:flex">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            <Link href="/masuk">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
              }
              whileHover={reduce ? undefined : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link href="/daftar">
                <Button size="sm">
                  Daftar
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-background lg:hidden"
        >
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
        </motion.div>
      )}
    </motion.header>
  );
}
