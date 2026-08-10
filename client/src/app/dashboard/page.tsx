"use client";

import { useEffect, useState } from "react";
import { FileText, MessageSquare, CheckCircle2, Gauge } from "lucide-react";

import { getDashboardData } from "@/lib/api/dashboard";
import { getToken } from "@/lib/auth/auth";

import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { RecentInterviews } from "@/components/dashboard/RecentInterviews";
import { ResumeHealth } from "@/components/dashboard/ResumeHealth";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PreparationProgress } from "@/components/dashboard/PreparationProgress";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = getToken();

        if (!token) {
          setError("Please login again.");
          return;
        }

        const dashboardData = await getDashboardData(token);
        setData(dashboardData);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-ev-muted">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { stats } = data;

  return (
    <div className="space-y-6">
      {/* Welcome + Main Actions */}
      <div
        className="ev-animate-in"
        style={{ animationDelay: "20ms" }}
      >
        <WelcomeHeader firstName="Teena" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="ev-animate-in"
          style={{ animationDelay: "40ms" }}
        >
          <StatCard
            icon={FileText}
            title="Total Resumes"
            value={String(stats.totalResumes)}
            supportingText="Uploaded and analyzed"
            tone="indigo"
          />
        </div>

        <div
          className="ev-animate-in"
          style={{ animationDelay: "80ms" }}
        >
          <StatCard
            icon={MessageSquare}
            title="Total Interviews"
            value={String(stats.totalInterviews)}
            supportingText="Sessions started"
            tone="violet"
          />
        </div>

        <div
          className="ev-animate-in"
          style={{ animationDelay: "120ms" }}
        >
          <StatCard
            icon={CheckCircle2}
            title="Completed Interviews"
            value={String(stats.completedInterviews)}
            supportingText={`${stats.totalInterviews - stats.completedInterviews} in progress`}
            tone="emerald"
            trend={{ direction: "up", label: "+2 this week" }}
          />
        </div>

        <div
          className="ev-animate-in"
          style={{ animationDelay: "160ms" }}
        >
          <StatCard
            icon={Gauge}
            title="Average Score"
            value={`${Number(stats.averageScore).toFixed(1)} / 10`}
            supportingText="Across completed interviews"
            tone="amber"
            trend={{ direction: "up", label: "+0.6" }}
          />
        </div>
      </div>

      {/* Performance + AI Insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div
          className="ev-animate-in lg:col-span-2"
          style={{ animationDelay: "80ms" }}
        >
          <PerformanceChart data={data.performance} />
        </div>

        <div
          className="ev-animate-in"
          style={{ animationDelay: "120ms" }}
        >
          <AIInsights insight={data.insight} />
        </div>
      </div>

      {/* Recent Interviews */}
      <div
        className="ev-animate-in"
        style={{ animationDelay: "140ms" }}
      >
        <RecentInterviews interviews={data.recentInterviews} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="ev-animate-in">
          <ResumeHealth resume={data.resume} />
        </div>

        <div className="ev-animate-in">
          <QuickActions />
        </div>

        <div className="ev-animate-in">
          <PreparationProgress progress={data.progress} />
        </div>
      </div>
    </div>
  );
}