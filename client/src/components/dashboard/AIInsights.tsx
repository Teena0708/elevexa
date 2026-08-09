import { Sparkles, TrendingUp, TrendingDown, Target, ArrowRight } from "lucide-react";
import type { AIInsight } from "@/lib/types/dashboard";

export function AIInsights({ insight }: { insight: AIInsight }) {
  return (
    <div className="relative overflow-hidden rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
      {/* Ambient signature glow — quiet, not decorative noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ev-violet/10 blur-3xl"
      />

      <div className="relative flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ev-violet/10">
          <Sparkles className="h-3.5 w-3.5 text-ev-violet" strokeWidth={2} />
        </div>
        <h2 className="text-[17px] font-semibold text-white">AI Insights</h2>
        <span className="ev-pulse-dot ml-auto h-1.5 w-1.5 rounded-full bg-ev-emerald" aria-hidden />
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-ev-text-secondary">{insight.summary}</p>

      <dl className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-ev-border bg-ev-bg-elevated p-3">
          <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ev-text-tertiary">
            <TrendingUp className="h-3.5 w-3.5 text-ev-emerald" strokeWidth={2} />
            Strongest Area
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-white">{insight.strongestArea}</dd>
        </div>
        <div className="rounded-lg border border-ev-border bg-ev-bg-elevated p-3">
          <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ev-text-tertiary">
            <TrendingDown className="h-3.5 w-3.5 text-ev-amber" strokeWidth={2} />
            Needs Practice
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-white">{insight.needsPractice}</dd>
        </div>
        <div className="rounded-lg border border-ev-border bg-ev-bg-elevated p-3">
          <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ev-text-tertiary">
            <Target className="h-3.5 w-3.5 text-ev-indigo" strokeWidth={2} />
            Recommended Focus
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-white">{insight.recommendedFocus}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="group relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-ev-indigo transition-colors hover:text-[#818cf8]"
      >
        View detailed insights
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </div>
  );
}
