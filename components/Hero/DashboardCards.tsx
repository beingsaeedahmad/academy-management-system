
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
} from "lucide-react";

type Stats = Awaited<ReturnType<typeof getDashboardStats>>;

type CardTheme = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  href: string;
  accent: string;
  iconBg: string;
  iconColor: string;
  borderHover: string;
  glow: string;
  getValue: (stats: Stats) => string;
  getMeta: (stats: Stats) => string;
};

const cardThemes: CardTheme[] = [
  {
    title: "Admissions",
    subtitle: "Student admissions",
    icon: UserPlus,
    href: "/admissions",
    accent: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/30",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
    getValue: (stats) => stats.totalStudents.toLocaleString(),
    getMeta: () => "Manage admissions",
  },

  {
    title: "Students",
    subtitle: "Registered students",
    icon: GraduationCap,
    href: "/students",
    accent: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/30",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    getValue: (stats) => stats.totalStudents.toLocaleString(),
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
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
    getValue: (stats) =>
      stats.presentStudents.toLocaleString(),
    getMeta: (stats) =>
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
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]",
    getValue: (stats) =>
      `Rs. ${stats.collectedFee.toLocaleString()}`,
    getMeta: () => "Monthly collection",
  },

  {
    title: "Reports",
    subtitle: "Academy analytics",
    icon: BarChart3,
    href: "/reports",
    accent: "from-fuchsia-500 to-pink-600",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-400",
    borderHover: "hover:border-fuchsia-500/30",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(217,70,239,0.12)]",
    getValue: () => "Reports",
    getMeta: () => "View academy analytics",
  },

  {
    title: "Subjects",
    subtitle: "Academic subjects",
    icon: BookOpen,
    href: "/subjects",
    accent: "from-sky-500 to-blue-600",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    borderHover: "hover:border-sky-500/30",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(14,165,233,0.12)]",
    getValue: () => "Subjects",
    getMeta: () => "Manage academic subjects",
  },

  {
    title: "Settings",
    subtitle: "System configuration",
    icon: Settings,
    href: "/settings",
    accent: "from-slate-400 to-slate-600",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-300",
    borderHover: "hover:border-slate-500/30",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(148,163,184,0.10)]",
    getValue: () => "Settings",
    getMeta: () => "Configure academy system",
  },

  {
    title: "Analytics",
    subtitle: "Academy performance",
    icon: TrendingUp,
    href: "/analytics",
    accent: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/30",
    glow:
      "group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
    getValue: () => "Analytics",
    getMeta: () => "View academy performance",
  },
];

function StatCardSkeleton() {
  return (
    <article
      className="
        relative overflow-hidden rounded-2xl
        border border-slate-800/80
        bg-slate-900/40
        p-6
        backdrop-blur-sm
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />

          <div className="mt-3 h-9 w-32 animate-pulse rounded bg-slate-800" />

          <div className="mt-2 h-3 w-28 animate-pulse rounded bg-slate-800" />

          <div className="mt-4 h-3 w-36 animate-pulse rounded bg-slate-800" />
        </div>

        <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-800" />
      </div>

      <div className="mt-5 h-3 w-24 animate-pulse rounded bg-slate-800" />
    </article>
  );
}

export default function DashboardCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const data = await getDashboardStats();

        if (mounted) {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
          Overview
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          SAEED EDUCATIONAL ACADEMY
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Welcome to my academy system
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : stats ? (
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
                    hover:-translate-y-1
                    ${card.borderHover}
                  `}
                >
                  {/* Top Gradient Line */}
                  <div
                    className={`
                      absolute inset-x-0 top-0 h-px
                      bg-gradient-to-r
                      ${card.accent}
                      opacity-60
                    `}
                  />

                  {/* Card Content */}
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

                    {/* Icon */}
                    <div
                      className={`
                        flex h-12 w-12 shrink-0
                        items-center justify-center
                        rounded-xl
                        ${card.iconBg}
                      `}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className={card.iconColor}
                      />
                    </div>
                  </div>

                  {/* View Details */}
                  <div
                    className="
                      mt-5 flex items-center gap-1.5
                      text-xs font-medium text-slate-500
                      transition-colors
                      group-hover:text-blue-400
                    "
                  >
                    <span>View details</span>

                    <ArrowUpRight
                      size={14}
                      className="
                        transition-transform duration-200
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </div>

                  {/* Subtle Glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute -right-16 -top-16
                      h-32 w-32
                      rounded-full
                      bg-white/[0.02]
                      blur-3xl
                      opacity-0
                      transition-opacity duration-300
                      group-hover:opacity-100
                    "
                  />
                </article>
              </Link>
            );
          })
        ) : (
          <div
            className="
              col-span-full rounded-2xl
              border border-red-500/20
              bg-red-500/5
              p-6 text-sm text-red-400
            "
          >
            Unable to load dashboard statistics.
            Please try again.
          </div>
        )}
      </div>
    </section>
  );
}
