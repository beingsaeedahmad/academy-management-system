"use client";

import {
  Award,
  Eye,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

export type ResultStatus = "Published" | "Pending" | "Draft";

export interface ResultRow {
  id: string;
  studentName: string;
  rollNumber: string;
  className: string;
  subject: string;
  exam: string;
  totalMarks: number;
  obtainedMarks: number;
  status: ResultStatus;
}

interface ResultsTableProps {
  results: ResultRow[];
  loading?: boolean;
  onView?: (result: ResultRow) => void;
  onEdit?: (result: ResultRow) => void;
  onDelete?: (result: ResultRow) => void;
}

function getPercentage(
  obtainedMarks: number,
  totalMarks: number
) {
  if (totalMarks <= 0) {
    return 0;
  }

  return (obtainedMarks / totalMarks) * 100;
}

function getGrade(percentage: number) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";

  return "F";
}

function getStatusClass(status: ResultStatus) {
  switch (status) {
    case "Published":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

    case "Pending":
      return "border-amber-500/20 bg-amber-500/10 text-amber-400";

    case "Draft":
      return "border-slate-700 bg-slate-800/60 text-slate-400";

    default:
      return "border-slate-700 bg-slate-800/60 text-slate-400";
  }
}

function ResultsTableSkeleton() {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="
            flex items-center gap-4
            border-b border-slate-800/60
            px-5 py-4
          "
        >
          <div className="h-9 w-9 rounded-xl bg-slate-800" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-32 rounded bg-slate-800" />
            <div className="h-2.5 w-20 rounded bg-slate-800/70" />
          </div>

          <div className="hidden h-3 w-20 rounded bg-slate-800 md:block" />
          <div className="hidden h-3 w-20 rounded bg-slate-800 lg:block" />
          <div className="h-7 w-14 rounded-lg bg-slate-800" />
          <div className="h-8 w-20 rounded-lg bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default function ResultsTable({
  results,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: ResultsTableProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-800/80
        bg-slate-900/30
        backdrop-blur-sm
      "
    >
      {/* Table Header */}
      <div
        className="
          hidden
          border-b border-slate-800/80
          bg-slate-950/40
          px-5 py-3
          text-[11px]
          font-semibold
          uppercase
          tracking-wider
          text-slate-600
          md:grid
          md:grid-cols-[minmax(190px,1.6fr)_minmax(120px,1fr)_minmax(120px,1fr)_100px_90px_120px_120px]
          md:items-center
          md:gap-4
        "
      >
        <span>Student</span>
        <span>Class</span>
        <span>Subject</span>
        <span>Marks</span>
        <span>Grade</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Loading */}
      {loading ? (
        <ResultsTableSkeleton />
      ) : results.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
            <Users
              size={24}
              className="text-slate-600"
              strokeWidth={1.7}
            />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-300">
            No results found
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-600">
            There are no academic results matching the
            current filters.
          </p>
        </div>
      ) : (
        /* Rows */
        <div>
          {results.map((result) => {
            const percentage = getPercentage(
              result.obtainedMarks,
              result.totalMarks
            );

            const grade = getGrade(percentage);

            return (
              <div
                key={result.id}
                className="
                  group
                  border-b border-slate-800/60
                  px-5 py-4
                  transition-colors
                  last:border-b-0
                  hover:bg-slate-800/20
                "
              >
                {/* Desktop Row */}
                <div
                  className="
                    hidden
                    md:grid
                    md:grid-cols-[minmax(190px,1.6fr)_minmax(120px,1fr)_minmax(120px,1fr)_100px_90px_120px_120px]
                    md:items-center
                    md:gap-4
                  "
                >
                  {/* Student */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                      <Award
                        size={18}
                        className="text-blue-400"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-200">
                        {result.studentName}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-600">
                        Roll No. {result.rollNumber}
                      </p>
                    </div>
                  </div>

                  {/* Class */}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-400">
                      {result.className}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {result.exam}
                    </p>
                  </div>

                  {/* Subject */}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-400">
                      {result.subject}
                    </p>
                  </div>

                  {/* Marks */}
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      {result.obtainedMarks}
                      <span className="font-normal text-slate-600">
                        {" "}
                        / {result.totalMarks}
                      </span>
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>

                  {/* Grade */}
                  <div>
                    <span
                      className={`
                        inline-flex
                        min-w-[38px]
                        items-center
                        justify-center
                        rounded-lg
                        border
                        px-2
                        py-1.5
                        text-xs
                        font-bold
                        ${
                          grade === "F"
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : "border-violet-500/20 bg-violet-500/10 text-violet-400"
                        }
                      `}
                    >
                      {grade}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`
                        inline-flex
                        rounded-lg
                        border
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-semibold
                        ${getStatusClass(result.status)}
                      `}
                    >
                      {result.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onView?.(result)}
                      title="View result"
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        text-slate-500
                        transition-all
                        hover:bg-blue-500/10
                        hover:text-blue-400
                      "
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(result)}
                      title="Edit result"
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        text-slate-500
                        transition-all
                        hover:bg-amber-500/10
                        hover:text-amber-400
                      "
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(result)}
                      title="Delete result"
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-lg
                        text-slate-500
                        transition-all
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                        <Award
                          size={18}
                          className="text-blue-400"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-200">
                          {result.studentName}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-600">
                          Roll No. {result.rollNumber}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`
                        shrink-0
                        rounded-lg
                        border
                        px-2.5 py-1.5
                        text-[10px]
                        font-semibold
                        ${getStatusClass(result.status)}
                      `}
                    >
                      {result.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-800/70 bg-slate-950/30 p-3">
                      <p className="text-[10px] text-slate-600">
                        Subject
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-slate-400">
                        {result.subject}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/70 bg-slate-950/30 p-3">
                      <p className="text-[10px] text-slate-600">
                        Examination
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-slate-400">
                        {result.exam}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/70 bg-slate-950/30 p-3">
                      <p className="text-[10px] text-slate-600">
                        Marks
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-300">
                        {result.obtainedMarks}
                        <span className="font-normal text-slate-600">
                          {" "}
                          / {result.totalMarks}
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/70 bg-slate-950/30 p-3">
                      <p className="text-[10px] text-slate-600">
                        Grade
                      </p>

                      <p
                        className={`
                          mt-1 text-sm font-bold
                          ${
                            grade === "F"
                              ? "text-red-400"
                              : "text-violet-400"
                          }
                        `}
                      >
                        {grade}
                        <span className="ml-1 text-[10px] font-normal text-slate-600">
                          ({percentage.toFixed(1)}%)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-800/60 pt-3">
                    <button
                      type="button"
                      onClick={() => onView?.(result)}
                      className="
                        inline-flex h-9
                        items-center gap-2
                        rounded-lg
                        border border-slate-800
                        bg-slate-900/60
                        px-3
                        text-xs
                        font-medium
                        text-slate-500
                        transition-all
                        hover:border-blue-500/20
                        hover:bg-blue-500/10
                        hover:text-blue-400
                      "
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(result)}
                      className="
                        inline-flex h-9
                        items-center gap-2
                        rounded-lg
                        border border-slate-800
                        bg-slate-900/60
                        px-3
                        text-xs
                        font-medium
                        text-slate-500
                        transition-all
                        hover:border-amber-500/20
                        hover:bg-amber-500/10
                        hover:text-amber-400
                      "
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(result)}
                      className="
                        inline-flex h-9
                        items-center gap-2
                        rounded-lg
                        border border-slate-800
                        bg-slate-900/60
                        px-3
                        text-xs
                        font-medium
                        text-slate-500
                        transition-all
                        hover:border-red-500/20
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}