"use client";

import * as React from "react";
import { Search, ChevronDown, Lightbulb, AlertTriangle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KbEntry } from "@/data/knowledge-base";
import { tingkatBadgeColor } from "@/data/knowledge-base";

interface KbExploreProps {
  entries: KbEntry[];
  showLanguageFilter?: boolean;
  languageName?: string;
}

const tingkatOptions = ["Semua", "Mudah", "Sedang", "Sulit"] as const;

export function KbExplore({ entries, showLanguageFilter = false, languageName }: KbExploreProps) {
  const [query, setQuery] = React.useState("");
  const [tingkat, setTingkat] = React.useState<(typeof tingkatOptions)[number]>("Semua");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [shown, setShown] = React.useState(8);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchTingkat = tingkat === "Semua" || e.tingkat === tingkat;
      if (!matchTingkat) return false;
      if (!q) return true;
      return (
        e.errorCode.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)) ||
        e.solution.toLowerCase().includes(q)
      );
    });
  }, [entries, query, tingkat]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(8);
            }}
            placeholder="Cari kode error, judul, atau tag… (mis. TypeError, segfault)"
            className="w-full rounded-sm border border-input bg-transparent py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ring/20 dark:focus:border-paper"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tingkatOptions.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTingkat(t);
                setShown(8);
              }}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                tingkat === t
                  ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Result meta */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>
          {languageName ? `KB ${languageName}` : "Semua error"} ·{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          pola ditemukan
        </span>
        <button
          onClick={() => {
            setQuery("");
            setTingkat("Semua");
            setShown(8);
          }}
          className="cursor-pointer text-accent transition-colors hover:underline"
        >
          Reset filter
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4">
        {filtered.length === 0 && (
          <div className="rounded-sm border border-border bg-card p-12 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" strokeWidth={1.5} />
            <p className="font-medium text-foreground">Tidak ada hasil ditemukan</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Coba kata kunci lain, misalnya nama exception (IndexError, segfault) atau topik (array, memori).
            </p>
          </div>
        )}

        {filtered.slice(0, shown).map((e) => {
          const id = `${e.language}:${e.errorCode}`;
          const isOpen = openId === id;
          return (
            <div
              key={id}
              className={cn(
                "overflow-hidden rounded-sm border bg-card transition-colors",
                isOpen
                  ? "border-foreground"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : id)}
                className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-sm bg-accent/10 p-2.5">
                    <AlertTriangle className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-accent">{e.errorCode}</span>
                      {showLanguageFilter && (
                        <span className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {e.language}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-sm font-semibold text-foreground">
                      {e.title}
                    </h3>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={cn(
                      "rounded-sm px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                      tingkatBadgeColor[e.tingkat]
                    )}
                  >
                    {e.tingkat}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isOpen && "rotate-180 text-foreground"
                    )}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border p-5">
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {e.description}
                  </p>

                  <div className="mb-4 rounded-sm border border-success/20 bg-success/5 p-4">
                    <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-success">
                      <Lightbulb className="h-4 w-4" /> Solusi
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {e.solution}
                    </p>
                  </div>

                  <pre className="overflow-x-auto rounded-sm bg-ink p-4 text-xs leading-relaxed text-paper">
                    <code>{e.contoh}</code>
                  </pre>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length > shown && (
        <div className="text-center">
          <button
            onClick={() => setShown((s) => s + 8)}
            className="btn-secondary"
          >
            Tampilkan lebih banyak ({filtered.length - shown} tersisa)
          </button>
        </div>
      )}
    </div>
  );
}