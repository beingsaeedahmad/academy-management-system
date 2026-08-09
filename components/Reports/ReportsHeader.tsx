"use client";

import {
  BarChart3,
  Download,
  FileText,
} from "lucide-react";

interface Props {
  onExport?: () => void;
}

export default function ReportsHeader({ onExport }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500">
            <BarChart3 size={21} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            Reports
          </h1>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Analyze students, attendance, fees and academic performance.
        </p>
      </div>

      <button
        onClick={onExport}
        className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-blue-500 hover:bg-slate-800"
      >
        <Download size={17} />
        Export Report
      </button>
    </div>
  );
}