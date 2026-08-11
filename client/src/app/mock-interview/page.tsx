"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import {
  startMockInterview,
  submitMockAnswer,
  type StartMockResponse,
  type AnswerResponse,
} from "@/lib/api/mockInterview";

export default function MockInterviewPage() {
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("interviewId");

  const [session, setSession] = useState<StartMockResponse | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<AnswerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const startInterview = async () => {
    if (!interviewId) {
      setError("Interview ID is missing.");
      return;
    }

    try {
      setStarting(true);
      setError("");

      const result = await startMockInterview(interviewId);

      setSession(result);
    } catch (err: any) {
      setError(err.message || "Unable to start interview.");
    } finally {
      setStarting(false);
    }
  };

  const submitAnswer = async () => {
    if (!session) return;

    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await submitMockAnswer(
        session.sessionId,
        answer
      );

      setFeedback(result);
      setAnswer("");

      if (result.nextQuestion) {
        setSession({
          ...session,
          currentQuestion: result.nextQuestion.questionNumber,
          question: {
            question: result.nextQuestion.question,
            category: session.question.category,
            difficulty: session.question.difficulty,
          },
        });
      }
    } catch (err: any) {
      setError(err.message || "Unable to evaluate answer.");
    } finally {
      setLoading(false);
    }
  };

  /* No interview ID */
  if (!interviewId) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <div className="rounded-ev border border-ev-border bg-ev-surface p-8 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-ev-amber" />

          <h1 className="mt-4 text-xl font-semibold text-ev-text">
            Interview not selected
          </h1>

          <p className="mt-2 text-sm text-ev-muted">
            Please select an interview before starting a mock interview.
          </p>
        </div>
      </div>
    );
  }

  /* Before starting */
  if (!session) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <div className="rounded-ev border border-ev-border bg-ev-surface p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ev-indigo/10 text-ev-indigo">
            <Sparkles className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-ev-text">
            AI Mock Interview
          </h1>

          <p className="mt-2 text-sm leading-6 text-ev-muted">
            Practice with AI-generated interview questions and receive
            feedback on every answer.
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={startInterview}
            disabled={starting}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-ev-indigo to-[#4f52e0] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-px disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />

            {starting
              ? "Starting..."
              : "Start Mock Interview"}
          </button>
        </div>
      </div>
    );
  }

  /* Completed */
  if (feedback?.completed) {
    return (
      <div className="mx-auto max-w-4xl space-y-5 py-10">
        <div className="rounded-ev border border-ev-border bg-ev-surface p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-ev-emerald" />

          <h1 className="mt-4 text-2xl font-semibold text-ev-text">
            Interview Completed
          </h1>

          <p className="mt-3 text-sm text-ev-muted">
            Your overall interview score
          </p>

          <p className="mt-2 text-5xl font-bold text-ev-text">
            {feedback.overallScore}
            <span className="text-xl text-ev-muted">/100</span>
          </p>
        </div>

        <ReportSection
          title="Strengths"
          items={feedback.report?.strengths ?? []}
        />

        <ReportSection
          title="Weaknesses"
          items={feedback.report?.weaknesses ?? []}
        />

        <ReportSection
          title="Recommendations"
          items={feedback.report?.recommendations ?? []}
        />
      </div>
    );
  }

  /* Interview */
  return (
    <div className="mx-auto max-w-4xl space-y-5 py-8">
      <div>
        <div className="flex items-center gap-2 text-sm text-ev-indigo">
          <Sparkles className="h-4 w-4" />
          AI Mock Interview
        </div>

        <h1 className="mt-2 text-2xl font-semibold text-ev-text">
          Question {session.currentQuestion} of{" "}
          {session.totalQuestions}
        </h1>
      </div>

      <div className="rounded-ev border border-ev-border bg-ev-surface p-7">
        <div className="flex gap-2 text-xs text-ev-muted">
          <span>{session.question.category}</span>
          <span>•</span>
          <span>{session.question.difficulty}</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold leading-8 text-ev-text">
          {session.question.question}
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={8}
          className="mt-6 w-full resize-none rounded-lg border border-ev-border bg-ev-surface-hover p-4 text-sm text-ev-text outline-none transition focus:border-ev-indigo"
        />

        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {feedback && !feedback.completed && (
          <div className="mt-5 rounded-lg border border-ev-border bg-ev-surface-hover p-5">
            <p className="text-sm font-semibold text-ev-text">
              Previous answer score: {feedback.score}/100
            </p>

            <p className="mt-2 text-sm leading-6 text-ev-muted">
              {feedback.feedback}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={submitAnswer}
          disabled={loading}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-ev-indigo to-[#4f52e0] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          <Send className="h-4 w-4" />

          {loading ? "Evaluating..." : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}

function ReportSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface p-6">
      <h2 className="font-semibold text-ev-text">
        {title}
      </h2>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-lg bg-ev-surface-hover px-4 py-3 text-sm text-ev-text"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}