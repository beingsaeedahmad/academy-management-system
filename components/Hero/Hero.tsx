"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import Charts from "./Charts";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-[#020817] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.08)_0%,_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative flex">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-8">
              <DashboardCards />
              <Charts />

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <RecentActivity />
                <QuickActions />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
