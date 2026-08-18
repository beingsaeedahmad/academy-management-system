"use client";

import { Suspense } from "react";
import StudentsPageContent from "./StudentsPageContent";

export default function StudentsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white">
          <div className="text-slate-400">
            Loading students...
          </div>
        </div>
      }
    >
      <StudentsPageContent />
    </Suspense>
  );
}