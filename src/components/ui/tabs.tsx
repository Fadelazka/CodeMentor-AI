"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface TabsContextType {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType>({ value: "", setValue: () => {} });

export function Tabs({ defaultValue, value, onValueChange, className, children }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const currentValue = value ?? internal;

  const setValue = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: current, setValue } = React.useContext(TabsContext);
  const active = current === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: current } = React.useContext(TabsContext);
  if (current !== value) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
}