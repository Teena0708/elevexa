import { FileText, MessageSquare, CheckCircle2, Gauge } from "lucide-react";
import { getDashboardData } from "@/lib/api/dashboard";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { RecentInterviews } from "@/components/dashboard/RecentInterviews";
import { ResumeHealth } from "@/components/dashboard/ResumeHealth";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PreparationProgress } from "@/components/dashboard/PreparationProgress";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const { stats } = data;

  return (
    <div className="space-y-6">
      <div className="ev-animate-in">
        <WelcomeHeader firstName={data.user.firstName} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="ev-animate-in" style={{ animationDelay: "40ms" }}>
          <StatCard
            icon={FileText}
            title="Total Resumes"
            value={String(stats.totalResumes)}
            supportingText="Uploaded and analyzed"
            tone="indigo"
          />
        </div>
        <div className="ev-animate-in" style={{ animationDelay: "80ms" }}>
          <StatCard
            icon={MessageSquare}
            title="Total Interviews"
            value={String(stats.totalInterviews)}
            supportingText="Sessions started"
            tone="violet"
          />
        </div>
        <div className="ev-animate-in" style={{ animationDelay: "120ms" }}>
          <StatCard
            icon={CheckCircle2}
            title="Completed Interviews"
            value={String(stats.completedInterviews)}
            supportingText={`${stats.totalInterviews - stats.completedInterviews} in progress`}
            tone="emerald"
            trend={{ direction: "up", label: "+2 this week" }}
          />
        </div>
        <div className="ev-animate-in" style={{ animationDelay: "160ms" }}>
          <StatCard
            icon={Gauge}
            title="Average Score"
            value={`${stats.averageScore.toFixed(1)} / 10`}
            supportingText="Across completed interviews"
            tone="amber"
            trend={{ direction: "up", label: "+0.6" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="ev-animate-in lg:col-span-2" style={{ animationDelay: "80ms" }}>
          <PerformanceChart data={data.performance} />
        </div>
        <div className="ev-animate-in" style={{ animationDelay: "120ms" }}>
          <AIInsights insight={data.insight} />
        </div>
      </div>

      <div className="ev-animate-in">
        <RecentInterviews interviews={data.recentInterviews} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="ev-animate-in lg:col-span-1">
          <ResumeHealth resume={data.resume} />
        </div>
        <div className="ev-animate-in lg:col-span-1">
          <QuickActions />
        </div>
        <div className="ev-animate-in lg:col-span-1">
          <PreparationProgress progress={data.progress} />
        </div>
      </div>
    </div>
  );
}
