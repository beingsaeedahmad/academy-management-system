"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import Charts from "./Charts";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* Sidebar + Main */}
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex flex-1 flex-col">

          {/* Navbar */}
          <Navbar />

          {/* Dashboard */}
          <main className="flex-1 p-6">

            <div className="space-y-6">

              <DashboardCards />

              <Charts />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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