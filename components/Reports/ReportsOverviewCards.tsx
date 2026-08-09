"use client";

import {
  Users,
  UserCheck,
  CalendarCheck,
  Wallet,
  AlertCircle,
} from "lucide-react";

import {
  ReportsSummary,
} from "./reportsTypes";

import {
  formatCurrency,
  formatPercentage,
} from "./reportsUtils";

interface Props {
  summary: ReportsSummary;
}

export default function ReportsOverviewCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Total Students",
      value: summary.totalStudents.toLocaleString(),
      subtitle: "All registered students",
      icon: Users,
      iconClass: "text-blue-400",
      bgClass: "bg-blue-500/10",
    },
    {
      title: "Active Students",
      value: summary.activeStudents.toLocaleString(),
      subtitle: "Currently active",
      icon: UserCheck,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
    {
      title: "Attendance Rate",
      value: formatPercentage(summary.attendanceRate),
      subtitle: "Current attendance",
      icon: CalendarCheck,
      iconClass: "text-violet-400",
      bgClass: "bg-violet-500/10",
    },
    {
      title: "Fees Collected",
      value: formatCurrency(summary.feesCollected),
      subtitle: "Total collected",
      icon: Wallet,
      iconClass: "text-cyan-400",
      bgClass: "bg-cyan-500/10",
    },
    {
      title: "Pending Fees",
      value: formatCurrency(summary.feesPending),
      subtitle: "Outstanding amount",
      icon: AlertCircle,
      iconClass: "text-amber-400",
      bgClass: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {card.value}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bgClass}`}
              >
                <Icon size={19} className={card.iconClass} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}