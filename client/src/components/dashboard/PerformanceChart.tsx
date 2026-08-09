"use client";

import { useMemo, useState } from "react";
import type { PerformancePoint, TimeRange } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils/cn";

const RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "all", label: "All time" },
];

const RANGE_DAYS: Record<TimeRange, number | null> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  all: null,
};

const CHART_W = 640;
const CHART_H = 220;
const PAD_X = 8;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

function buildPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

export function PerformanceChart({ data }: { data: PerformancePoint[] }) {
  const [range, setRange] = useState<TimeRange>("30d");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const days = RANGE_DAYS[range];
    if (days === null) return data;
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const inRange = data.filter((d) => new Date(d.date).getTime() >= cutoff);
    return inRange.length > 0 ? inRange : data;
  }, [data, range]);

  const geometry = useMemo(() => {
    const scores = filtered.map((d) => d.score);
    const min = Math.min(...scores, 0);
    const max = Math.max(...scores, 10);
    const usableW = CHART_W - PAD_X * 2;
    const usableH = CHART_H - PAD_TOP - PAD_BOTTOM;

    const points = filtered.map((d, i) => {
      const x = PAD_X + (filtered.length === 1 ? usableW / 2 : (i / (filtered.length - 1)) * usableW);
      const y = PAD_TOP + usableH - ((d.score - min) / (max - min || 1)) * usableH;
      return { x, y, ...d };
    });

    const linePath = buildPath(points);
    const areaPath =
      points.length > 0
        ? `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${CHART_H - PAD_BOTTOM} L ${points[0].x.toFixed(2)} ${CHART_H - PAD_BOTTOM} Z`
        : "";

    return { points, linePath, areaPath };
  }, [filtered]);

  const hovered = hoverIndex !== null ? geometry.points[hoverIndex] : null;

  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[17px] font-semibold text-white">Interview Performance</h2>
          <p className="mt-1 text-sm text-ev-text-secondary">
            Track how your interview scores change over time.
          </p>
        </div>

        <div className="flex gap-1 rounded-lg border border-ev-border bg-ev-bg-elevated p-1">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRange(opt.value)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                range === opt.value
                  ? "bg-ev-indigo/15 text-ev-indigo"
                  : "text-ev-text-tertiary hover:text-ev-text-secondary"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex h-[220px] items-center justify-center text-sm text-ev-text-tertiary">
          Not enough data for this range yet.
        </div>
      ) : (
        <div className="relative mt-5">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="w-full overflow-visible"
            role="img"
            aria-label="Line chart of interview scores over time"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <defs>
              <linearGradient id="ev-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ev-indigo)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--ev-indigo)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gridlines */}
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                x1={PAD_X}
                x2={CHART_W - PAD_X}
                y1={PAD_TOP + f * (CHART_H - PAD_TOP - PAD_BOTTOM)}
                y2={PAD_TOP + f * (CHART_H - PAD_TOP - PAD_BOTTOM)}
                stroke="var(--ev-border)"
                strokeWidth="1"
              />
            ))}

            <path d={geometry.areaPath} fill="url(#ev-area-fill)" />
            <path
              d={geometry.linePath}
              fill="none"
              stroke="var(--ev-indigo)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="[stroke-dasharray:1] [stroke-dashoffset:1] animate-[ev-draw-line_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            />

            {geometry.points.map((p, i) => (
              <g key={p.date}>
                <rect
                  x={p.x - 12}
                  y={0}
                  width={24}
                  height={CHART_H}
                  fill="transparent"
                  onMouseEnter={() => setHoverIndex(i)}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoverIndex === i ? 4.5 : 3}
                  fill="var(--ev-bg-elevated)"
                  stroke="var(--ev-indigo)"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            ))}
          </svg>

          {hovered && (
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-ev-border-strong bg-ev-bg-elevated px-2.5 py-1.5 text-xs shadow-ev-elevated"
              style={{
                left: `${(hovered.x / CHART_W) * 100}%`,
                top: `${(hovered.y / CHART_H) * 100 - 4}%`,
              }}
            >
              <p className="text-ev-text-tertiary">{hovered.label}</p>
              <p className="font-data font-semibold text-white">{hovered.score.toFixed(1)} / 10</p>
            </div>
          )}

          <div className="mt-2 flex justify-between text-[11px] text-ev-text-tertiary">
            {geometry.points.map((p) => (
              <span key={p.date}>{p.label}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
