"use client";

import {
  GraduationCap,
  CalendarCheck2,
  Wallet,
  Award,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface AnalyticsOverview {
  totalStudents: number;
  attendanceRate: number;
  feesCollected: number;
  averageResult: number;
}

interface AnalyticsOverviewCardsProps {
  overview: AnalyticsOverview;
}

const cards = [
  {
    key: "students" as const,
    title: "Total Students",
    subtitle: "Currently enrolled",
    icon: GraduationCap,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    accent: "from-blue-500 to-cyan-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
  },
  {
    key: "attendance" as const,
    title: "Attendance Rate",
    subtitle: "Overall attendance",
    icon: CalendarCheck2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    accent: "from-emerald-500 to-teal-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
  },
  {
    key: "fees" as const,
    title: "Fees Collected",
    subtitle: "Total collected",
    icon: Wallet,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    accent: "from-cyan-500 to-blue-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]",
  },
  {
    key: "results" as const,
    title: "Average Result",
    subtitle: "Overall academic score",
    icon: Award,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    accent: "from-violet-500 to-fuchsia-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
  },
];

function formatCurrency(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function getValue(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  switch (key) {
    case "students":
      return overview.totalStudents.toLocaleString();

    case "attendance":
      return `${overview.attendanceRate.toFixed(1)}%`;

    case "fees":
      return formatCurrency(overview.feesCollected);

    case "results":
      return `${overview.averageResult.toFixed(1)}%`;

    default:
      return "0";
  }
}

function getProgress(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  switch (key) {
    case "students":
      return 100;

    case "attendance":
      return Math.min(
        Math.max(overview.attendanceRate, 0),
        100
      );

    case "fees":
      /*
       * Fees card intentionally does not use a
       * percentage because there is no fixed target
       * in the analytics action.
       */
      return 100;

    case "results":
      return Math.min(
        Math.max(overview.averageResult, 0),
        100
      );

    default:
      return 0;
  }
}

function getPerformanceIcon(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  if (key === "attendance") {
    return overview.attendanceRate >= 75
      ? TrendingUp
      : TrendingDown;
  }

  if (key === "results") {
    return overview.averageResult >= 50
      ? TrendingUp
      : TrendingDown;
  }

  return TrendingUp;
}

export default function AnalyticsOverviewCards({
  overview,
}: AnalyticsOverviewCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const PerformanceIcon =
          getPerformanceIcon(
            card.key,
            overview
          );

        const value = getValue(
          card.key,
          overview
        );

        const progress = getProgress(
          card.key,
          overview
        );

        const positive =
          card.key === "attendance"
            ? overview.attendanceRate >= 75
            : card.key === "results"
              ? overview.averageResult >= 50
              : true;

        return (
          <article
            key={card.key}
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
            {/* Top Accent */}
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

            {/* Decorative Glow */}
            <div
              className={`
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-gradient-to-br
                ${card.accent}
                opacity-[0.035]
                blur-3xl
                transition-opacity
                duration-300
                group-hover:opacity-[0.08]
              `}
            />

            <div className="relative">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
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

              {/* Progress */}
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
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${
                        positive
                          ? "bg-emerald-500/10"
                          : "bg-red-500/10"
                      }
                    `}
                  >
                    <PerformanceIcon
                      size={13}
                      className={
                        positive
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    />
                  </span>

                  <span className="truncate text-[11px] text-slate-600">
                    {card.subtitle}
                  </span>
                </div>

                {(card.key === "attendance" ||
                  card.key === "results") && (
                  <span
                    className={`
                      shrink-0
                      text-[10px]
                      font-semibold
                      ${
                        positive
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    `}
                  >
                    {positive
                      ? "Good"
                      : "Needs attention"}
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}