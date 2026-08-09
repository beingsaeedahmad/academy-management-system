"use client";

import {
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarOff,
} from "lucide-react";

import {
  AttendanceReportData,
} from "./reportsTypes";

import {
  formatPercentage,
} from "./reportsUtils";

interface Props {
  data: AttendanceReportData;
}

export default function AttendanceReport({
  data,
}: Props) {
  const items = [
    {
      label: "Present",
      value: data.present,
      icon: CheckCircle2,
      className: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Absent",
      value: data.absent,
      icon: XCircle,
      className: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      label: "Leave",
      value: data.leave,
      icon: Clock3,
      className: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Holiday",
      value: data.holiday,
      icon: CalendarOff,
      className: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Attendance Report
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Attendance summary for selected period
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">
            Attendance Rate
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {formatPercentage(data.attendanceRate)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
            >
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}
              >
                <Icon size={17} className={item.className} />
              </div>

              <p className="text-xs text-slate-500">
                {item.label}
              </p>

              <p className="mt-1 text-xl font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}