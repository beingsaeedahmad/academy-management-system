"use client";

import AttendanceHeader from "./AttendanceHeader";
import AttendanceStats from "./AttendanceStats";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceTable from "./AttendanceTable";

export default function AttendancePage() {
  return (
    <div className="space-y-6 p-6">
      <AttendanceHeader />

      <AttendanceStats />?

      <AttendanceFilters />

      <AttendanceTable />
    </div>
  );
}