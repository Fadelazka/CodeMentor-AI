import { cn } from "@/lib/utils";

export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
        {value}
      </div>
      <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}