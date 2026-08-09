import { ArrowRight } from "lucide-react";
import type { InterviewRecord, InterviewStatus } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils/cn";
import { EmptyState } from "./EmptyState";

const STATUS_STYLES: Record<InterviewStatus, string> = {
  completed: "bg-ev-emerald/10 text-ev-emerald",
  in_progress: "bg-ev-amber/10 text-ev-amber",
  abandoned: "bg-ev-red/10 text-ev-red",
};

const STATUS_LABEL: Record<InterviewStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  abandoned: "Abandoned",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ScoreText({ score }: { score: number | null }) {
  if (score === null) return <span className="text-ev-text-tertiary">—</span>;
  const tone = score >= 8 ? "text-ev-emerald" : score >= 6 ? "text-ev-amber" : "text-ev-red";
  return (
    <span className={cn("font-data font-semibold", tone)}>
      {score.toFixed(1)}
      <span className="text-ev-text-tertiary">/10</span>
    </span>
  );
}

export function RecentInterviews({ interviews }: { interviews: InterviewRecord[] }) {
  if (interviews.length === 0) {
    return (
      <div className="rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
        <h2 className="mb-1 text-[17px] font-semibold text-white">Recent Interviews</h2>
        <EmptyState
          title="No interviews yet"
          description="Start your first AI mock interview and receive personalized feedback."
          actionLabel="Start Interview"
        />
      </div>
    );
  }

  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface shadow-ev-card">
      <div className="flex items-center justify-between p-5 pb-4 md:px-6 md:pt-6">
        <h2 className="text-[17px] font-semibold text-white">Recent Interviews</h2>
        <a href="/dashboard/interviews/history" className="text-sm font-medium text-ev-indigo hover:text-[#818cf8]">
          View all
        </a>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-ev-border text-left text-[11px] uppercase tracking-wide text-ev-text-tertiary">
              <th className="px-6 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">Difficulty</th>
              <th className="px-4 py-2.5 font-medium">Questions</th>
              <th className="px-4 py-2.5 font-medium">Score</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Date</th>
              <th className="px-6 py-2.5 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id} className="border-b border-ev-border last:border-0 transition-colors hover:bg-white/[0.02]">
                <td className="px-6 py-3.5 font-medium text-white">{interview.role}</td>
                <td className="px-4 py-3.5 text-ev-text-secondary">{interview.difficulty}</td>
                <td className="px-4 py-3.5 text-ev-text-secondary">{interview.questionCount} questions</td>
                <td className="px-4 py-3.5">
                  <ScoreText score={interview.score} />
                </td>
                <td className="px-4 py-3.5">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[interview.status])}>
                    {STATUS_LABEL[interview.status]}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-ev-text-secondary">{formatDate(interview.date)}</td>
                <td className="px-6 py-3.5 text-right">
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-ev-indigo hover:text-[#818cf8]">
                    View Report
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-ev-border md:hidden">
        {interviews.map((interview) => (
          <div key={interview.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-white">{interview.role}</p>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[interview.status])}>
                {STATUS_LABEL[interview.status]}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ev-text-secondary">
              <span>{interview.difficulty}</span>
              <span aria-hidden>·</span>
              <span>{interview.questionCount} questions</span>
              <span aria-hidden>·</span>
              <span>{formatDate(interview.date)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <ScoreText score={interview.score} />
              <button className="inline-flex items-center gap-1 text-sm font-medium text-ev-indigo">
                View Report
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
