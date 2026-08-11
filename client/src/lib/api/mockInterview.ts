import { getToken } from "@/lib/auth/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export interface MockQuestion {
  question: string;
  category: string;
  difficulty: string;
}

export interface StartMockResponse {
  sessionId: string;
  currentQuestion: number;
  totalQuestions: number;
  question: MockQuestion;
}

export interface AnswerResponse {
  score: number;
  feedback: string;
  completed: boolean;
  overallScore: number | null;
  report: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  } | null;
  nextQuestion: {
    questionNumber: number;
    totalQuestions: number;
    question: string;
  } | null;
}

async function request(
  endpoint: string,
  body: Record<string, string>
) {
  const token = getToken();

  if (!token) {
    throw new Error("Please login again.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result.data;
}

export async function startMockInterview(
  interviewId: string
): Promise<StartMockResponse> {
  return request("/api/v1/mock/start", {
    interviewId,
  });
}

export async function submitMockAnswer(
  sessionId: string,
  answer: string
): Promise<AnswerResponse> {
  return request("/api/v1/mock/answer", {
    sessionId,
    answer,
  });
}