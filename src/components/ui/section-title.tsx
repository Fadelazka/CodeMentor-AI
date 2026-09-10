import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400",
          center && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}