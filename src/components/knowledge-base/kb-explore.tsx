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
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(8);
            }}
            placeholder="Cari kode error, judul, atau tag… (mis. TypeError, segfault)"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
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
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                tingkat === t
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Result meta */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          {languageName ? `Knowledge base ${languageName}` : "Semua error"} ·{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span>{" "}
          pola ditemukan
        </span>
        <button
          onClick={() => {
            setQuery("");
            setTingkat("Semua");
            setShown(8);
          }}
          className="rounded-lg text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Reset filter
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-dark-card">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="font-medium text-slate-700 dark:text-slate-200">Tidak ada hasil ditemukan</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
                "overflow-hidden rounded-2xl border bg-white transition-colors dark:bg-dark-card",
                isOpen
                  ? "border-blue-500/40 shadow-lg shadow-blue-500/5"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
              )}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : id)}
                className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-red-500/10 p-2.5">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-red-500">{e.errorCode}</span>
                      {showLanguageFilter && (
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {e.language}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {e.title}
                    </h3>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      tingkatBadgeColor[e.tingkat]
                    )}
                  >
                    {e.tingkat}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-400 transition-transform",
                      isOpen && "rotate-180 text-blue-500"
                    )}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 p-5 dark:border-slate-800">
                  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {e.description}
                  </p>

                  <div className="mb-4 rounded-xl bg-green-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                      <Lightbulb className="h-4 w-4" /> Solusi
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                      {e.solution}
                    </p>
                  </div>

                  <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                    <code>{e.contoh}</code>
                  </pre>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400"
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