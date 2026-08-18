"use client";

import { Suspense } from "react";
import FeesPageContent from "./FeesPageContent";

export default function FeesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
          <div className="text-slate-400">
            Loading fees...
          </div>
        </div>
      }
    >
      <FeesPageContent />
    </Suspense>
  );
}