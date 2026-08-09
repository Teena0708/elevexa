import type { PreparationProgress as ProgressType } from "@/lib/types/dashboard";

function toneForPercent(percent: number) {
  if (percent >= 75) return "bg-ev-emerald";
  if (percent >= 50) return "bg-ev-indigo";
  return "bg-ev-amber";
}

export function PreparationProgress({ progress }: { progress: ProgressType }) {
  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-semibold text-white">Interview Preparation</h2>
        <span className="font-data text-sm font-semibold text-white">{progress.overallPercent}%</span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ev-bg-elevated">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ev-indigo to-ev-violet transition-[width] duration-700 ease-out"
          style={{ width: `${progress.overallPercent}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-ev-text-tertiary">Overall progress</p>

      <div className="mt-5 space-y-4">
        {progress.skills.map((skill) => (
          <div key={skill.skill}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-ev-text-secondary">{skill.skill}</span>
              <span className="font-data text-white">{skill.percent}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ev-bg-elevated">
              <div
                className={`h-full rounded-full transition-[width] duration-700 ease-out ${toneForPercent(skill.percent)}`}
                style={{ width: `${skill.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
