"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileJson, FileSpreadsheet, type LucideIcon } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import toast from "react-hot-toast";

interface ExportDropdownProps {
  language?: string;
  searchQuery?: string;
}

type ExportFormat = "csv" | "json";

const OPTIONS: {
  format: ExportFormat;
  label: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    format: "csv",
    label: "Export CSV",
    desc: "Buka di Excel / Google Sheets",
    icon: FileSpreadsheet,
  },
  {
    format: "json",
    label: "Export JSON",
    desc: "Untuk backup atau developer",
    icon: FileJson,
  },
];

export function ExportDropdown({ language = "all", searchQuery = "" }: ExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(format);
    try {
      const params = new URLSearchParams({ format, language, q: searchQuery });
      const res = await fetch(`/api/history/export?${params.toString()}`);
      if (!res.ok) throw new Error(`Export gagal (${res.status})`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `codementor-riwayat-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Riwayat berhasil di-export ke ${format.toUpperCase()}`);
      setIsOpen(false);
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Gagal mengekspor riwayat.");
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <GradientButton
        variant="outline"
        icon={Download}
        loading={!!isExporting}
        disabled={!!isExporting}
        onClick={() => setIsOpen((o) => !o)}
      >
        {isExporting ? "Meng-export..." : "Ekspor"}
      </GradientButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40 dark:border-white/[0.08] dark:bg-[#0A0B14] dark:shadow-black/40"
          >
            {OPTIONS.map(({ format, label, desc, icon: Icon }) => (
              <button
                key={format}
                type="button"
                onClick={() => handleExport(format)}
                disabled={!!isExporting}
                className="flex w-full items-start gap-3 border-b border-slate-200 px-4 py-3 text-left transition-colors last:border-0 hover:bg-slate-100 disabled:opacity-50 dark:border-white/[0.04] dark:hover:bg-white/[0.04]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF3B6B]/10">
                  <Icon className="h-4 w-4 text-[#FF3B6B]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-slate-900 dark:text-white">{label}</span>
                  <span className="mt-0.5 block text-xs text-slate-500 dark:text-white/40">{desc}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
