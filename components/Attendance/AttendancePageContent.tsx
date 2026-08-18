"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import AttendanceHeader from "./AttendanceHeader";
import AttendanceToolbar from "./AttendanceToolbar";
import AttendanceRegister from "./AttendanceRegister";
import AttendanceLegend from "./AttendanceLegend";
import AttendanceOverviewCards from "./AttendanceOverviewCards";

export default function AttendancePageContent() {
  const searchParams = useSearchParams();
  const selectedStudentId = searchParams.get("studentId");

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="w-full space-y-6 px-4 py-6">
        <AttendanceHeader />

        <AttendanceOverviewCards />

        <AttendanceToolbar
          month={month}
          year={year}
          onMonthChange={(m, y) => {
            setMonth(m);
            setYear(y);
          }}
        />

        <AttendanceRegister
          month={month}
          year={year}
          selectedStudentId={selectedStudentId}
        />

        <AttendanceLegend />
      </div>
    </div>
  );
}