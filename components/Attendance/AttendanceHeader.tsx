"use client";

import { CalendarDays, ClipboardCheck } from "lucide-react";

export default function AttendanceHeader() {
  return (
    <div
      className="
      flex
      flex-col
      gap-4
      rounded-2xl
      border
      border-slate-800
      bg-[#0F172A]
      p-6
      shadow-lg
      md:flex-row
      md:items-center
      md:justify-between
      "
    >

      {/* Left */}
      <div className="flex items-center gap-4">

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-600
          shadow-lg
          shadow-blue-600/30
          "
        >
          <ClipboardCheck className="h-7 w-7 text-white" />
        </div>


        <div>

          <h1 className="text-2xl font-bold text-white">
            Attendance Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Track student attendance and daily records
          </p>

        </div>

      </div>


      {/* Right */}
      <div
        className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        py-3
        "
      >

        <CalendarDays className="h-5 w-5 text-blue-400" />

        <div>
          <p className="text-xs text-slate-400">
            Current Session
          </p>

          <p className="font-semibold text-white">
            2026 - 2027
          </p>
        </div>

      </div>


    </div>
  );
}