"use client";

import {
  BarChart3,
  ChevronRight,
  Download,
  RefreshCw,
} from "lucide-react";

interface AnalyticsHeaderProps {
  onRefresh?: () => void;
  loading?: boolean;
  onExport?: () => void;
}

export default function AnalyticsHeader({
  onRefresh,
  loading = false,
  onExport,
}: AnalyticsHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Left Content */}
        <div>
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <BarChart3 size={14} />
              <span>Academy</span>
            </div>

            <ChevronRight
              size={13}
              className="text-slate-700"
            />

            <span className="font-medium text-slate-400">
              Analytics
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
                border border-blue-500/20
                bg-blue-500/10
                shadow-lg
                shadow-blue-500/5
              "
            >
              <BarChart3
                size={23}
                className="text-blue-400"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Analytics
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Monitor academy performance, students,
                attendance, fees and results
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-800
              bg-slate-900/50
              px-3.5
              text-xs
              font-medium
              text-slate-400
              backdrop-blur-sm
              transition-all
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={15}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

          {/* Export */}
          <button
            type="button"
            onClick={onExport}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-blue-500/25
              bg-blue-600/90
              px-3.5
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
            <Download size={15} />

            <span className="hidden sm:inline">
              Export
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-slate-800 via-slate-800/60 to-transparent" />
    </header>
  );
}