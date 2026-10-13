import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo-mark";

export function Wordmark({
  className,
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" size={36} />
      {showLabel && (
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          CodeMentor<span className="font-mono text-xs text-[#FF3B6B]">_AI</span>
        </span>
      )}
    </div>
  );
}