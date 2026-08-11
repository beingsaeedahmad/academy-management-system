"use client";

import {
  CalendarDays,
  CircleCheckBig,
  CircleX,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { Student } from "@/types";

interface Props {
  student: Student;
  present: number;
  absent: number;
  late: number;
}

export default function AttendanceHistory({
  student,
  present,
  absent,
  late,
}: Props) {
  const attendance = student.attendance ?? [];

  const percentage =
    attendance.length === 0
      ? 0
      : Math.round((present / attendance.length) * 100);

  const formatDate = (
    value: Date | string | null | undefined
  ) => {
    if (!value) return "-";

    const date =
      typeof value === "string"
        ? new Date(value)
        : value;

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/60
        p-6
        shadow-2xl
        shadow-black/20
        backdrop-blur-xl
        sm:p-7
      "
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-48
          w-48
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-48
          w-48
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* Header */}
      <div
        className="
          relative
          mb-7
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-blue-500/20
                bg-blue-500/10
                text-blue-400
                shadow-lg
                shadow-blue-500/5
              "
            >
              <CalendarDays size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Attendance History
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Live attendance records from the database
              </p>
            </div>
          </div>
        </div>

        {/* Attendance percentage badge */}
        <div
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/5
            px-4
            py-2.5
          "
        >
          <TrendingUp
            size={17}
            className="text-blue-400"
          />

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Attendance
            </p>

            <p className="text-sm font-bold text-white">
              {percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="relative mb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">
            Overall Attendance
          </span>

          <span className="text-xs font-semibold text-blue-400">
            {present}/{attendance.length || 0} days
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-blue-400
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-700
            "
            style={{
              width: `${Math.min(percentage, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="relative mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Present"
          value={present}
          subtitle="Days present"
          color="green"
          icon={<CircleCheckBig size={20} />}
        />

        <SummaryCard
          title="Absent"
          value={absent}
          subtitle="Days absent"
          color="red"
          icon={<CircleX size={20} />}
        />

        <SummaryCard
          title="Late"
          value={late}
          subtitle="Late arrivals"
          color="yellow"
          icon={<Clock3 size={20} />}
        />

        <SummaryCard
          title="Attendance"
          value={`${percentage}%`}
          subtitle="Overall percentage"
          color="blue"
          icon={<CalendarDays size={20} />}
        />
      </div>

      {/* Records Header */}
      <div className="relative mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Attendance Records
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Recent attendance activity
          </p>
        </div>

        <span
          className="
            rounded-full
            border
            border-slate-700
            bg-slate-800/60
            px-3
            py-1
            text-xs
            text-slate-400
          "
        >
          {attendance.length} Records
        </span>
      </div>

      {/* Attendance Table */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-slate-950/40
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-800
                  bg-slate-900/80
                "
              >
                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Date
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-right
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Record
                </th>
              </tr>
            </thead>

            <tbody>
              {attendance.length > 0 ? (
                attendance.map((record) => (
                  <tr
                    key={record.id}
                    className="
                      group
                      border-t
                      border-slate-800/80
                      transition-all
                      duration-200
                      hover:bg-slate-800/30
                    "
                  >
                    {/* Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-800/70
                            text-slate-400
                            transition
                            group-hover:border-blue-500/20
                            group-hover:text-blue-400
                          "
                        >
                          <CalendarDays size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {formatDate(record.date)}
                          </p>

                          <p className="mt-0.5 text-[11px] text-slate-500">
                            Attendance date
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={record.status}
                      />
                    </td>

                    {/* Record */}
                    <td className="px-5 py-4 text-right">
                      <span className="text-xs text-slate-600">
                        #{record.id.slice(0, 6)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="
                          mb-4
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-slate-800
                          bg-slate-900
                          text-slate-600
                        "
                      >
                        <CalendarDays size={25} />
                      </div>

                      <p className="text-sm font-medium text-slate-400">
                        No attendance records
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Attendance data will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* Summary Card */
/* ------------------------------------------------ */

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: "green" | "red" | "yellow" | "blue";
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: SummaryCardProps) {
  const styles = {
    green: {
      border: "border-emerald-500/20",
      background: "bg-emerald-500/[0.04]",
      iconBg: "bg-emerald-500/10",
      icon: "text-emerald-400",
      glow: "group-hover:shadow-emerald-500/10",
    },

    red: {
      border: "border-red-500/20",
      background: "bg-red-500/[0.04]",
      iconBg: "bg-red-500/10",
      icon: "text-red-400",
      glow: "group-hover:shadow-red-500/10",
    },

    yellow: {
      border: "border-amber-500/20",
      background: "bg-amber-500/[0.04]",
      iconBg: "bg-amber-500/10",
      icon: "text-amber-400",
      glow: "group-hover:shadow-amber-500/10",
    },

    blue: {
      border: "border-blue-500/20",
      background: "bg-blue-500/[0.04]",
      iconBg: "bg-blue-500/10",
      icon: "text-blue-400",
      glow: "group-hover:shadow-blue-500/10",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        ${style.border}
        ${style.background}
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${style.glow}
      `}
    >
      {/* Small glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          ${style.iconBg}
          blur-2xl
          opacity-60
        `}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            {value}
          </h3>

          <p className="mt-1 text-[11px] text-slate-600">
            {subtitle}
          </p>
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${style.iconBg}
            ${style.icon}
            transition-all
            duration-300
            group-hover:scale-110
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* Status Badge */
/* ------------------------------------------------ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles =
    status === "Present"
      ? {
          wrapper:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
          dot: "bg-emerald-400",
          icon: <CircleCheckBig size={13} />,
        }
      : status === "Absent"
      ? {
          wrapper:
            "border-red-500/20 bg-red-500/10 text-red-400",
          dot: "bg-red-400",
          icon: <CircleX size={13} />,
        }
      : status === "Late"
      ? {
          wrapper:
            "border-amber-500/20 bg-amber-500/10 text-amber-400",
          dot: "bg-amber-400",
          icon: <Clock3 size={13} />,
        }
      : {
          wrapper:
            "border-slate-700 bg-slate-800 text-slate-300",
          dot: "bg-slate-400",
          icon: <CalendarDays size={13} />,
        };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        ${styles.wrapper}
      `}
    >
      {styles.icon}

      {status}
    </span>
  );
}