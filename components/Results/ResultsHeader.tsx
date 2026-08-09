"use client";

import {
  Award,
  ChevronRight,
  GraduationCap,
  Plus,
} from "lucide-react";

interface ResultsHeaderProps {
  onAddResult: () => void;
}

export default function ResultsHeader({
  onAddResult,
}: ResultsHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -top-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Left */}
        <div>
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <GraduationCap size={14} />
              <span>Academy</span>
            </div>

            <ChevronRight
              size={13}
              className="text-slate-700"
            />

            <span className="font-medium text-slate-400">
              Results
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                shrink-0
                items-center justify-center
                rounded-2xl
                border border-violet-500/20
                bg-violet-500/10
                shadow-lg
                shadow-violet-500/5
              "
            >
              <Award
                size={23}
                className="text-violet-400"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Results
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Manage student academic results and performance
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <button
          type="button"
          onClick={onAddResult}
          className="
            group
            inline-flex
            h-11
            w-fit
            items-center
            justify-center
            gap-2
            rounded-xl
            border border-blue-500/30
            bg-blue-600
            px-4
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-500/10
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-blue-500
            hover:shadow-blue-500/20
          "
        >
          <Plus
            size={17}
            className="transition-transform duration-200 group-hover:rotate-90"
          />

          Add Result
        </button>
      </div>

      {/* Bottom Divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-slate-800 via-slate-800/60 to-transparent" />
    </header>
  );
}