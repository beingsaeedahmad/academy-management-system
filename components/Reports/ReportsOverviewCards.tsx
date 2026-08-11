"use client";

import {
  Users,
  UserCheck,
  CalendarCheck,
  Wallet,
  AlertCircle,
} from "lucide-react";

import { ReportsSummary } from "./reportsTypes";

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
      iconBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/30",
      glow: "bg-blue-500/5",
      topGlow: "via-blue-400/60",
    },
    {
      title: "Active Students",
      value: summary.activeStudents.toLocaleString(),
      subtitle: "Currently active",
      icon: UserCheck,
      iconClass: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/30",
      glow: "bg-emerald-500/5",
      topGlow: "via-emerald-400/60",
    },
    {
      title: "Attendance Rate",
      value: formatPercentage(summary.attendanceRate),
      subtitle: "Current attendance",
      icon: CalendarCheck,
      iconClass: "text-violet-400",
      iconBg: "bg-violet-500/10",
      border: "border-violet-500/20",
      hoverBorder: "hover:border-violet-500/30",
      glow: "bg-violet-500/5",
      topGlow: "via-violet-400/60",
    },
    {
      title: "Fees Collected",
      value: formatCurrency(summary.feesCollected),
      subtitle: "Total collected",
      icon: Wallet,
      iconClass: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/30",
      glow: "bg-cyan-500/5",
      topGlow: "via-cyan-400/60",
    },
    {
      title: "Pending Fees",
      value: formatCurrency(summary.feesPending),
      subtitle: "Outstanding amount",
      icon: AlertCircle,
      iconClass: "text-amber-400",
      iconBg: "bg-amber-500/10",
      border: "border-amber-500/20",
      hoverBorder: "hover:border-amber-500/30",
      glow: "bg-amber-500/5",
      topGlow: "via-amber-400/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              group
              relative
              overflow-hidden
              rounded-[22px]
              border
              ${card.border}
              ${card.hoverBorder}
              bg-[#071121]
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]
            `}
          >
            {/* Background Glow */}
            <div
              className={`
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-36
                w-36
                rounded-full
                ${card.glow}
                blur-3xl
                transition-all
                duration-500
                group-hover:scale-125
              `}
            />

            {/* Top Accent Line */}
            <div
              className={`
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-px
                w-2/3
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                ${card.topGlow}
                to-transparent
              `}
            />

            {/* Card Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 truncate text-2xl font-bold tracking-tight text-white">
                    {card.value}
                  </h2>

                  <p className="mt-2 truncate text-[10px] text-slate-600">
                    {card.subtitle}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`
                    ${card.iconBg}
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/5
                    transition-all
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <Icon
                    size={19}
                    className={card.iconClass}
                  />
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-5 flex items-center gap-2">
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${card.iconBg.replace("/10", "")}
                  `}
                />

                <span className="text-[9px] text-slate-600">
                  Academy overview
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}