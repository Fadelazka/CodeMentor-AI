"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="w-full space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "overflow-hidden rounded-xl border transition-all",
            openIndex === index
              ? "border-blue-500/50 bg-white shadow-lg shadow-blue-500/5 dark:bg-dark-card"
              : "border-slate-200 bg-white dark:border-slate-800 dark:bg-dark-card"
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {item.title}
            </span>
            <svg
              className={cn(
                "h-5 w-5 shrink-0 text-slate-500 transition-transform",
                openIndex === index && "rotate-180 text-blue-500"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}