"use client";



import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  Wallet,
  Users,
} from "lucide-react";

interface MonthlyFee {
  month: string;
  amount: number;
}

interface MonthlyAttendance {
  month: string;
  present: number;
  absent: number;
  leave: number;
}

interface ClassDistribution {
  className: string;
  students: number;
}

interface AnalyticsChartsProps {
  monthlyFees: MonthlyFee[];
  monthlyAttendance: MonthlyAttendance[];
  classDistribution: ClassDistribution[];
  averageResult: number;
}

/* =========================================================
   HELPERS
========================================================= */

function formatCurrency(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000) {
    return `Rs. ${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `Rs. ${(value / 1_000).toFixed(1)}K`;
  }

  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function getMaxValue(values: number[]) {
  if (values.length === 0) return 1;

  return Math.max(...values, 1);
}

function getTotalAttendance(item: MonthlyAttendance) {
  return (
    item.present +
    item.absent +
    item.leave
  );
}

function getAttendancePercentage(
  value: number,
  total: number
) {
  if (total <= 0) return 0;

  return (value / total) * 100;
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyChart({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[300px]
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-800
        bg-slate-950/30
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
          "
        >
          <Icon
            size={20}
            className="text-slate-600"
          />
        </div>

        <p className="mt-4 text-xs font-medium text-slate-500">
          {message}
        </p>

        <p className="mt-1 text-[10px] text-slate-700">
          Data will appear here automatically
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CARD HEADER
========================================================= */

function ChartHeader({
  icon: Icon,
  title,
  subtitle,
  iconClass,
  iconBg,
  badge,
  badgeClass,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  iconClass: string;
  iconBg: string;
  badge?: string;
  badgeClass?: string;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-white/5
            ${iconBg}
          `}
        >
          <Icon
            size={19}
            className={iconClass}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-white">
              {title}
            </h2>
          </div>

          <p className="mt-1 truncate text-[11px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      {badge && (
        <span
          className={`
            shrink-0
            rounded-full
            border
            px-3
            py-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-wider
            ${badgeClass}
          `}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function AnalyticsCharts({
  monthlyFees,
  monthlyAttendance,
  classDistribution,
  averageResult,
}: AnalyticsChartsProps) {
  /* =======================================================
     FEES
  ======================================================= */

  const feeValues = monthlyFees.map(
    (item) => item.amount
  );

  const maxFee = getMaxValue(
    feeValues
  );

  const totalCollected =
    monthlyFees.reduce(
      (total, item) =>
        total + item.amount,
      0
    );

  const highestFee =
    monthlyFees.length > 0
      ? Math.max(
          ...monthlyFees.map(
            (item) => item.amount
          )
        )
      : 0;

  const highestFeeMonth =
    monthlyFees.find(
      (item) =>
        item.amount === highestFee
    )?.month ?? "--";

  /* =======================================================
     ATTENDANCE
  ======================================================= */

  const attendanceValues =
    monthlyAttendance.flatMap(
      (item) => [
        item.present,
        item.absent,
        item.leave,
      ]
    );

  const maxAttendance =
    getMaxValue(
      attendanceValues
    );

  const totalPresent =
    monthlyAttendance.reduce(
      (total, item) =>
        total + item.present,
      0
    );

  const totalAbsent =
    monthlyAttendance.reduce(
      (total, item) =>
        total + item.absent,
      0
    );

  const totalLeave =
    monthlyAttendance.reduce(
      (total, item) =>
        total + item.leave,
      0
    );

  const totalAttendance =
    totalPresent +
    totalAbsent +
    totalLeave;

  const overallPresentRate =
    totalAttendance > 0
      ? (totalPresent /
          totalAttendance) *
        100
      : 0;

  /* =======================================================
     CLASS DISTRIBUTION
  ======================================================= */

  const classValues =
    classDistribution.map(
      (item) => item.students
    );

  const maxStudents =
    getMaxValue(
      classValues
    );

  const totalClassStudents =
    classDistribution.reduce(
      (total, item) =>
        total + item.students,
      0
    );

  /* =======================================================
     RESULTS
  ======================================================= */

  const safeAverage = Math.min(
    Math.max(
      averageResult,
      0
    ),
    100
  );

  const resultStatus =
    safeAverage >= 80
      ? "Excellent"
      : safeAverage >= 60
      ? "Good"
      : safeAverage >= 40
      ? "Average"
      : "Needs Improvement";

  const resultStatusClass =
    safeAverage >= 80
      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
      : safeAverage >= 60
      ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
      : safeAverage >= 40
      ? "text-amber-400 border-amber-500/20 bg-amber-500/5"
      : "text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5";

  return (
    <div className="grid gap-5 xl:grid-cols-2">

      {/* =====================================================
          FEES COLLECTION
      ====================================================== */}

      <section
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-slate-800/80
          bg-[#071121]
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          hover:border-cyan-500/20
        "
      >
        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-52
            w-52
            rounded-full
            bg-cyan-500/5
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-2/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-cyan-400/60
            to-transparent
          "
        />

        <ChartHeader
          icon={Wallet}
          title="Fees Collection"
          subtitle="Monthly collection performance"
          iconClass="text-cyan-400"
          iconBg="bg-cyan-500/10"
          badge="Monthly"
          badgeClass="
            border-cyan-500/15
            bg-cyan-500/5
            text-cyan-400
          "
        />

        {monthlyFees.length === 0 ? (
          <EmptyChart
            icon={Wallet}
            message="No fee collection data available"
          />
        ) : (
          <>
            {/* KPI row */}

            <div className="mb-5 grid grid-cols-2 gap-3">
              <div
                className="
                  rounded-2xl
                  border
                  border-slate-800/70
                  bg-slate-950/40
                  p-3.5
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Total Collected
                  </span>
                </div>

                <p className="mt-2 text-lg font-bold tracking-tight text-white">
                  {formatCompactCurrency(
                    totalCollected
                  )}
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-800/70
                  bg-slate-950/40
                  p-3.5
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    Peak Month
                  </span>
                </div>

                <p className="mt-2 text-lg font-bold tracking-tight text-white">
                  {highestFeeMonth}
                </p>
              </div>
            </div>

            {/* Chart */}

            <div
              className="
                relative
                h-[260px]
                overflow-hidden
                rounded-2xl
                border
                border-slate-800/70
                bg-[#050d1c]
                p-4
              "
            >
              {/* Grid */}

              <div className="pointer-events-none absolute inset-x-4 inset-y-5 flex flex-col justify-between">
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      border-t
                      border-dashed
                      border-slate-800/70
                    "
                  />
                ))}
              </div>

              {/* Bars */}

              <div className="relative z-10 flex h-full items-end gap-3 pb-7">
                {monthlyFees.map(
                  (item) => {
                    const height =
                      (item.amount /
                        maxFee) *
                      100;

                    return (
                      <div
                        key={item.month}
                        className="
                          group/bar
                          relative
                          flex
                          h-full
                          min-w-[42px]
                          flex-1
                          flex-col
                          items-center
                          justify-end
                        "
                      >
                        {/* Value */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            bottom-full
                            left-1/2
                            z-30
                            mb-2
                            -translate-x-1/2
                            whitespace-nowrap
                            rounded-xl
                            border
                            border-cyan-500/20
                            bg-slate-950
                            px-3
                            py-2
                            text-[10px]
                            font-semibold
                            text-white
                            opacity-0
                            shadow-2xl
                            transition-all
                            duration-200
                            group-hover/bar:opacity-100
                          "
                        >
                          {formatCurrency(
                            item.amount
                          )}
                        </div>

                        {/* Bar */}

                        <div
                          className="
                            relative
                            w-full
                            max-w-[44px]
                            overflow-hidden
                            rounded-t-xl
                            border
                            border-cyan-400/10
                            bg-gradient-to-t
                            from-cyan-600/80
                            via-cyan-500/80
                            to-blue-400
                            shadow-[0_0_25px_rgba(34,211,238,0.12)]
                            transition-all
                            duration-500
                            group-hover/bar:from-cyan-400
                            group-hover/bar:to-blue-300
                          "
                          style={{
                            height: `${Math.max(
                              height,
                              4
                            )}%`,
                          }}
                        >
                          <div
                            className="
                              absolute
                              inset-x-0
                              top-0
                              h-px
                              bg-white/50
                            "
                          />

                          <div
                            className="
                              absolute
                              inset-x-0
                              top-0
                              h-1/2
                              bg-gradient-to-b
                              from-white/10
                              to-transparent
                            "
                          />
                        </div>

                        {/* Month */}

                        <span
                          className="
                            absolute
                            bottom-1
                            text-[9px]
                            font-medium
                            text-slate-600
                            transition-colors
                            group-hover/bar:text-slate-300
                          "
                        >
                          {item.month}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <span className="text-[10px] text-slate-500">
                  Collection trend
                </span>
              </div>

              <TrendingUp
                size={14}
                className="text-cyan-400"
              />
            </div>
          </>
        )}
      </section>

      {/* =====================================================
          ATTENDANCE TREND
      ====================================================== */}

      <section
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-slate-800/80
          bg-[#071121]
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          hover:border-emerald-500/20
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-52
            w-52
            rounded-full
            bg-emerald-500/5
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-2/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-emerald-400/60
            to-transparent
          "
        />

        <ChartHeader
          icon={CalendarCheck2}
          title="Attendance Trend"
          subtitle="Monthly attendance activity"
          iconClass="text-emerald-400"
          iconBg="bg-emerald-500/10"
          badge="Live"
          badgeClass="
            border-emerald-500/15
            bg-emerald-500/5
            text-emerald-400
          "
        />

        {monthlyAttendance.length === 0 ? (
          <EmptyChart
            icon={CalendarCheck2}
            message="No attendance data available"
          />
        ) : (
          <>
            {/* Attendance summary */}

            <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Overall Present Rate
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {overallPresentRate.toFixed(
                      1
                    )}
                    %
                  </span>

                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <ArrowUpRight
                      size={11}
                    />
                    Present
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[9px] text-slate-600">
                    Present
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    {totalPresent}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] text-slate-600">
                    Absent
                  </p>

                  <p className="mt-1 text-sm font-semibold text-red-400">
                    {totalAbsent}
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-[9px] text-slate-600">
                    Leave
                  </p>

                  <p className="mt-1 text-sm font-semibold text-amber-400">
                    {totalLeave}
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance rows */}

            <div className="space-y-4">
              {monthlyAttendance.map(
                (item) => {
                  const total =
                    getTotalAttendance(
                      item
                    );

                  const present =
                    getAttendancePercentage(
                      item.present,
                      total
                    );

                  const absent =
                    getAttendancePercentage(
                      item.absent,
                      total
                    );

                  const leave =
                    getAttendancePercentage(
                      item.leave,
                      total
                    );

                  return (
                    <div
                      key={item.month}
                      className="
                        rounded-2xl
                        border
                        border-slate-800/60
                        bg-slate-950/30
                        p-4
                        transition-all
                        duration-300
                        hover:border-emerald-500/10
                        hover:bg-slate-950/50
                      "
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-[9px] font-bold text-emerald-400">
                            {item.month.slice(
                              0,
                              3
                            )}
                          </span>

                          <div>
                            <p className="text-xs font-semibold text-slate-300">
                              {item.month}
                            </p>

                            <p className="text-[9px] text-slate-600">
                              {total} attendance records
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-white">
                          {present.toFixed(
                            0
                          )}
                          %
                        </span>
                      </div>

                      {/* Segmented bar */}

                      <div className="relative flex h-3 overflow-hidden rounded-full bg-slate-800/80">
                        {item.present > 0 && (
                          <div
                            className="
                              bg-emerald-500
                              shadow-[0_0_12px_rgba(16,185,129,0.25)]
                              transition-all
                              duration-500
                            "
                            style={{
                              width: `${present}%`,
                            }}
                          />
                        )}

                        {item.absent > 0 && (
                          <div
                            className="
                              bg-red-500
                              transition-all
                              duration-500
                            "
                            style={{
                              width: `${absent}%`,
                            }}
                          />
                        )}

                        {item.leave > 0 && (
                          <div
                            className="
                              bg-amber-400
                              transition-all
                              duration-500
                            "
                            style={{
                              width: `${leave}%`,
                            }}
                          />
                        )}
                      </div>

                      {/* Legend */}

                      <div className="mt-3 flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-[9px] text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          P {item.present}
                        </span>

                        <span className="flex items-center gap-1.5 text-[9px] text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          A {item.absent}
                        </span>

                        <span className="flex items-center gap-1.5 text-[9px] text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          L {item.leave}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}
      </section>

      {/* =====================================================
          CLASS DISTRIBUTION
      ====================================================== */}

      <section
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-slate-800/80
          bg-[#071121]
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          hover:border-violet-500/20
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -bottom-24
            h-56
            w-56
            rounded-full
            bg-violet-500/5
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-2/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-violet-400/60
            to-transparent
          "
        />

        <ChartHeader
          icon={Users}
          title="Class Distribution"
          subtitle="Student population by class"
          iconClass="text-violet-400"
          iconBg="bg-violet-500/10"
          badge="Overview"
          badgeClass="
            border-violet-500/15
            bg-violet-500/5
            text-violet-400
          "
        />

        {classDistribution.length === 0 ? (
          <EmptyChart
            icon={Users}
            message="No class data available"
          />
        ) : (
          <>
            {/* Total */}

            <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                  <GraduationCap
                    size={17}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-600">
                    Total Students
                  </p>

                  <p className="mt-0.5 text-lg font-bold text-white">
                    {totalClassStudents}
                  </p>
                </div>
              </div>

              <span className="text-[9px] text-slate-600">
                Top {Math.min(
                  classDistribution.length,
                  8
                )} classes
              </span>
            </div>

            {/* Classes */}

            <div className="space-y-3">
              {classDistribution
                .slice(0, 8)
                .map(
                  (
                    item,
                    index
                  ) => {
                    const width =
                      (item.students /
                        maxStudents) *
                      100;

                    const percentage =
                      totalClassStudents >
                      0
                        ? (item.students /
                            totalClassStudents) *
                          100
                        : 0;

                    return (
                      <div
                        key={
                          item.className
                        }
                        className="
                          group/class
                          rounded-2xl
                          border
                          border-transparent
                          p-2.5
                          transition-all
                          duration-300
                          hover:border-violet-500/10
                          hover:bg-slate-950/30
                        "
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span
                              className="
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-slate-800
                                text-[9px]
                                font-bold
                                text-slate-500
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span className="truncate text-xs font-medium text-slate-300">
                              {
                                item.className
                              }
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <span className="text-[9px] text-slate-600">
                              {percentage.toFixed(
                                0
                              )}
                              %
                            </span>

                            <span className="text-xs font-bold text-white">
                              {
                                item.students
                              }
                            </span>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
                          <div
                            className="
                              h-full
                              rounded-full
                              bg-gradient-to-r
                              from-violet-600
                              via-violet-500
                              to-fuchsia-400
                              shadow-[0_0_15px_rgba(139,92,246,0.18)]
                              transition-all
                              duration-700
                            "
                            style={{
                              width: `${Math.max(
                                width,
                                4
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-4">
              <span className="text-[10px] text-slate-600">
                Student distribution
              </span>

              <div className="flex items-center gap-1.5 text-[10px] text-violet-400">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                By class
                <ChevronRight
                  size={11}
                />
              </div>
            </div>
          </>
        )}
      </section>

      {/* =====================================================
          RESULTS PERFORMANCE
      ====================================================== */}

      <section
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-slate-800/80
          bg-[#071121]
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          hover:border-fuchsia-500/20
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -bottom-24
            h-56
            w-56
            rounded-full
            bg-fuchsia-500/5
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-2/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-fuchsia-400/60
            to-transparent
          "
        />

        <ChartHeader
          icon={BarChart3}
          title="Results Performance"
          subtitle="Overall academic performance"
          iconClass="text-fuchsia-400"
          iconBg="bg-fuchsia-500/10"
          badge="Academic"
          badgeClass="
            border-fuchsia-500/15
            bg-fuchsia-500/5
            text-fuchsia-400
          "
        />

        <div className="grid min-h-[340px] items-center gap-6 lg:grid-cols-[1fr_0.8fr]">

          {/* Ring */}

          <div className="flex justify-center">
            <div className="relative">

              {/* Outer glow */}

              <div
                className="
                  absolute
                  inset-[-18px]
                  rounded-full
                  bg-fuchsia-500/5
                  blur-2xl
                "
              />

              {/* Ring */}

              <div
                className="
                  relative
                  flex
                  h-56
                  w-56
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  background: `conic-gradient(
                    rgb(217 70 239) ${safeAverage}%,
                    rgb(30 41 59) 0
                  )`,
                }}
              >
                {/* Inner ring */}

                <div
                  className="
                    absolute
                    inset-[5px]
                    rounded-full
                    bg-[#071121]
                  "
                />

                {/* Center */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-44
                    w-44
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-800/70
                    bg-[#050d1c]
                    shadow-inner
                  "
                >
                  <span className="text-4xl font-bold tracking-tight text-white">
                    {safeAverage.toFixed(
                      1
                    )}
                    %
                  </span>

                  <span className="mt-2 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                    Average Score
                  </span>

                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.8)]" />

                    <span className="text-[9px] text-fuchsia-400">
                      Academic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance details */}

          <div className="space-y-3">

            <div
              className="
                rounded-2xl
                border
                border-slate-800/70
                bg-slate-950/40
                p-4
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-600">
                  Performance
                </span>

                <CheckCircle2
                  size={15}
                  className="text-fuchsia-400"
                />
              </div>

              <div className="mt-3 flex items-end justify-between">
                <span className="text-xl font-bold text-white">
                  {resultStatus}
                </span>

                <span
                  className={`
                    rounded-lg
                    border
                    px-2
                    py-1
                    text-[9px]
                    font-semibold
                    ${resultStatusClass}
                  `}
                >
                  {safeAverage.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Score scale */}

            <div
              className="
                rounded-2xl
                border
                border-slate-800/70
                bg-slate-950/40
                p-4
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  Score progress
                </span>

                <span className="text-[10px] font-semibold text-white">
                  {safeAverage.toFixed(
                    1
                  )}
                    / 100
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-violet-600
                    via-fuchsia-500
                    to-pink-400
                    shadow-[0_0_15px_rgba(217,70,239,0.3)]
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${safeAverage}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between text-[8px] text-slate-700">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            {/* Bottom insight */}

            <div className="flex items-center gap-3 rounded-2xl border border-fuchsia-500/10 bg-fuchsia-500/[0.03] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/10">
                <Activity
                  size={16}
                  className="text-fuchsia-400"
                />
              </div>

              <div>
                <p className="text-[10px] font-medium text-slate-300">
                  Academy average performance
                </p>

                <p className="mt-0.5 text-[9px] text-slate-600">
                  Based on available student results
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-slate-800/60 pt-4">
          <span className="text-[10px] text-slate-600">
            Academic performance
          </span>

          <span className="flex items-center gap-1.5 text-[10px] font-medium text-fuchsia-400">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            {resultStatus}
          </span>
        </div>
      </section>
    </div>
  );
}