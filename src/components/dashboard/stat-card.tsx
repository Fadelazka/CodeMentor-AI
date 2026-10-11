import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: LucideIcon;
  iconBg: string;
}

export function StatCard({ title, value, change, changePositive, icon: Icon, iconBg }: StatCardProps) {
  return (
    <div className="card-custom p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-sm", iconBg)}>
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
        <span
          className={cn(
            "inline-flex items-center gap-1",
            changePositive ? "text-success" : "text-accent"
          )}
        >
          {changePositive ? "↑" : "↓"} {change}
        </span>
        <span className="ml-2">dibanding minggu lalu</span>
      </div>
    </div>
  );
}