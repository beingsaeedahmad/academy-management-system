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
    <header
      className="
        relative
        mb-6
        overflow-hidden
        rounded-2xl
        border border-white/[0.06]
        bg-slate-950/70
        backdrop-blur-xl
        shadow-[0_20px_60px_-35px_rgba(37,99,235,0.35)]
      "
    >
      {/* ========================================= */}
      {/* Background Effects */}
      {/* ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-blue-500/[0.08]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-20
          bottom-0
          h-32
          w-32
          rounded-full
          bg-violet-500/[0.05]
          blur-3xl
        "
      />

      {/* Top accent */}
      <div
        className="
          absolute
          inset-x-8
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500/50
          to-transparent
        "
      />

      {/* ========================================= */}
      {/* Main Header */}
      {/* ========================================= */}

      <div
        className="
          relative
          flex
          min-h-[122px]
          flex-col
          justify-center
          gap-5
          px-5
          py-5
          sm:px-6
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:px-7
        "
      >
        {/* ======================================= */}
        {/* Left */}
        {/* ======================================= */}

        <div className="min-w-0">
          {/* Breadcrumb */}

          <div className="mb-3 flex items-center gap-2">
            <div
              className="
                flex
                items-center
                gap-1.5
                text-[10px]
                font-medium
                text-slate-600
              "
            >
              <BarChart3 size={12} />

              <span>Academy</span>
            </div>

            <ChevronRight
              size={11}
              className="text-slate-700"
            />

            <span
              className="
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              Analytics
            </span>
          </div>

          {/* Title Row */}

          <div className="flex items-center gap-3.5">
            {/* Icon */}

            <div
              className="
                relative
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-500/20
                bg-gradient-to-br
                from-blue-500/[0.14]
                to-indigo-500/[0.06]
                shadow-[0_0_30px_rgba(37,99,235,0.10)]
              "
            >
              {/* Icon glow */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-blue-500/[0.05]
                  blur-md
                "
              />

              <BarChart3
                size={22}
                strokeWidth={1.8}
                className="
                  relative
                  z-10
                  text-blue-400
                "
              />
            </div>

            {/* Text */}

            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-white
                    sm:text-[28px]
                  "
                >
                  Analytics
                </h1>

                <span
                  className="
                    hidden
                    rounded-full
                    border
                    border-blue-500/15
                    bg-blue-500/[0.06]
                    px-2
                    py-0.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-blue-400
                    sm:inline-flex
                  "
                >
                  Overview
                </span>
              </div>

              <p
                className="
                  mt-1
                  max-w-xl
                  text-[11px]
                  leading-5
                  text-slate-500
                  sm:text-xs
                "
              >
                Monitor academy performance, students,
                attendance, fees and results
              </p>
            </div>
          </div>
        </div>

        {/* ======================================= */}
        {/* Actions */}
        {/* ======================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          {/* Refresh */}

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh analytics"
            className="
              group
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-3.5
              text-xs
              font-medium
              text-slate-400
              shadow-sm
              backdrop-blur-xl
              transition-all
              duration-200
              hover:border-blue-400/20
              hover:bg-blue-500/[0.06]
              hover:text-white
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <RefreshCw
              size={14}
              strokeWidth={1.8}
              className={`
                transition-transform
                duration-500
                ${
                  loading
                    ? "animate-spin text-blue-400"
                    : "group-hover:rotate-180"
                }
              `}
            />

            <span>Refresh</span>
          </button>

          {/* Export */}

          <button
            type="button"
            onClick={onExport}
            aria-label="Export analytics"
            className="
              group
              relative
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              border
              border-blue-400/20
              bg-gradient-to-r
              from-blue-600
              to-blue-500
              px-4
              text-xs
              font-semibold
              text-white
              shadow-[0_8px_25px_rgba(37,99,235,0.20)]
              transition-all
              duration-200
              hover:from-blue-500
              hover:to-indigo-500
              hover:shadow-[0_10px_30px_rgba(37,99,235,0.30)]
              active:scale-[0.98]
            "
          >
            {/* Shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-full
              "
            />

            <Download
              size={14}
              strokeWidth={2}
              className="relative z-10"
            />

            <span className="relative z-10">
              Export
            </span>
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* Bottom Divider */}
      {/* ========================================= */}

      <div
        className="
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.06]
          to-transparent
        "
      />
    </header>
  );
}