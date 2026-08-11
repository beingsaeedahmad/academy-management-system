"use client";

import {
  Activity,
  ArrowUpRight,
  Award,
  CalendarCheck2,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  Wallet,
  XCircle,
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

interface PerformanceCard {
  title: string;
  subtitle: string;
  value: string;
  percentage: number;
  icon: typeof GraduationCap;
  iconBg: string;
  iconColor: string;
  gradient: string;
}

function formatCurrency(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

function getScoreLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Average";
  return "Needs Attention";
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-cyan-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

export default function AcademyPerformance({
  students,
  attendance,
  fees,
  results,
}: AcademyPerformanceProps) {
  /* =========================================================
     STUDENT ACTIVITY
     ========================================================= */

  const studentActivityRate =
    students.total > 0
      ? (students.active / students.total) * 100
      : 0;

  /* =========================================================
     ATTENDANCE
     ========================================================= */

  const attendanceRate = clamp(attendance.rate);

  const attendanceRecords =
    attendance.present +
    attendance.absent +
    attendance.leave;

  /* =========================================================
     FEES
     ========================================================= */

  const totalFees =
    fees.collected +
    fees.pending +
    fees.overdue;

  const feeCollectionRate =
    totalFees > 0
      ? (fees.collected / totalFees) * 100
      : 0;

  const pendingPercentage =
    totalFees > 0
      ? (fees.pending / totalFees) * 100
      : 0;

  const overduePercentage =
    totalFees > 0
      ? (fees.overdue / totalFees) * 100
      : 0;

  /* =========================================================
     RESULTS
     ========================================================= */

  const resultPassRate =
    results.total > 0
      ? (results.passed / results.total) * 100
      : 0;

  /* =========================================================
     PERFORMANCE CARDS
     ========================================================= */

  const performanceCards: PerformanceCard[] = [
    {
      title: "Student Activity",
      subtitle: `${students.active} active of ${students.total} students`,
      value: `${studentActivityRate.toFixed(1)}%`,
      percentage: clamp(studentActivityRate),
      icon: GraduationCap,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Attendance",
      subtitle: `${attendance.present} present records`,
      value: `${attendanceRate.toFixed(1)}%`,
      percentage: attendanceRate,
      icon: CalendarCheck2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      title: "Fee Collection",
      subtitle: `${formatCurrency(fees.collected)} collected`,
      value: `${feeCollectionRate.toFixed(1)}%`,
      percentage: clamp(feeCollectionRate),
      icon: Wallet,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-400",
    },
    {
      title: "Academic Results",
      subtitle: `${results.passed} of ${results.total} passed`,
      value: `${results.averagePercentage.toFixed(1)}%`,
      percentage: clamp(results.averagePercentage),
      icon: Award,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      gradient: "from-violet-500 to-fuchsia-400",
    },
  ];

  /* =========================================================
     OVERALL SCORE
     ========================================================= */

  const overallPerformance =
    performanceCards.length > 0
      ? performanceCards.reduce(
          (sum, item) => sum + item.percentage,
          0
        ) / performanceCards.length
      : 0;

  const overallScore = clamp(overallPerformance);

  const scoreLabel = getScoreLabel(overallScore);
  const scoreColor = getScoreColor(overallScore);

  const circumference = 2 * Math.PI * 46;

  const scoreOffset =
    circumference -
    (circumference * overallScore) / 100;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-slate-800/80
        bg-[#07101f]
        shadow-[0_20px_70px_rgba(0,0,0,0.28)]
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-violet-600/10
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          bottom-0
          h-72
          w-72
          rounded-full
          bg-cyan-500/5
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-violet-500
          to-transparent
          opacity-80
        "
      />

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          gap-6
          border-b
          border-slate-800/70
          px-6
          py-6
          sm:px-7
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="flex items-center gap-4">
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
              border-violet-400/10
              bg-gradient-to-br
              from-violet-500/15
              to-indigo-500/5
              shadow-[0_0_30px_rgba(139,92,246,0.08)]
            "
          >
            <Activity
              size={21}
              strokeWidth={1.8}
              className="text-violet-400"
            />

            <span
              className="
                absolute
                -right-1
                -top-1
                h-2
                w-2
                rounded-full
                bg-violet-400
                shadow-[0_0_10px_rgba(167,139,250,0.8)]
              "
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Academy Performance
              </h2>

              <span
                className="
                  rounded-full
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  px-2
                  py-0.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-violet-300
                "
              >
                Live
              </span>
            </div>

            <p className="mt-1 text-[11px] text-slate-500">
              Overall health and performance of your academy
            </p>
          </div>
        </div>

        {/* Overall Score */}

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-800/70
            bg-slate-950/30
            px-4
            py-3
          "
        >
          <div className="text-right">
            <p
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-slate-600
              "
            >
              Overall Score
            </p>

            <p
              className={`
                mt-1
                text-xl
                font-bold
                tracking-tight
                ${scoreColor}
              `}
            >
              {overallScore.toFixed(1)}%
            </p>

            <p className="mt-0.5 text-[9px] text-slate-600">
              {scoreLabel}
            </p>
          </div>

          {/* Circular Score */}

          <div className="relative h-14 w-14">
            <svg
              viewBox="0 0 112 112"
              className="
                h-14
                w-14
                -rotate-90
              "
            >
              <circle
                cx="56"
                cy="56"
                r="46"
                fill="none"
                stroke="rgb(30 41 59 / 0.8)"
                strokeWidth="7"
              />

              <circle
                cx="56"
                cy="56"
                r="46"
                fill="none"
                stroke="url(#performanceGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={scoreOffset}
                className="transition-all duration-1000"
              />

              <defs>
                <linearGradient
                  id="performanceGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#8b5cf6"
                  />

                  <stop
                    offset="100%"
                    stopColor="#22d3ee"
                  />
                </linearGradient>
              </defs>
            </svg>

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
              "
            >
              <TrendingUp
                size={15}
                className="text-violet-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PERFORMANCE GRID
          ===================================================== */}

      <div className="relative grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
        {performanceCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-800/80
                bg-slate-950/35
                p-5
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-slate-700
                hover:bg-slate-950/60
              "
            >
              {/* Card Glow */}

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
                  ${item.gradient}
                  opacity-[0.035]
                  blur-3xl
                  transition-opacity
                  duration-300
                  group-hover:opacity-[0.08]
                `}
              />

              {/* Top */}

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/[0.03]
                      ${item.iconBg}
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={item.iconColor}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200">
                      {item.title}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-slate-600">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold tracking-tight text-white">
                    {item.value}
                  </p>

                  <div className="mt-1 flex items-center justify-end gap-1">
                    <ArrowUpRight
                      size={10}
                      className="text-emerald-400"
                    />

                    <span className="text-[9px] text-slate-600">
                      Performance
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}

              <div className="relative mt-5">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                  <div
                    className={`
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      ${item.gradient}
                      shadow-[0_0_12px_rgba(34,211,238,0.12)]
                      transition-all
                      duration-1000
                    `}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] text-slate-700">
                    0
                  </span>

                  <span className="text-[9px] text-slate-700">
                    100
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          DETAIL METRICS
          ===================================================== */}

      <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
        <div
          className="
            grid
            overflow-hidden
            rounded-2xl
            border
            border-slate-800/70
            bg-slate-950/30
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {/* Attendance */}

          <div
            className="
              border-b
              border-slate-800/60
              p-4
              sm:border-r
              xl:border-b-0
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Attendance
              </span>

              <CalendarCheck2
                size={14}
                className="text-emerald-400/70"
              />
            </div>

            <div className="mt-3 flex items-end gap-3">
              <span className="text-lg font-bold text-emerald-400">
                {attendance.present}
              </span>

              <span className="pb-0.5 text-[10px] text-slate-600">
                Present
              </span>
            </div>

            <div className="mt-2 flex gap-3 text-[9px]">
              <span className="text-rose-400">
                A {attendance.absent}
              </span>

              <span className="text-amber-400">
                L {attendance.leave}
              </span>

              <span className="text-slate-600">
                {attendanceRecords} total
              </span>
            </div>
          </div>

          {/* Fees */}

          <div
            className="
              border-b
              border-slate-800/60
              p-4
              xl:border-b-0
              xl:border-r
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Fee Collection
              </span>

              <Wallet
                size={14}
                className="text-cyan-400/70"
              />
            </div>

            <p className="mt-3 text-lg font-bold text-cyan-400">
              {formatCurrency(fees.collected)}
            </p>

            <div className="mt-2 flex items-center gap-3 text-[9px]">
              <span className="text-amber-400">
                Pending {formatCurrency(fees.pending)}
              </span>

              {fees.overdue > 0 && (
                <span className="text-rose-400">
                  Overdue {formatCurrency(fees.overdue)}
                </span>
              )}
            </div>
          </div>

          {/* Students */}

          <div
            className="
              border-b
              border-slate-800/60
              p-4
              sm:border-b-0
              sm:border-r
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Students
              </span>

              <GraduationCap
                size={14}
                className="text-blue-400/70"
              />
            </div>

            <p className="mt-3 text-lg font-bold text-white">
              {students.total.toLocaleString()}
            </p>

            <div className="mt-2 flex gap-3 text-[9px]">
              <span className="text-blue-400">
                {students.active} Active
              </span>

              <span className="text-slate-600">
                {students.inactive} Inactive
              </span>
            </div>
          </div>

          {/* Results */}

          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Academic Results
              </span>

              <Award
                size={14}
                className="text-violet-400/70"
              />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-sm font-bold text-emerald-400">
                  {results.passed}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <XCircle
                  size={13}
                  className="text-rose-400"
                />

                <span className="text-sm font-bold text-rose-400">
                  {results.failed}
                </span>
              </div>
            </div>

            <p className="mt-2 text-[9px] text-slate-600">
              {resultPassRate.toFixed(1)}% pass rate
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER INSIGHT
          ===================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          gap-3
          border-t
          border-slate-800/60
          bg-slate-950/20
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
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
              bg-emerald-500/10
            "
          >
            <TrendingUp
              size={13}
              className="text-emerald-400"
            />
          </div>

          <div>
            <p className="text-[10px] font-medium text-slate-400">
              Academy health overview
            </p>

            <p className="mt-0.5 text-[9px] text-slate-700">
              Performance is calculated from current academy data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

          <span className="text-[9px] font-medium text-emerald-400">
            System healthy
          </span>
        </div>
      </div>
    </section>
  );
}