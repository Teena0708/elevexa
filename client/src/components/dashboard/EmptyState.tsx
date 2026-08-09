import { Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ev-border py-10 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ev-bg-elevated">
        <Icon className="h-5 w-5 text-ev-text-tertiary" strokeWidth={1.5} />
      </div>
      <p className="mt-3 text-sm font-medium text-white">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-ev-text-tertiary">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center rounded-lg bg-ev-indigo/10 px-3.5 py-2 text-xs font-medium text-ev-indigo transition-colors hover:bg-ev-indigo/15"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
