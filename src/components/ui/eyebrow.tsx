import { cn } from "@/lib/utils";

export function Eyebrow({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn("kicker flex items-center gap-3", className)}>
      {index && <span className="text-accent">{index}</span>}
      {label}
      <span className="h-px w-10 bg-border" />
    </p>
  );
}