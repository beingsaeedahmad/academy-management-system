"use client";

import {
  Award,
  BarChart3,
  CheckCircle2,
  Clock3,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page Header */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10">
                  <Award
                    size={19}
                    className="text-blue-400"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Academic Performance
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Student Results
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage student academic results, marks, grades, and overall
                performance from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-2xl border border-slate-800 bg-slate-950/50 px-5 py-3 sm:block">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Current Session
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  Academic Session
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Students */}
          <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70" />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total Students
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                  —
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Students with results
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <Users
                  size={20}
                  className="text-blue-400"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </article>

          {/* Published Results */}
          <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500 to-teal-500 opacity-70" />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Published Results
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                  —
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Completed results
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </article>

          {/* Pending Results */}
          <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500 to-orange-500 opacity-70" />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Pending Results
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                  —
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Results awaiting entry
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock3
                  size={20}
                  className="text-amber-400"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </article>

          {/* Average Performance */}
          <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-70" />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Average Performance
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                  —
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Overall average score
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <TrendingUp
                  size={20}
                  className="text-violet-400"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </article>
        </section>

        {/* Main Results Area */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <GraduationCap
                size={30}
                className="text-blue-400"
                strokeWidth={1.6}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Results Management
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Student results, filters, result entry, and academic performance
              records will appear here.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/50 px-4 py-2 text-xs text-slate-500">
              <BarChart3 size={14} />
              <span>Results module is being configured</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}