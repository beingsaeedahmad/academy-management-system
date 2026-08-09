"use client";

import {
  Activity,
  Award,
  CalendarCheck2,
  GraduationCap,
  Wallet,
} from "lucide-react";

interface AcademyPerformanceProps {
  students: {
    total: number;
    active: number;
    inactive: number;
  };

  attendance: {
    present: number;
    absent: number;
    leave: number;
    rate: number;
  };

  fees: {
    collected: number;
    pending: number;
    overdue: number;
  };

  results: {
    total: number;
    averagePercentage: number;
    passed: number;
    failed: number;
  };
}

interface PerformanceItem {
  title: string;
  value: string;
  percentage: number;
  description: string;
  icon: typeof GraduationCap;
  iconBg: string;
  iconColor: string;
  bar: string;
}

function formatCurrency(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

export default function AcademyPerformance({
  students,
  attendance,
  fees,
  results,
}: AcademyPerformanceProps) {
  const studentActivityRate =
    students.total > 0
      ? (students.active / students.total) * 100
      : 0;

  const feeTotal =
    fees.collected +
    fees.pending +
    fees.overdue;

  const feeCollectionRate =
    feeTotal > 0
      ? (fees.collected / feeTotal) * 100
      : 0;

  const resultPassRate =
    results.total > 0
      ? (results.passed / results.total) * 100
      : 0;

  const performanceItems: PerformanceItem[] = [
    {
      title: "Student Activity",
      value: `${studentActivityRate.toFixed(1)}%`,
      percentage: clamp(studentActivityRate),
      description: `${students.active} active of ${students.total} students`,
      icon: GraduationCap,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      bar: "from-blue-500 to-cyan-500",
    },
    {
      title: "Attendance",
      value: `${attendance.rate.toFixed(1)}%`,
      percentage: clamp(attendance.rate),
      description: `${attendance.present} present attendance records`,
      icon: CalendarCheck2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      bar: "from-emerald-500 to-teal-500",
    },
    {
      title: "Fee Collection",
      value: `${feeCollectionRate.toFixed(1)}%`,
      percentage: clamp(feeCollectionRate),
      description: `${formatCurrency(fees.collected)} collected`,
      icon: Wallet,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      bar: "from-cyan-500 to-blue-500",
    },
    {
      title: "Academic Results",
      value: `${results.averagePercentage.toFixed(1)}%`,
      percentage: clamp(
        results.averagePercentage
      ),
      description: `${results.passed} of ${results.total} results passed`,
      icon: Award,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      bar: "from-violet-500 to-fuchsia-500",
    },
  ];

  const overallPerformance =
    performanceItems.length > 0
      ? performanceItems.reduce(
          (sum, item) =>
            sum + item.percentage,
          0
        ) / performanceItems.length
      : 0;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-800/80
        bg-slate-900/40
        p-5
        backdrop-blur-sm
      "
    >
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-70" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/5 blur-3xl" />

      {/* Header */}
      <div className="relative mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
            <Activity
              size={20}
              className="text-violet-400"
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Academy Performance
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Overall health of your academy
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-600">
              Overall Score
            </p>

            <p className="mt-0.5 text-lg font-bold text-white">
              {overallPerformance.toFixed(1)}%
            </p>
          </div>

          <div className="relative h-10 w-10">
            <svg
              viewBox="0 0 40 40"
              className="h-10 w-10 -rotate-90"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgb(30 41 59)"
                strokeWidth="4"
              />

              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgb(139 92 246)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100.53"
                strokeDashoffset={
                  100.53 -
                  (100.53 *
                    clamp(
                      overallPerformance
                    )) /
                    100
                }
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Performance Items */}
      <div className="relative grid gap-4 md:grid-cols-2">
        {performanceItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-xl
                border
                border-slate-800/70
                bg-slate-950/30
                p-4
                transition-colors
                duration-200
                hover:border-slate-700
              "
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${item.iconBg}
                    `}
                  >
                    <Icon
                      size={17}
                      className={item.iconColor}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-300">
                      {item.title}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-sm font-bold text-white">
                  {item.value}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${item.bar}
                    transition-all
                    duration-700
                  `}
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary */}
      <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800/60 bg-slate-950/20 px-4 py-3">
          <p className="text-[10px] text-slate-600">
            Present
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-400">
            {attendance.present.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/60 bg-slate-950/20 px-4 py-3">
          <p className="text-[10px] text-slate-600">
            Pending Fees
          </p>

          <p className="mt-1 text-sm font-semibold text-amber-400">
            {formatCurrency(fees.pending)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/60 bg-slate-950/20 px-4 py-3">
          <p className="text-[10px] text-slate-600">
            Failed Results
          </p>

          <p className="mt-1 text-sm font-semibold text-red-400">
            {results.failed.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
}