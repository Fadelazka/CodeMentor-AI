import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-ink text-paper dark:bg-paper dark:text-ink">
        <span className="font-mono text-sm font-bold">&lt;/&gt;</span>
      </div>
      {showLabel && (
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          CodeMentor<span className="font-mono text-xs text-accent">_AI</span>
        </span>
      )}
    </div>
  );
}