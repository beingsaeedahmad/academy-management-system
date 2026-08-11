"use client";

import Link from "next/link";

import {
  GraduationCap,
  CalendarCheck2,
  Wallet,
  Clock3,
  Receipt,
  UserCheck,
  UserX,
  UserRoundX,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

interface AnalyticsOverview {
  totalStudents: number;
  attendanceRate: number;
  feesCollected: number;
  pendingFees: number;

  totalFees: number;
  presentAttendance: number;
  absentAttendance: number;
  feeDefaulters: number;
}

interface AnalyticsOverviewCardsProps {
  overview: AnalyticsOverview;
}

const cards = [
  {
    key: "students" as const,
    title: "Total Students",
    subtitle: "Currently enrolled",
    href: "/students",
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
    href: "/attendance",
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
    subtitle: "Current month collected",
    href: "/fees",
    icon: Wallet,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    accent: "from-cyan-500 to-blue-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]",
  },

  {
    key: "pendingFees" as const,
    title: "Pending Fees",
    subtitle: "Outstanding amount",
    href: "/fees",
    icon: Clock3,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    accent: "from-amber-500 to-orange-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
  },

  {
    key: "totalFees" as const,
    title: "Total Fees",
    subtitle: "Current month total",
    href: "/fees",
    icon: Receipt,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    accent: "from-violet-500 to-purple-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
  },

  {
    key: "present" as const,
    title: "Present",
    subtitle: "Attendance present",
    href: "/attendance",
    icon: UserCheck,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    accent: "from-emerald-500 to-green-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
  },

  {
    key: "absent" as const,
    title: "Absent",
    subtitle: "Attendance absent",
    href: "/attendance",
    icon: UserX,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    accent: "from-red-500 to-rose-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]",
  },

  {
    key: "defaulters" as const,
    title: "Fee Defaulters",
    subtitle: "Students with pending fees",
    href: "/fees",
    icon: UserRoundX,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    accent: "from-orange-500 to-amber-500",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(249,115,22,0.12)]",
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

    case "pendingFees":
      return formatCurrency(overview.pendingFees);

    case "totalFees":
      return formatCurrency(overview.totalFees);

    case "present":
      return overview.presentAttendance.toLocaleString();

    case "absent":
      return overview.absentAttendance.toLocaleString();

    case "defaulters":
      return overview.feeDefaulters.toLocaleString();

    default:
      return "0";
  }
}

function getProgress(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  switch (key) {
    case "attendance":
      return Math.min(
        Math.max(overview.attendanceRate, 0),
        100
      );

    case "fees":
      if (overview.totalFees <= 0) {
        return 0;
      }

      return Math.min(
        (overview.feesCollected / overview.totalFees) * 100,
        100
      );

    case "pendingFees":
      if (overview.totalFees <= 0) {
        return 0;
      }

      return Math.min(
        (overview.pendingFees / overview.totalFees) * 100,
        100
      );

    default:
      return 100;
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

  if (
    key === "pendingFees" ||
    key === "defaulters"
  ) {
    return key === "pendingFees"
      ? AlertCircle
      : UserRoundX;
  }

  if (key === "absent") {
    return UserX;
  }

  return TrendingUp;
}

function getStatus(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  if (key === "attendance") {
    return overview.attendanceRate >= 75
      ? {
          label: "Good",
          className: "text-emerald-400",
        }
      : {
          label: "Needs attention",
          className: "text-red-400",
        };
  }

  if (key === "pendingFees") {
    return overview.pendingFees > 0
      ? {
          label: "Outstanding",
          className: "text-amber-400",
        }
      : {
          label: "All clear",
          className: "text-emerald-400",
        };
  }

  if (key === "defaulters") {
    return overview.feeDefaulters > 0
      ? {
          label: "Attention",
          className: "text-orange-400",
        }
      : {
          label: "All clear",
          className: "text-emerald-400",
        };
  }

  return null;
}

function getIndicatorStyle(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  if (key === "attendance") {
    return overview.attendanceRate >= 75
      ? "bg-emerald-500/10"
      : "bg-red-500/10";
  }

  if (
    key === "pendingFees" ||
    key === "defaulters"
  ) {
    return overview.pendingFees > 0 ||
      overview.feeDefaulters > 0
      ? "bg-amber-500/10"
      : "bg-emerald-500/10";
  }

  if (key === "absent") {
    return "bg-red-500/10";
  }

  return "bg-emerald-500/10";
}

function getIndicatorColor(
  key: (typeof cards)[number]["key"],
  overview: AnalyticsOverview
) {
  if (key === "attendance") {
    return overview.attendanceRate >= 75
      ? "text-emerald-400"
      : "text-red-400";
  }

  if (
    key === "pendingFees" ||
    key === "defaulters"
  ) {
    return overview.pendingFees > 0 ||
      overview.feeDefaulters > 0
      ? "text-amber-400"
      : "text-emerald-400";
  }

  if (key === "absent") {
    return "text-red-400";
  }

  return "text-emerald-400";
}

export default function AnalyticsOverviewCards({
  overview,
}: AnalyticsOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        const status = getStatus(
          card.key,
          overview
        );

        const indicatorStyle =
          getIndicatorStyle(
            card.key,
            overview
          );

        const indicatorColor =
          getIndicatorColor(
            card.key,
            overview
          );

        const isPendingFees =
          card.key === "pendingFees";

        const isDefaulter =
          card.key === "defaulters";

        const isPositive =
          card.key === "attendance"
            ? overview.attendanceRate >= 75
            : isPendingFees ||
                isDefaulter
              ? isPendingFees
                ? overview.pendingFees === 0
                : overview.feeDefaulters === 0
              : true;

        return (
          <Link
            key={card.key}
            href={card.href}
            className="block h-full"
          >
            <article
              className={`
                group
                relative
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-800/80
                bg-gradient-to-br
                from-slate-900/70
                via-slate-900/50
                to-slate-950/70
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-700/80
                ${card.glow}
                cursor-pointer
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
                  opacity-70
                `}
              />

              {/* Ambient Glow */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-gradient-to-br
                  ${card.accent}
                  opacity-[0.035]
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:opacity-[0.10]
                `}
              />

              {/* Content */}

              <div className="relative">
                {/* Header */}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">
                      {card.title}
                    </p>

                    <p className="mt-2 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {value}
                    </p>
                  </div>

                  {/* Icon */}

                  <div
                    className={`
                      relative
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/[0.04]
                      ${card.iconBg}
                      transition-all
                      duration-300
                      group-hover:scale-105
                    `}
                  >
                    <div
                      className={`
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-xl
                        bg-gradient-to-br
                        ${card.accent}
                        opacity-0
                        blur-md
                        transition-opacity
                        duration-300
                        group-hover:opacity-20
                      `}
                    />

                    <Icon
                      size={20}
                      className={`
                        relative
                        z-10
                        ${card.iconColor}
                      `}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Progress */}

                <div className="mt-5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                    <div
                      className={`
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        ${card.accent}
                        shadow-sm
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
                        ${indicatorStyle}
                      `}
                    >
                      <PerformanceIcon
                        size={13}
                        className={indicatorColor}
                        strokeWidth={2}
                      />
                    </span>

                    <span className="truncate text-[11px] text-slate-600">
                      {card.subtitle}
                    </span>
                  </div>

                  {status && (
                    <span
                      className={`
                        shrink-0
                        text-[10px]
                        font-semibold
                        ${status.className}
                      `}
                    >
                      {status.label}
                    </span>
                  )}
                </div>

                {/* Pending / Defaulter Notice */}

                {(isPendingFees || isDefaulter) && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${
                          isPositive
                            ? "bg-emerald-400"
                            : "bg-amber-400"
                        }
                      `}
                    />

                    <span className="text-[9px] text-slate-600">
                      {isPositive
                        ? "No outstanding fees"
                        : isDefaulter
                          ? "Students require payment"
                          : "Payment required"}
                    </span>
                  </div>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}