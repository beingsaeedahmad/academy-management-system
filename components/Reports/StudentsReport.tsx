"use client";

import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";

import {
  StudentReportData,
} from "./reportsTypes";

interface Props {
  data: StudentReportData;
}

export default function StudentsReport({
  data,
}: Props) {
  const items = [
    {
      label: "Total",
      value: data.total,
      icon: Users,
      className: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active",
      value: data.active,
      icon: UserCheck,
      className: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Inactive",
      value: data.inactive,
      icon: UserX,
      className: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      label: "New Admissions",
      value: data.newAdmissions,
      icon: UserPlus,
      className: "text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <h3 className="text-lg font-semibold text-white">
        Student Report
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Student enrollment overview
      </p>

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