import { FileText, ArrowRight, Check, X } from "lucide-react";
import type { ResumeHealth as ResumeHealthType } from "@/lib/types/dashboard";
import { EmptyState } from "./EmptyState";

function ScoreRing({ percent, label }: { percent: number; label: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const tone = percent >= 75 ? "var(--ev-emerald)" : percent >= 50 ? "var(--ev-amber)" : "var(--ev-red)";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--ev-border)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="font-data -mt-11 text-sm font-semibold text-white">{percent}</span>
      <span className="mt-9 text-[11px] text-ev-text-tertiary">{label}</span>
    </div>
  );
}

export function ResumeHealth({ resume }: { resume: ResumeHealthType | null }) {
  if (!resume) {
    return (
      <div className="rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
        <h2 className="mb-1 text-[17px] font-semibold text-white">Resume Health</h2>
        <EmptyState
          title="No resumes yet"
          description="Upload a resume to get an ATS score, skill gaps, and AI feedback."
          actionLabel="Upload Resume"
        />
      </div>
    );
  }

  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface p-5 shadow-ev-card md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ev-indigo/10">
          <FileText className="h-[18px] w-[18px] text-ev-indigo" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold text-white">Resume Health</h2>
          <p className="truncate text-sm text-ev-text-secondary">{resume.fileName}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-around rounded-lg border border-ev-border bg-ev-bg-elevated py-4">
        <ScoreRing percent={resume.atsScore} label="ATS Score" />
        <ScoreRing percent={resume.aiScore * 10} label="AI Score /10" />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ev-text-tertiary">Skills Detected</p>
        <div className="flex flex-wrap gap-1.5">
          {resume.skillsDetected.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full bg-ev-emerald/10 px-2.5 py-1 text-xs font-medium text-ev-emerald"
            >
              <Check className="h-3 w-3" strokeWidth={2.5} />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ev-text-tertiary">Missing Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {resume.missingSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full bg-ev-red/10 px-2.5 py-1 text-xs font-medium text-ev-red"
            >
              <X className="h-3 w-3" strokeWidth={2.5} />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="group mt-5 inline-flex items-center gap-1 text-sm font-medium text-ev-indigo hover:text-[#818cf8]"
      >
        View Resume Analysis
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </div>
  );
}
