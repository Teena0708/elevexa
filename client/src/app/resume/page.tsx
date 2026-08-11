"use client";

import { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
} from "lucide-react";
import { getToken } from "@/lib/auth/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface Analysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Please login again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        `${API_URL}/api/v1/resume/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Resume upload failed");
      }

      setAnalysis(result.data.analysis);
    } catch (err: any) {
      setError(err.message || "Unable to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-ev-indigo">
          <Sparkles className="h-4 w-4" />
          AI Resume Analyzer
        </div>

        <h1 className="text-2xl font-semibold text-ev-text">
          Analyze your resume
        </h1>

        <p className="mt-1 text-sm text-ev-muted">
          Upload your resume and get an AI-powered ATS and readiness analysis.
        </p>
      </div>

      {/* Upload Card */}
      {!analysis && (
        <div className="rounded-ev border border-ev-border bg-ev-surface p-6">
          <label
            htmlFor="resume"
            className="flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-ev-border bg-ev-surface-hover/40 px-6 text-center transition hover:border-ev-indigo/50"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-ev-indigo/10 text-ev-indigo">
              <Upload className="h-6 w-6" />
            </div>

            <h2 className="text-base font-semibold text-ev-text">
              Upload your resume
            </h2>

            <p className="mt-2 text-sm text-ev-muted">
              PDF files only
            </p>

            <span className="mt-4 rounded-lg bg-ev-indigo px-4 py-2 text-sm font-medium text-white">
              Choose PDF
            </span>

            <input
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                setError("");
              }}
            />
          </label>

          {file && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-ev-border bg-ev-surface-hover px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-ev-indigo" />

                <div>
                  <p className="text-sm font-medium text-ev-text">
                    {file.name}
                  </p>

                  <p className="text-xs text-ev-muted">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-ev-muted transition hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={!file || loading}
            onClick={handleUpload}
            className="mt-5 w-full rounded-lg bg-gradient-to-b from-ev-indigo to-[#4f52e0] px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing resume..." : "Analyze Resume"}
          </button>
        </div>
      )}

      {/* Analysis */}
      {analysis && (
        <div className="space-y-5">
          {/* Score */}
          <div className="rounded-ev border border-ev-border bg-ev-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ev-muted">
                  Resume Readiness Score
                </p>

                <p className="mt-2 text-4xl font-bold text-ev-text">
                  {analysis.score}
                  <span className="text-lg text-ev-muted">/100</span>
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ev-emerald/10 text-ev-emerald">
                <CheckCircle2 className="h-7 w-7" />
              </div>
            </div>
          </div>

          {/* Strengths */}
          <AnalysisSection
            title="Strengths"
            items={analysis.strengths}
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="text-ev-emerald bg-ev-emerald/10"
          />

          {/* Weaknesses */}
          <AnalysisSection
            title="Weaknesses"
            items={analysis.weaknesses}
            icon={<AlertTriangle className="h-5 w-5" />}
            tone="text-ev-amber bg-ev-amber/10"
          />

          {/* Missing Skills */}
          <AnalysisSection
            title="Missing Skills"
            items={analysis.missingSkills}
            icon={<FileText className="h-5 w-5" />}
            tone="text-ev-violet bg-ev-violet/10"
          />

          {/* Suggestions */}
          <AnalysisSection
            title="AI Suggestions"
            items={analysis.suggestions}
            icon={<Sparkles className="h-5 w-5" />}
            tone="text-ev-indigo bg-ev-indigo/10"
          />

          <button
            type="button"
            onClick={() => {
              setAnalysis(null);
              setFile(null);
            }}
            className="rounded-lg border border-ev-border bg-ev-surface px-4 py-2.5 text-sm font-medium text-ev-text hover:bg-ev-surface-hover"
          >
            Analyze another resume
          </button>
        </div>
      )}
    </div>
  );
}

function AnalysisSection({
  title,
  items,
  icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <div className="rounded-ev border border-ev-border bg-ev-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}
        >
          {icon}
        </div>

        <h2 className="font-semibold text-ev-text">
          {title}
        </h2>
      </div>

      <ul className="space-y-3">
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