"use client";

import AttendanceHeader from "./AttendanceHeader";
import AttendanceToolbar from "./AttendanceToolbar";
import AttendanceRegister from "./AttendanceRegister";
import AttendanceLegend from "./AttendanceLegend";
import AttendanceOverviewCards from "./AttendanceOverviewCards";

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">

      <div className="mx-auto max-w-[1900px] space-y-6 p-6">

        <AttendanceHeader />

        <AttendanceOverviewCards />

        <AttendanceToolbar />

        <AttendanceRegister />

        <AttendanceLegend />

        

      </div>

    </div>
  );
}