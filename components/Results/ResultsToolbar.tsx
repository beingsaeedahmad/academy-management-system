"use client";

import {
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface ResultsToolbarProps {
  search: string;
  exam: string;
  status: string;
  className: string;
  onSearchChange: (value: string) => void;
  onExamChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onAddResult: () => void;
  onExport?: () => void;
  onClearFilters?: () => void;
}

export default function ResultsToolbar({
  search,
  exam,
  status,
  className,
  onSearchChange,
  onExamChange,
  onStatusChange,
  onClassChange,
  onAddResult,
  onExport,
  onClearFilters,
}: ResultsToolbarProps) {
  const hasFilters =
    search.trim() !== "" ||
    exam !== "all" ||
    status !== "all" ||
    className !== "all";

  return (
    <div
      className="
        rounded-2xl
        border border-slate-800/80
        bg-slate-900/30
        p-4
        backdrop-blur-sm
      "
    >
      {/* Top Row */}
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}
        <div className="relative min-w-0 flex-1 xl:max-w-md">
          <Search
            size={17}
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-600
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search student, roll no, subject..."
            className="
              h-11 w-full
              rounded-xl
              border border-slate-800
              bg-slate-950/60
              pl-10 pr-10
              text-sm text-slate-300
              outline-none
              placeholder:text-slate-600
              transition-all
              focus:border-blue-500/40
              focus:bg-slate-950
              focus:ring-2
              focus:ring-blue-500/10
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="
                absolute right-3 top-1/2
                flex h-6 w-6
                -translate-y-1/2
                items-center justify-center
                rounded-md
                text-slate-600
                transition-colors
                hover:bg-slate-800
                hover:text-slate-300
              "
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            className="
              inline-flex h-11
              items-center justify-center
              gap-2
              rounded-xl
              border border-slate-800
              bg-slate-950/50
              px-4
              text-xs
              font-medium
              text-slate-400
              transition-all
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
            "
          >
            <Download size={15} />
            <span className="hidden sm:inline">
              Export
            </span>
          </button>

          <button
            type="button"
            onClick={onAddResult}
            className="
              inline-flex h-11
              items-center justify-center
              gap-2
              rounded-xl
              border border-blue-500/30
              bg-blue-600
              px-4
              text-xs
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/10
              transition-all
              hover:bg-blue-500
              hover:shadow-blue-500/20
            "
          >
            <Plus size={16} />
            Add Result
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-800/60 pt-4 lg:flex-row lg:items-center">
        <div className="flex shrink-0 items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="text-slate-600"
          />

          <span className="text-xs font-medium text-slate-500">
            Filters
          </span>
        </div>

        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          {/* Class */}
          <div className="relative">
            <select
              value={className}
              onChange={(event) =>
                onClassChange(event.target.value)
              }
              className="
                h-10 w-full
                appearance-none
                rounded-xl
                border border-slate-800
                bg-slate-950/50
                px-3
                pr-9
                text-xs
                font-medium
                text-slate-400
                outline-none
                transition-all
                focus:border-blue-500/40
                focus:ring-2
                focus:ring-blue-500/10
              "
            >
              <option value="all">
                All Classes
              </option>

              <option value="Class 1">
                Class 1
              </option>

              <option value="Class 2">
                Class 2
              </option>

              <option value="Class 3">
                Class 3
              </option>

              <option value="Class 4">
                Class 4
              </option>

              <option value="Class 5">
                Class 5
              </option>

              <option value="Class 6">
                Class 6
              </option>

              <option value="Class 7">
                Class 7
              </option>

              <option value="Class 8">
                Class 8
              </option>

              <option value="Class 9">
                Class 9
              </option>

              <option value="Class 10">
                Class 10
              </option>
            </select>

            <Filter
              size={13}
              className="
                pointer-events-none
                absolute right-3 top-1/2
                -translate-y-1/2
                text-slate-600
              "
            />
          </div>

          {/* Examination */}
          <div className="relative">
            <select
              value={exam}
              onChange={(event) =>
                onExamChange(event.target.value)
              }
              className="
                h-10 w-full
                appearance-none
                rounded-xl
                border border-slate-800
                bg-slate-950/50
                px-3
                pr-9
                text-xs
                font-medium
                text-slate-400
                outline-none
                transition-all
                focus:border-violet-500/40
                focus:ring-2
                focus:ring-violet-500/10
              "
            >
              <option value="all">
                All Examinations
              </option>

              <option value="Monthly Test">
                Monthly Test
              </option>

              <option value="Class Test">
                Class Test
              </option>

              <option value="Mid Term">
                Mid Term
              </option>

              <option value="Final Exam">
                Final Exam
              </option>
            </select>

            <Filter
              size={13}
              className="
                pointer-events-none
                absolute right-3 top-1/2
                -translate-y-1/2
                text-slate-600
              "
            />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value)
              }
              className="
                h-10 w-full
                appearance-none
                rounded-xl
                border border-slate-800
                bg-slate-950/50
                px-3
                pr-9
                text-xs
                font-medium
                text-slate-400
                outline-none
                transition-all
                focus:border-emerald-500/40
                focus:ring-2
                focus:ring-emerald-500/10
              "
            >
              <option value="all">
                All Status
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>

            <Filter
              size={13}
              className="
                pointer-events-none
                absolute right-3 top-1/2
                -translate-y-1/2
                text-slate-600
              "
            />
          </div>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="
              inline-flex h-10
              shrink-0
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border border-slate-800
              bg-slate-950/50
              px-3
              text-xs
              font-medium
              text-slate-500
              transition-all
              hover:border-red-500/20
              hover:bg-red-500/5
              hover:text-red-400
            "
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}