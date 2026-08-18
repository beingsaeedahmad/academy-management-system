"use client";

import {
  BarChart3,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

/* =========================================================
   TYPES
   ========================================================= */

export interface ResultsStats {
  totalStudents: number;
  publishedResults: number;
  pendingResults: number;
  averagePerformance: number;
}

interface ResultsOverviewCardsProps {
  stats: ResultsStats;
}

/* =========================================================
   CARD CONFIG
   ========================================================= */

const cards = [
  {
    title: "Total Results",
    key: "totalStudents" as const,
    subtitle: "Academic records",
    icon: BarChart3,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    accent: "from-blue-500 to-cyan-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
  },
  {
    title: "Published",
    key: "publishedResults" as const,
    subtitle: "Results published",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    accent: "from-emerald-500 to-teal-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
  },
  {
    title: "Pending",
    key: "pendingResults" as const,
    subtitle: "Awaiting publication",
    icon: Clock3,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    accent: "from-amber-500 to-orange-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
  },
  {
    title: "Average Score",
    key: "averagePerformance" as const,
    subtitle: "Overall performance",
    icon: TrendingUp,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    accent: "from-violet-500 to-fuchsia-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
  },
];

/* =========================================================
   SKELETON
   ========================================================= */

function OverviewCardSkeleton() {
  return (
    <div
      className="
        animate-pulse
        rounded-2xl
        border border-slate-800/80
        bg-slate-900/30
        p-5
      "
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-3 w-24 rounded bg-slate-800" />
          <div className="h-8 w-20 rounded bg-slate-800" />
        </div>

        <div className="h-11 w-11 rounded-xl bg-slate-800" />
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-slate-800" />

      <div className="mt-3 h-3 w-28 rounded bg-slate-800" />
    </div>
  );
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function ResultsOverviewCards({
  stats,
}: ResultsOverviewCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const rawValue = stats[card.key];

        const numericValue = Number(rawValue);

        /* -------------------------------------------------
           Display Value
        ------------------------------------------------- */

        const value =
          card.key === "averagePerformance"
            ? `${numericValue.toFixed(1)}%`
            : numericValue.toLocaleString();

        /* -------------------------------------------------
           Progress
        ------------------------------------------------- */

        let progress = 0;

        if (card.key === "publishedResults") {
          progress =
            stats.totalStudents > 0
              ? (stats.publishedResults /
                  stats.totalStudents) *
                100
              : 0;
        }

        if (card.key === "pendingResults") {
          progress =
            stats.totalStudents > 0
              ? (stats.pendingResults /
                  stats.totalStudents) *
                100
              : 0;
        }

        if (card.key === "averagePerformance") {
          progress = Math.min(
            Math.max(numericValue, 0),
            100
          );
        }

        const safeProgress = Math.min(
          Math.max(progress, 0),
          100
        );

        return (
          <article
            key={card.title}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-800/80
              bg-slate-900/40
              p-5
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              ${card.glow}
            `}
          >
            {/* =================================================
                TOP ACCENT
            ================================================= */}

            <div
              className={`
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                ${card.accent}
                opacity-60
              `}
            />

            {/* =================================================
                BACKGROUND GLOW
            ================================================= */}

            <div
              className={`
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                bg-gradient-to-br
                ${card.accent}
                opacity-[0.04]
                blur-2xl
                transition-opacity
                duration-300
                group-hover:opacity-[0.08]
              `}
            />

            <div className="relative">
              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                    {value}
                  </p>
                </div>

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${card.iconBg}
                  `}
                >
                  <Icon
                    size={20}
                    className={card.iconColor}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              {card.key !== "totalStudents" && (
                <div className="mt-5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        ${card.accent}
                        transition-all
                        duration-700
                      `}
                      style={{
                        width: `${safeProgress}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* =================================================
                  META
              ================================================= */}

              <div className="mt-4 flex items-center gap-2">
                <div
                  className={`
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-md
                    ${card.iconBg}
                  `}
                >
                  <Icon
                    size={11}
                    className={card.iconColor}
                  />
                </div>

                <span className="text-[11px] text-slate-600">
                  {card.subtitle}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* =========================================================
   EXPORTS
   ========================================================= */

export { OverviewCardSkeleton };