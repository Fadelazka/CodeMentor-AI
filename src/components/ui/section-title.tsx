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
  center = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {eyebrow && <p className="kicker mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground",
          center && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}