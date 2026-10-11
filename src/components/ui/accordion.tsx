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
    <div className="w-full divide-y divide-border border-y border-border">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="group flex w-full cursor-pointer items-center justify-between py-5 text-left"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-base font-medium text-foreground transition-colors group-hover:text-accent sm:text-lg">
                {item.title}
              </span>
            </div>
            <svg
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                openIndex === index && "rotate-180 text-accent"
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
            <div className="pb-5 pl-0 text-sm leading-relaxed text-muted-foreground sm:pl-10">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}