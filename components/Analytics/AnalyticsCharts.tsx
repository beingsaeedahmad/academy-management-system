"use client";

import {
  Activity,
  BarChart3,
  CalendarCheck2,
  Wallet,
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

function formatCurrency(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function getMaxValue(values: number[]) {
  if (values.length === 0) return 1;

  return Math.max(...values, 1);
}

function EmptyChart({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
      <div className="text-center">
        <BarChart3
          size={28}
          className="mx-auto text-slate-700"
        />

        <p className="mt-3 text-xs text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}

export default function AnalyticsCharts({
  monthlyFees,
  monthlyAttendance,
  classDistribution,
  averageResult,
}: AnalyticsChartsProps) {
  const feeValues = monthlyFees.map(
    (item) => item.amount
  );

  const maxFee = getMaxValue(feeValues);

  const attendanceValues = monthlyAttendance.flatMap(
    (item) => [
      item.present,
      item.absent,
      item.leave,
    ]
  );

  const maxAttendance =
    getMaxValue(attendanceValues);

  const classValues = classDistribution.map(
    (item) => item.students
  );

  const maxStudents =
    getMaxValue(classValues);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {/* ================================================== */}
      {/* MONTHLY FEES */}
      {/* ================================================== */}

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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60" />

        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
              <Wallet
                size={19}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Fees Collection
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Monthly collection overview
              </p>
            </div>
          </div>

          <span className="rounded-lg border border-cyan-500/10 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-medium text-cyan-400">
            Monthly
          </span>
        </div>

        {monthlyFees.length === 0 ? (
          <EmptyChart message="No fee collection data available" />
        ) : (
          <div className="h-64">
            <div className="flex h-full items-end gap-3 overflow-x-auto pb-7">
              {monthlyFees.map((item) => {
                const height =
                  (item.amount / maxFee) * 100;

                return (
                  <div
                    key={item.month}
                    className="group flex h-full min-w-[48px] flex-1 flex-col items-center justify-end"
                  >
                    <div className="relative flex h-full w-full items-end justify-center">
                      <div
                        className="
                          w-full
                          max-w-[42px]
                          rounded-t-lg
                          bg-gradient-to-t
                          from-cyan-600/60
                          to-blue-500
                          transition-all
                          duration-500
                          group-hover:from-cyan-500
                          group-hover:to-blue-400
                        "
                        style={{
                          height: `${Math.max(
                            height,
                            3
                          )}%`,
                        }}
                      >
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-xl group-hover:block">
                          {formatCurrency(
                            item.amount
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="absolute mt-[calc(16rem-1rem)] text-[10px] text-slate-600">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* ATTENDANCE TREND */}
      {/* ================================================== */}

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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500 to-teal-500 opacity-60" />

        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <CalendarCheck2
                size={19}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Attendance Trend
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Monthly attendance activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Present
            </span>

            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Absent
            </span>

            <span className="hidden items-center gap-1.5 text-slate-500 sm:flex">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Leave
            </span>
          </div>
        </div>

        {monthlyAttendance.length === 0 ? (
          <EmptyChart message="No attendance data available" />
        ) : (
          <div className="space-y-5">
            {monthlyAttendance.map((item) => {
              const presentWidth =
                (item.present / maxAttendance) *
                100;

              const absentWidth =
                (item.absent / maxAttendance) *
                100;

              const leaveWidth =
                (item.leave / maxAttendance) *
                100;

              return (
                <div key={item.month}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      {item.month}
                    </span>

                    <span className="text-[10px] text-slate-600">
                      {item.present +
                        item.absent +
                        item.leave}{" "}
                      records
                    </span>
                  </div>

                  <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-800">
                    {item.present > 0 && (
                      <div
                        className="bg-emerald-500 transition-all duration-500"
                        style={{
                          width: `${presentWidth}%`,
                        }}
                      />
                    )}

                    {item.absent > 0 && (
                      <div
                        className="bg-red-500 transition-all duration-500"
                        style={{
                          width: `${absentWidth}%`,
                        }}
                      />
                    )}

                    {item.leave > 0 && (
                      <div
                        className="bg-amber-400 transition-all duration-500"
                        style={{
                          width: `${leaveWidth}%`,
                        }}
                      />
                    )}
                  </div>

                  <div className="mt-2 flex gap-4 text-[10px]">
                    <span className="text-emerald-400">
                      P {item.present}
                    </span>

                    <span className="text-red-400">
                      A {item.absent}
                    </span>

                    <span className="text-amber-400">
                      L {item.leave}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* CLASS DISTRIBUTION */}
      {/* ================================================== */}

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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-60" />

        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Activity
                size={19}
                className="text-violet-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Class Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Students by class
              </p>
            </div>
          </div>
        </div>

        {classDistribution.length === 0 ? (
          <EmptyChart message="No class data available" />
        ) : (
          <div className="space-y-4">
            {classDistribution
              .slice(0, 8)
              .map((item) => {
                const width =
                  (item.students /
                    maxStudents) *
                  100;

                return (
                  <div key={item.className}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="truncate text-xs font-medium text-slate-400">
                        {item.className}
                      </span>

                      <span className="shrink-0 text-xs font-semibold text-white">
                        {item.students}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          from-violet-500
                          to-fuchsia-500
                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${Math.max(
                            width,
                            3
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* RESULTS PERFORMANCE */}
      {/* ================================================== */}

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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-60" />

        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10">
              <BarChart3
                size={19}
                className="text-fuchsia-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Results Performance
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Overall academic performance
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-fuchsia-400">
            {averageResult.toFixed(1)}%
          </span>
        </div>

        <div className="flex min-h-[260px] flex-col items-center justify-center">
          {/* Circular Progress */}
          <div
            className="relative flex h-44 w-44 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(
                rgb(217 70 239) ${Math.min(
                  Math.max(
                    averageResult,
                    0
                  ),
                  100
                )}%,
                rgb(30 41 59) 0
              )`,
            }}
          >
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-slate-950">
              <span className="text-3xl font-bold text-white">
                {averageResult.toFixed(1)}%
              </span>

              <span className="mt-1 text-[10px] text-slate-600">
                Average Score
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/10">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            </span>

            <span className="text-xs text-slate-500">
              Academy average performance
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}