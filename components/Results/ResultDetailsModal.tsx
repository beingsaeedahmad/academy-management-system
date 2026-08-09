"use client";

import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  X,
} from "lucide-react";

import type { ResultRow } from "./ResultsTable";

interface ResultDetailsModalProps {
  open: boolean;
  result: ResultRow | null;
  onClose: () => void;
}

function getGrade(percentage: number) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function getGradeLabel(percentage: number) {
  if (percentage >= 90) return "Outstanding";
  if (percentage >= 80) return "Excellent";
  if (percentage >= 70) return "Very Good";
  if (percentage >= 60) return "Good";
  if (percentage >= 50) return "Satisfactory";
  return "Needs Improvement";
}

export default function ResultDetailsModal({
  open,
  result,
  onClose,
}: ResultDetailsModalProps) {
  if (!open || !result) {
    return null;
  }

  const percentage =
    result.totalMarks > 0
      ? (result.obtainedMarks / result.totalMarks) * 100
      : 0;

  const grade = getGrade(percentage);
  const gradeLabel = getGradeLabel(percentage);

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          max-h-[90vh]
          w-full max-w-2xl
          overflow-y-auto
          rounded-3xl
          border border-slate-800
          bg-[#0b1220]
          shadow-2xl
          shadow-black/50
        "
      >
        {/* Top Accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <Award
                size={21}
                className="text-blue-400"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Result Details
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Complete academic performance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              text-slate-500
              transition-all
              hover:bg-slate-800
              hover:text-white
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Student Card */}
          <div
            className="
              relative overflow-hidden
              rounded-2xl
              border border-slate-800
              bg-gradient-to-br
              from-slate-900
              to-slate-950
              p-5
            "
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="relative flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10">
                <GraduationCap
                  size={26}
                  className="text-blue-400"
                  strokeWidth={1.7}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-white">
                  {result.studentName}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs text-slate-500">
                    Roll No. {result.rollNumber}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-slate-700" />

                  <span className="text-xs text-slate-500">
                    {result.className}
                  </span>
                </div>
              </div>

              <div
                className="
                  hidden
                  rounded-xl
                  border border-emerald-500/20
                  bg-emerald-500/10
                  px-3 py-2
                  sm:block
                "
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-xs font-medium text-emerald-400">
                    {result.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Information */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2">
                <BookOpen
                  size={15}
                  className="text-sky-400"
                />

                <span className="text-[11px] text-slate-600">
                  Subject
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-300">
                {result.subject}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2">
                <Award
                  size={15}
                  className="text-violet-400"
                />

                <span className="text-[11px] text-slate-600">
                  Examination
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-300">
                {result.exam}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={15}
                  className="text-cyan-400"
                />

                <span className="text-[11px] text-slate-600">
                  Session
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-300">
                2026
              </p>
            </div>
          </div>

          {/* Performance */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Overall Performance
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Academic result summary
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight text-white">
                  {percentage.toFixed(1)}%
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {gradeLabel}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-600">
                  Progress
                </span>

                <span className="text-[11px] font-medium text-slate-500">
                  {result.obtainedMarks} / {result.totalMarks}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      Math.max(percentage, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Marks + Grade */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5">
              <p className="text-xs text-slate-600">
                Obtained Marks
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {result.obtainedMarks}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                out of {result.totalMarks}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5">
              <p className="text-xs text-slate-600">
                Percentage
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {percentage.toFixed(1)}%
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                overall score
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] p-5">
              <p className="text-xs text-slate-600">
                Grade
              </p>

              <p className="mt-2 text-2xl font-bold text-violet-400">
                {grade}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                {gradeLabel}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-950/30 px-5 py-4">
            <div>
              <p className="text-xs text-slate-600">
                Result Status
              </p>

              <p className="mt-1 text-sm font-medium text-slate-300">
                {result.status}
              </p>
            </div>

            <div
              className={`
                rounded-xl px-3 py-2 text-xs font-medium
                ${
                  result.status === "Published"
                    ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : result.status === "Pending"
                      ? "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                      : "border border-slate-700 bg-slate-800/60 text-slate-400"
                }
              `}
            >
              {result.status}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800/80 bg-slate-950/30 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="
              ml-auto flex h-10
              items-center justify-center
              rounded-xl
              border border-slate-800
              bg-slate-900/60
              px-5
              text-sm font-medium
              text-slate-400
              transition-all
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}