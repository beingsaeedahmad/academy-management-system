"use client";

import {
  CalendarDays,
  CircleCheckBig,
  CircleX,
  Clock3,
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

    return date.toLocaleDateString();
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Attendance History
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Live attendance records from the database
          </p>

        </div>

        <CalendarDays
          size={28}
          className="text-blue-400"
        />

      </div>

      {/* Summary Cards */}

      <div className="mb-8 grid gap-4 md:grid-cols-4">

        <SummaryCard
          title="Present"
          value={present}
          color="green"
          icon={<CircleCheckBig size={22} />}
        />

        <SummaryCard
          title="Absent"
          value={absent}
          color="red"
          icon={<CircleX size={22} />}
        />

        <SummaryCard
          title="Late"
          value={late}
          color="yellow"
          icon={<Clock3 size={22} />}
        />

        <SummaryCard
          title="Attendance"
          value={`${percentage}%`}
          color="blue"
          icon={<CalendarDays size={22} />}
        />

      </div>

      {/* Attendance Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Date
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.length > 0 ? (
              attendance.map((record) => (
                <tr
                  key={record.id}
                  className="border-t border-slate-800 hover:bg-slate-900/60"
                >

                  <td className="px-5 py-4 text-white">
                    {formatDate(record.date)}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        record.status === "Present"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : record.status === "Absent"
                          ? "bg-red-500/20 text-red-400"
                          : record.status === "Late"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-slate-700 text-white"
                      }`}
                    >
                      {record.status}
                    </span>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={2}
                  className="px-5 py-10 text-center text-slate-400"
                >
                  No attendance records available.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "green" | "red" | "yellow" | "blue";
}

function SummaryCard({
  title,
  value,
  icon,
  color,
}: SummaryCardProps) {
  const styles = {
    green: "bg-emerald-500/10 text-emerald-400",
    red: "bg-red-500/10 text-red-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    blue: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/70 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}