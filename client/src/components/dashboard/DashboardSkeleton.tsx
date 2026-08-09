function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-ev-surface-hover ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Shimmer className="h-3 w-40" />
          <Shimmer className="h-9 w-64" />
          <Shimmer className="h-4 w-80" />
        </div>
        <Shimmer className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-ev border border-ev-border bg-ev-surface p-5">
            <Shimmer className="h-9 w-9 rounded-lg" />
            <Shimmer className="mt-4 h-3 w-20" />
            <Shimmer className="mt-2 h-7 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-ev border border-ev-border bg-ev-surface p-6 lg:col-span-2">
          <Shimmer className="h-5 w-48" />
          <Shimmer className="mt-5 h-[220px] w-full" />
        </div>
        <div className="rounded-ev border border-ev-border bg-ev-surface p-6">
          <Shimmer className="h-5 w-32" />
          <Shimmer className="mt-4 h-16 w-full" />
          <Shimmer className="mt-3 h-16 w-full" />
        </div>
      </div>

      <div className="rounded-ev border border-ev-border bg-ev-surface p-6">
        <Shimmer className="h-5 w-40" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="mt-3 h-10 w-full" />
        ))}
      </div>
    </div>
  );
}
