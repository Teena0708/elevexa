"use client";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-gray-200 bg-white px-5 py-6 md:flex md:flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              E
            </div>

            <div>
              <h1 className="text-lg font-bold">Elevexa</h1>
              <p className="text-xs text-gray-500">AI Interview Prep</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-10 space-y-2">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Workspace
            </p>

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700">
              <span>▦</span>
              Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-50">
              <span>◉</span>
              Interviews
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-50">
              <span>▤</span>
              Resumes
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-50">
              <span>↗</span>
              Analytics
            </button>
          </nav>

          {/* Bottom navigation */}
          <div className="mt-auto space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-50">
              <span>⚙</span>
              Settings
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-50">
              <span>↪</span>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">

          {/* Top Header */}
          <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-10">
            <div>
              <p className="text-sm text-gray-500">
                Workspace
              </p>
              <h2 className="text-lg font-semibold">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4">

              {/* Notification */}
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
                🔔
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600" />
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">
                    Teena Yadav
                  </p>
                  <p className="text-xs text-gray-500">
                    Candidate
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  TY
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard */}
          <div className="px-6 py-8 lg:px-10">

            {/* Welcome */}
            <div className="mb-8">
              <p className="text-sm font-medium text-indigo-600">
                OVERVIEW
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Good afternoon, Teena
              </h1>

              <p className="mt-2 text-gray-500">
                Track your interview preparation and improve your performance.
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {/* Resume */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Total Resumes
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                      3
                    </h3>

                    <p className="mt-2 text-xs text-emerald-600">
                      ↑ Ready for analysis
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    📄
                  </div>
                </div>
              </div>

              {/* Interviews */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Total Interviews
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                      7
                    </h3>

                    <p className="mt-2 text-xs text-indigo-600">
                      AI generated
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-xl">
                    🎯
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Completed
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                      5
                    </h3>

                    <p className="mt-2 text-xs text-emerald-600">
                      ↑ 71% completion
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                    ✓
                  </div>
                </div>
              </div>

              {/* Average Score */}
              <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Average Score
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                      0
                      <span className="text-lg text-gray-400">
                        /10
                      </span>
                    </h3>

                    <p className="mt-2 text-xs text-gray-400">
                      Complete interviews to improve
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                    ★
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="mt-8 grid gap-6 xl:grid-cols-3">

              {/* Performance */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Interview Performance
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Your scores across recent interviews
                    </p>
                  </div>

                  <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                    Last 30 days
                  </button>
                </div>

                {/* Fake chart placeholder */}
                <div className="mt-8 flex h-64 items-end gap-4 rounded-xl bg-gray-50 p-6">

                  {[35, 55, 45, 70, 60, 80, 65, 90].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center justify-end gap-2"
                      >
                        <div
                          className="w-full max-w-10 rounded-t-lg bg-indigo-500 transition hover:bg-indigo-600"
                          style={{ height: `${height}%` }}
                        />

                        <span className="text-xs text-gray-400">
                          {index + 1}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Quick Action */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">

                <p className="text-sm font-medium text-indigo-100">
                  READY TO PRACTICE?
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Start a new AI interview
                </h2>

                <p className="mt-3 text-sm leading-6 text-indigo-100">
                  Practice realistic interview questions and receive
                  AI-powered feedback on every answer.
                </p>

                <button className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50">
                  Start Interview →
                </button>
              </div>
            </div>

            {/* Recent Interviews */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    Recent Interviews
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your latest interview activity
                  </p>
                </div>

                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View all →
                </button>
              </div>

              {/* Interview item */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6 transition hover:bg-gray-50">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                    💼
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      MERN Stack Developer
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Medium · 10 questions
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Completed
                  </span>

                  <p className="mt-2 text-sm font-semibold">
                    Score: 8/10
                  </p>
                </div>
              </div>

              {/* Empty state */}
              <div className="p-6 text-center text-sm text-gray-400">
                More interviews will appear here.
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}