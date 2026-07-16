"use client";

export default function AttendanceLegend() {
  return (
    <div className="flex gap-6 text-sm">

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-green-600" />
        Present
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-red-600" />
        Absent
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-yellow-500" />
        Leave
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-blue-600" />
        Holiday
      </div>

    </div>
  );
}