"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getDashboardStats } from "@/actions/dashboardActions";

import {
  GraduationCap,
  CalendarCheck2,
  Wallet,
  UserPlus,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Settings,
  TrendingUp,
  School,
  AlertCircle,
} from "lucide-react";

type Stats = Awaited<ReturnType<typeof getDashboardStats>>;

type KpiCard = {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  accent: string;
  iconBg: string;
  iconColor: string;
  getValue: (stats: Stats) => string;
  getMeta: (stats: Stats) => string;
};

const kpiCards: KpiCard[] = [
  {
    title: "Students",
    subtitle: "Active academy roster",
    href: "/students",
    icon: GraduationCap,
    accent: "from-blue-500 to-cyan-400",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    getValue: (stats) => stats.totalStudents.toLocaleString(),
    getMeta: (stats) => `${stats.totalClasses} classes enrolled`,
  },
  {
    title: "Attendance",
    subtitle: "Marked present today",
    href: "/attendance",
    icon: CalendarCheck2,
    accent: "from-emerald-500 to-teal-400",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    getValue: (stats) => stats.presentStudents.toLocaleString(),
    getMeta: (stats) =>
      `${stats.attendanceRate}% rate · ${stats.absentStudents} absent`,
  },
  {
    title: "Fees Collected",
    subtitle: "This month",
    href: "/fees",
    icon: Wallet,
    accent: "from-cyan-500 to-sky-400",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    getValue: (stats) => `Rs. ${stats.collectedFee.toLocaleString()}`,
    getMeta: (stats) => `Rs. ${stats.pendingFees.toLocaleString()} pending`,
  },
  {
    title: "Pending Dues",
    subtitle: "Outstanding this month",
    href: "/fees",
    icon: AlertCircle,
    accent: "from-amber-500 to-orange-400",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    getValue: (stats) => `Rs. ${stats.pendingFees.toLocaleString()}`,
    getMeta: (stats) =>
      `Rs. ${stats.overdueFees.toLocaleString()} overdue`,
  },
];

const modules = [
  {
    title: "Admissions",
    description: "Register new students",
    href: "/admissions",
    icon: UserPlus,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Classes",
    description: "Manage academic groups",
    href: "/classes",
    icon: School,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    title: "Subjects",
    description: "Curriculum and notes",
    href: "/subjects",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Results",
    description: "Exam performance",
    href: "/results",
    icon: BarChart3,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
  },
  {
    title: "Analytics",
    description: "Academy insights",
    href: "/analytics",
    icon: TrendingUp,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Settings",
    description: "System configuration",
    href: "/settings",
    icon: Settings,
    color: "text-slate-300",
    bg: "bg-slate-500/10",
  },
];

function StatCardSkeleton() {
  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
      <div className="mt-4 h-9 w-32 animate-pulse rounded bg-slate-800" />
      <div className="mt-3 h-3 w-36 animate-pulse rounded bg-slate-800" />
    </article>
  );
}

export default function DashboardCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        if (mounted) setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-400">
            Command Center
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {greeting}, Administrator
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Saeed Educational Academy — live operations for admissions,
            attendance, fees, and academics.
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                Classes
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {stats.totalClasses}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                Subjects
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {stats.totalSubjects}
              </p>
            </div>
            <div className="hidden rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 sm:block">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                Attendance
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {stats.attendanceRate}%
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : stats ? (
          kpiCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link key={card.title} href={card.href} className="group block">
                <article className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/45 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-[0_16px_40px_rgba(2,8,23,0.45)]">
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.accent} opacity-70`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-400">
                        {card.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-white">
                        {card.getValue(stats)}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {card.getMeta(stats)}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                    >
                      <Icon size={22} className={card.iconColor} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors group-hover:text-cyan-300">
                    <span>Open {card.title.toLowerCase()}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </article>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
            Unable to load dashboard statistics. Please try again.
          </div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {modules.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/35 px-4 py-3 transition hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon size={18} className={item.color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
