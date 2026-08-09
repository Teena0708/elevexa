// ============================================================
// Elevexa — Dashboard domain types
// Single source of truth for shapes shared across dashboard
// components. Mirrors the eventual API response contracts.
// ============================================================

export interface DashboardStats {
  totalResumes: number;
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number; // out of 10
}

export type TimeRange = "7d" | "30d" | "90d" | "all";

export interface PerformancePoint {
  label: string; // e.g. "Aug 1" or interview #
  date: string; // ISO date
  score: number; // out of 10
}

export interface AIInsight {
  summary: string;
  strongestArea: string;
  needsPractice: string;
  recommendedFocus: string;
}

export type InterviewStatus = "completed" | "in_progress" | "abandoned";
export type InterviewDifficulty = "Easy" | "Medium" | "Hard";

export interface InterviewRecord {
  id: string;
  role: string;
  difficulty: InterviewDifficulty;
  questionCount: number;
  score: number | null; // null if not completed
  status: InterviewStatus;
  date: string; // ISO date
}

export interface ResumeHealth {
  fileName: string;
  atsScore: number; // out of 100
  aiScore: number; // out of 10
  skillsDetected: string[];
  missingSkills: string[];
  updatedAt: string;
}

export interface SkillProgress {
  skill: string;
  percent: number;
}

export interface PreparationProgress {
  overallPercent: number;
  skills: SkillProgress[];
}

export interface DashboardData {
  user: { firstName: string };
  stats: DashboardStats;
  performance: PerformancePoint[];
  insight: AIInsight;
  recentInterviews: InterviewRecord[];
  resume: ResumeHealth | null;
  progress: PreparationProgress;
}
