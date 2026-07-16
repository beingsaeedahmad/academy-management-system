"use client";

import AttendanceMonthDropdown from "./AttendanceMonthDropdown";

export default function AttendanceToolbar() {
  return (
    <div
      className="
      flex
      flex-col
      gap-4
      rounded-xl
      border
      border-slate-800
      bg-slate-900
      p-4
      md:flex-row
      md:items-center
      md:justify-between
      "
    >

      {/* Left */}
      <div className="flex items-center gap-4">

        <div className="text-sm text-slate-400">
          Attendance Month
        </div>

        <AttendanceMonthDropdown />

      </div>


      {/* Right */}
      <button
        className="
        rounded-lg
        bg-blue-600
        px-5
        py-2
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        "
      >
        Today
      </button>


    </div>
  );
}