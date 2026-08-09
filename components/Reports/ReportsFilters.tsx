"use client";

import {
  CalendarDays,
  Filter,
} from "lucide-react";

interface Props {
  month: string;
  year: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export default function ReportsFilters({
  month,
  year,
  onMonthChange,
  onYearChange,
}: Props) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Filter size={17} className="text-blue-400" />
          Report Filters
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <CalendarDays
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={month}
              onChange={(e) => onMonthChange(e.target.value)}
              className="h-10 min-w-[150px] appearance-none rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-4 text-sm text-slate-200 outline-none transition focus:border-blue-500"
            >
              <option value="all">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="h-10 min-w-[120px] rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-slate-200 outline-none transition focus:border-blue-500"
          >
            <option value="all">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
    </div>
  );
}