import { Sparkles, FileSearch, MessageSquarePlus, History } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Action {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}

const ACTIONS: Action[] = [
  {
    icon: Sparkles,
    title: "Start Mock Interview",
    description: "Practice with 10 AI-generated questions",
    tone: "text-ev-indigo bg-ev-indigo/10",
  },
  {
    icon: FileSearch,
    title: "Analyze Resume",
    description: "Get an ATS and AI readiness score",
    tone: "text-ev-violet bg-ev-violet/10",
  },
  {
    icon: MessageSquarePlus,
    title: "Generate Interview",
    description: "Create questions for a specific role",
    tone: "text-ev-emerald bg-ev-emerald/10",
  },
  {
    icon: History,
    title: "View History",
    description: "Review past interviews and scores",
    tone: "text-ev-amber bg-ev-amber/10",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
      <h2 className="mb-4 text-[17px] font-semibold text-white">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ACTIONS.map((action) => (
          <button
            key={action.title}
            type="button"
            className="group flex items-start gap-3 rounded-lg border border-ev-border bg-ev-bg-elevated p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ev-border-strong hover:bg-ev-surface-hover"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${action.tone}`}>
              <action.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">{action.title}</p>
              <p className="mt-0.5 text-xs text-ev-text-tertiary">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
