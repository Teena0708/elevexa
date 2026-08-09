import type { DashboardData } from "@/lib/types/dashboard";

// ============================================================
// Mock dashboard payload.
// This is the ONLY place mock values live. When
// GET /api/v1/dashboard/stats (and related endpoints) are
// wired up, replace the body of getDashboardData() in
// lib/api/dashboard.ts — no component needs to change.
// ============================================================

export const mockDashboardData: DashboardData = {
  user: { firstName: "Teena" },

  stats: {
    totalResumes: 3,
    totalInterviews: 7,
    completedInterviews: 5,
    averageScore: 8.2,
  },

  performance: [
    { label: "Jul 12", date: "2026-07-12", score: 6.1 },
    { label: "Jul 18", date: "2026-07-18", score: 6.8 },
    { label: "Jul 24", date: "2026-07-24", score: 7.0 },
    { label: "Jul 30", date: "2026-07-30", score: 7.4 },
    { label: "Aug 3", date: "2026-08-03", score: 7.9 },
    { label: "Aug 6", date: "2026-08-06", score: 8.2 },
  ],

  insight: {
    summary:
      "Your JavaScript fundamentals are improving, but React state management remains an area worth practicing.",
    strongestArea: "JavaScript",
    needsPractice: "React State Management",
    recommendedFocus: "React Hooks",
  },

  recentInterviews: [
    {
      id: "int_1",
      role: "MERN Stack Developer",
      difficulty: "Medium",
      questionCount: 10,
      score: 8.2,
      status: "completed",
      date: "2026-08-06",
    },
    {
      id: "int_2",
      role: "Frontend Engineer",
      difficulty: "Hard",
      questionCount: 10,
      score: 7.4,
      status: "completed",
      date: "2026-08-03",
    },
    {
      id: "int_3",
      role: "Backend Engineer (Node.js)",
      difficulty: "Medium",
      questionCount: 10,
      score: 7.9,
      status: "completed",
      date: "2026-07-30",
    },
    {
      id: "int_4",
      role: "Full Stack Developer",
      difficulty: "Easy",
      questionCount: 10,
      score: null,
      status: "in_progress",
      date: "2026-07-26",
    },
    {
      id: "int_5",
      role: "React Developer",
      difficulty: "Medium",
      questionCount: 10,
      score: 6.8,
      status: "completed",
      date: "2026-07-18",
    },
  ],

  resume: {
    fileName: "Teena_Yadav_Resume.pdf",
    atsScore: 78,
    aiScore: 7,
    skillsDetected: ["C++", "JavaScript", "React", "Node.js", "MongoDB"],
    missingSkills: ["Cloud", "Git", "System Design"],
    updatedAt: "2026-08-01",
  },

  progress: {
    overallPercent: 68,
    skills: [
      { skill: "JavaScript", percent: 82 },
      { skill: "React", percent: 64 },
      { skill: "Node.js", percent: 71 },
      { skill: "MongoDB", percent: 58 },
    ],
  },
};
