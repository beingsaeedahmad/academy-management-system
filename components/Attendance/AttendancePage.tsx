"use client";

import { Suspense } from "react";
import AttendancePageContent from "./AttendancePageContent";

export default function AttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
          <div className="text-slate-400">
            Loading attendance...
          </div>
        </div>
      }
    >
      <AttendancePageContent />
    </Suspense>
  );
}