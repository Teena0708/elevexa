"use client";

import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ev-red/10">
        <AlertTriangle className="h-6 w-6 text-ev-red" strokeWidth={1.75} />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">Unable to load dashboard</h2>
      <p className="mt-1.5 max-w-sm text-sm text-ev-text-secondary">
        Something went wrong while loading your interview data.
      </p>
      {process.env.NODE_ENV === "development" && (
        <p className="mt-2 max-w-md text-xs text-ev-text-tertiary">{error.message}</p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-lg bg-ev-indigo px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4f52e0]"
      >
        Try again
      </button>
    </div>
  );
}
