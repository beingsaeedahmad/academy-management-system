"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/dashboardActions";

import {
  GraduationCap,
  CalendarCheck2,
  Wallet,
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

type Stats = Awaited<ReturnType<typeof getDashboardStats>>;

const cardThemes = [
  {
    title: "Students",
    subtitle: "Registered students",
    icon: GraduationCap,
    href: "/students",
    accent: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/30",
    glow: "group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    getValue: (stats: Stats) => stats.totalStudents.toLocaleString(),
    getMeta: () => "Total enrolled",
  },
  {
    title: "Attendance",
    subtitle: "Present today",
    icon: CalendarCheck2,
    href: "/attendance",
    accent: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/30",
    glow: "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
    getValue: (stats: Stats) => stats.presentStudents.toLocaleString(),
    getMeta: (stats: Stats) =>
      `${stats.absentStudents} absent · ${stats.totalStudents} total`,
  },
  {
    title: "Fees Collected",
    subtitle: "This month",
    icon: Wallet,
    href: "/fees",
    accent: "from-cyan-500 to-cyan-600",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/30",
    glow: "group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]",
    getValue: (stats: Stats) => `Rs. ${stats.collectedFee.toLocaleString()}`,
    getMeta: () => "Monthly collection",
  },
  {
    title: "Pending Fees",
    subtitle: "Outstanding balance",
    icon: AlertCircle,
    href: "/fees",
    accent: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/30",
    glow: "group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
    getValue: (stats: Stats) => `Rs. ${stats.pendingFees.toLocaleString()}`,
    getMeta: (stats: Stats) =>
      stats.overdueFees > 0
        ? `Rs. ${stats.overdueFees.toLocaleString()} overdue`
        : "No overdue fees",
  },
];

function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-slate-800" />
          <div className="h-9 w-24 rounded bg-slate-800" />
          <div className="h-3 w-32 rounded bg-slate-800/70" />
        </div>
        <div className="h-12 w-12 rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}

export default function DashboardCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
          <TrendingUp size={16} />
          Overview
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          SAEED EDUCATIONAL ACADEMY
        </h1>
        <p className="mt-1.5 text-slate-400">
          WELCOME TO MY ACADEMY SYSTEM
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))
          : stats &&
            cardThemes.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group block ${card.glow}`}
                >
                  <article
                    className={`
                      relative overflow-hidden rounded-2xl
                      border border-slate-800/80
                      bg-slate-900/40
                      p-6
                      backdrop-blur-sm
                      transition-all duration-300
                      hover:-translate-y-0.5
                      ${card.borderHover}
                    `}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.accent} opacity-60`}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-400">
                          {card.title}
                        </p>

                        <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-white">
                          {card.getValue(stats)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {card.subtitle}
                        </p>

                        <p className="mt-3 text-xs font-medium text-slate-400">
                          {card.getMeta(stats)}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                      >
                        <Icon size={22} className={card.iconColor} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors group-hover:text-blue-400">
                      View details
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </article>
                </Link>
              );
            })}
      </div>
    </section>
  );
}
