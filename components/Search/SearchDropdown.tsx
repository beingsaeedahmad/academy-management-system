"use client";

import SearchResultItem from "./SearchResultItem";
import { SearchResult } from "./searchTypes";

interface Props {
  loading: boolean;
  results: SearchResult[];
  open: boolean;
}

export default function SearchDropdown({
  loading,
  results,
  open,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        absolute
        left-0
        top-[58px]
        z-[100]
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/70
        bg-[#0B1120]/95
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-2xl
        ring-1
        ring-white/[0.03]
        animate-in
        fade-in
        slide-in-from-top-2
        duration-200
      "
    >
      {/* Top glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500/70
          to-transparent
        "
      />

      {/* Header */}
      {!loading && results.length > 0 && (
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800/80
            px-4
            py-3
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-blue-500/10
                ring-1
                ring-blue-500/20
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </div>

            <span className="text-xs font-semibold text-slate-300">
              Search Results
            </span>
          </div>

          <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[10px] font-medium text-slate-500">
            {results.length}{" "}
            {results.length === 1 ? "result" : "results"}
          </span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="px-5 py-8">
          <div className="flex flex-col items-center justify-center">
            <div
              className="
                relative
                mb-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                ring-1
                ring-blue-500/20
              "
            >
              <div
                className="
                  h-5
                  w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-slate-700
                  border-t-blue-400
                "
              />
            </div>

            <p className="text-sm font-medium text-slate-300">
              Searching...
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Finding matching records
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && results.length === 0 && (
        <div className="px-5 py-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-800
                bg-slate-800/40
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-slate-600"
              >
                <path
                  d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="text-sm font-medium text-slate-400">
              No results found
            </p>

            <p className="mt-1 max-w-[260px] text-xs leading-5 text-slate-600">
              Try searching with a student name, admission number,
              class, or another keyword.
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div
          className="
            max-h-[440px]
            overflow-y-auto
            overscroll-contain
            py-2
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-slate-700
            hover:scrollbar-thumb-slate-600
          "
        >
          <div className="space-y-0.5 px-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="
                  rounded-xl
                  transition-colors
                  duration-200
                  hover:bg-white/[0.025]
                "
              >
                <SearchResultItem result={result} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom hint */}
      {!loading && results.length > 0 && (
        <div
          className="
            border-t
            border-slate-800/70
            bg-slate-950/30
            px-4
            py-2.5
          "
        >
          <p className="text-[10px] text-slate-600">
            Select a result to open its details
          </p>
        </div>
      )}
    </div>
  );
}