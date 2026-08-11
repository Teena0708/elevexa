import { Sparkles, FileSearch } from "lucide-react";
import { useRouter } from "next/navigation";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function WelcomeHeader({ firstName }: { firstName: string }) {
  const router = useRouter();
  const greeting = getGreeting(new Date().getHours());

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ev-indigo">
          AI Interview Workspace
        </p>
        <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-white md:text-[36px]">
          {greeting}, {firstName}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ev-text-secondary md:text-[15px]">
          Track your interview preparation, identify weak areas, and improve with AI-powered practice.
        </p>
      </div>

      <div className="flex shrink-0 gap-2.5">
<button
  type="button"
  onClick={() => router.push("/resume")}
  className="inline-flex items-center gap-2 rounded-lg border border-ev-border bg-ev-surface px-4 py-2.5 text-sm font-medium text-ev-text transition-colors hover:bg-ev-surface-hover"
>
  <FileSearch className="h-4 w-4" strokeWidth={1.75} />
  Analyze Resume
</button>
    <button
  type="button"
  onClick={() => router.push("/mock-interview")}
  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-ev-indigo to-[#4f52e0] px-4 py-2.5 text-sm font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_4px_16px_-4px_rgba(99,102,241,0.5)] transition-transform hover:-translate-y-px active:translate-y-0"
>
  <Sparkles className="h-4 w-4" strokeWidth={1.75} />
  Start Mock Interview
</button>
      </div>
    </div>
  );
}
