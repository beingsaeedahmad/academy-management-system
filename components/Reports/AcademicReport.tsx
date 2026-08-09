"use client";

import {
  BookOpen,
  FileText,
  GraduationCap,
} from "lucide-react";

import {
  AcademicReportData,
} from "./reportsTypes";

interface Props {
  data: AcademicReportData;
}

export default function AcademicReport({
  data,
}: Props) {
  const items = [
    {
      label: "Subjects",
      value: data.totalSubjects,
      icon: BookOpen,
      className: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Notes",
      value: data.totalNotes,
      icon: FileText,
      className: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Classes",
      value: data.totalClasses,
      icon: GraduationCap,
      className: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <h3 className="text-lg font-semibold text-white">
        Academic Report
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Academic resources overview
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-center"
            >
              <div
                className={`mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}
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