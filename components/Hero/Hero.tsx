"use client";

import DashboardCards from "./DashboardCards";
import Charts from "./Charts";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export default function Hero() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-8">
      <DashboardCards />
      <Charts />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}
