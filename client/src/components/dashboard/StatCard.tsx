import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Tone = "indigo" | "violet" | "emerald" | "amber";

const TONE_STYLES: Record<Tone, { icon: string; iconBg: string; trendUp: string; trendDown: string }> = {
  indigo: {
    icon: "text-ev-indigo",
    iconBg: "bg-ev-indigo/10",
    trendUp: "text-ev-emerald",
    trendDown: "text-ev-red",
  },
  violet: {
    icon: "text-ev-violet",
    iconBg: "bg-ev-violet/10",
    trendUp: "text-ev-emerald",
    trendDown: "text-ev-red",
  },
  emerald: {
    icon: "text-ev-emerald",
    iconBg: "bg-ev-emerald/10",
    trendUp: "text-ev-emerald",
    trendDown: "text-ev-red",
  },
  amber: {
    icon: "text-ev-amber",
    iconBg: "bg-ev-amber/10",
    trendUp: "text-ev-emerald",
    trendDown: "text-ev-red",
  },
};

export interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  supportingText: string;
  tone: Tone;
  trend?: { direction: "up" | "down"; label: string };
}

export function StatCard({ icon: Icon, title, value, supportingText, tone, trend }: StatCardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <div className="group rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card transition-all duration-200 hover:-translate-y-0.5 hover:border-ev-border-strong hover:shadow-ev-elevated">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", styles.iconBg)}>
          <Icon className={cn("h-[18px] w-[18px]", styles.icon)} strokeWidth={1.75} />
        </div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              trend.direction === "up" ? styles.trendUp : styles.trendDown
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2} />
            )}
            {trend.label}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-ev-text-secondary">{title}</p>
      <p className="font-data mt-1 text-[28px] font-semibold leading-none text-white">{value}</p>
      <p className="mt-2 text-xs text-ev-text-tertiary">{supportingText}</p>
    </div>
  );
}
