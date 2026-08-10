"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "@/lib/api/auth";
import { saveAuth } from "@/lib/auth/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      saveAuth(data.token, data.user);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ev-bg px-6 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-ev border border-ev-border bg-ev-surface p-8 shadow-xl">
          <div className="mb-8">
            <p className="text-sm font-semibold tracking-wide text-ev-primary">
              ELEVEXA
            </p>

            <h1 className="mt-3 text-3xl font-bold text-ev-text">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-ev-text-muted">
              Sign in to continue your interview preparation.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ev-text"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-ev-border bg-ev-surface-hover px-4 py-3 text-sm text-ev-text outline-none transition focus:border-ev-primary"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-ev-text"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-ev-border bg-ev-surface-hover px-4 py-3 text-sm text-ev-text outline-none transition focus:border-ev-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-ev-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ev-text-muted">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-ev-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}