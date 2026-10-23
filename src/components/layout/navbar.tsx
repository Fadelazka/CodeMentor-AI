"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { UnderlineLink } from "@/components/ui/micro-interactions";

const navLinks = [
  { href: "/fitur", label: "Fitur" },
  { href: "/cara-kerja", label: "Cara Kerja" },
  { href: "/bahasa", label: "Bahasa" },
  { href: "/knowledge-base", label: "Pengetahuan" },
];

/** Container nav links:ascade dari atas dengan jeda antar item. */
const navStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.22 },
  },
};

/** Tiap item nav turun dari atas (bukan fade-in polos). */
const navItem: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26, mass: 0.6 },
  },
};

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
      initial={reduce ? false : { y: -72, opacity: 0 }}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      transition={
        reduce
          ? undefined
          : { type: "spring", stiffness: 220, damping: 26, mass: 0.8 }
      }
      className={cn(
        "fixed top-0 z-50 w-full bg-background transition-shadow",
        scrolled ? "border-b border-border shadow-[0_1px_0_0_hsl(var(--border))]" : "border-b border-transparent"
      )}
    >
      <nav className="container-editorial flex h-16 items-center justify-between gap-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={
            reduce ? undefined : { type: "spring", stiffness: 260, damping: 24, mass: 0.7 }
          }
          className="shrink-0"
        >
          <Link href="/" aria-label="Beranda CodeMentor AI">
            <Wordmark />
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={navStagger}
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={navItem}>
              <UnderlineLink
                href={link.href}
                active={isActive(link.href)}
                lineClassName="bg-accent"
                className={cn(
                  "font-mono text-xs font-medium uppercase tracking-wider transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </UnderlineLink>
            </motion.div>
          ))}
        </motion.div>

        <div className="hidden items-center gap-2 lg:flex">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={
              reduce
                ? undefined
                : { delay: 0.3, type: "spring", stiffness: 280, damping: 26, mass: 0.6 }
            }
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
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={navStagger}
          className="border-t border-border bg-background lg:hidden"
        >
          <div className="container-editorial flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={navItem}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-sm px-3 py-2.5 font-mono text-sm font-medium uppercase tracking-wider",
                    isActive(link.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
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
