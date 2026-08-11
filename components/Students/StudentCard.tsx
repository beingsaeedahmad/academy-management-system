"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Wallet,
  LucideIcon,
  ArrowUpRight,
} from "lucide-react";

import { getStudentStats } from "@/actions/studentActions";

type FilterType =
  | "all"
  | "active"
  | "new"
  | "defaulters";

interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  newAdmissions: number;
  feeDefaulters: number;
}

interface CardItem {
  title: string;
  value: number;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  filterValue: FilterType;
  color: string;
  bg: string;
  border: string;
  accent: string;
  glow: string;
}

interface Props {
  filter: FilterType;
  setFilter: React.Dispatch<
    React.SetStateAction<FilterType>
  >;
}

export default function StudentCard({
  filter,
  setFilter,
}: Props) {
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 0,
    activeStudents: 0,
    newAdmissions: 0,
    feeDefaulters: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStudentStats();
        setStats(data);
      } catch (error) {
        console.error(
          "LOAD STUDENT STATS ERROR:",
          error
        );
      }
    }

    loadStats();
  }, []);

  const cards: CardItem[] = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      subtitle: "Registered students",
      description: "Total enrolled",
      icon: Users,
      filterValue: "all",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      accent: "from-blue-500 to-cyan-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    },

    {
      title: "Active Students",
      value: stats.activeStudents,
      subtitle: "Currently active",
      description: "Active enrollment",
      icon: UserCheck,
      filterValue: "active",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      accent: "from-emerald-500 to-teal-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
    },

    {
      title: "New Admissions",
      value: stats.newAdmissions,
      subtitle: "Recent admissions",
      description: "Newly enrolled",
      icon: UserPlus,
      filterValue: "new",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      accent: "from-violet-500 to-purple-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
    },

    {
      title: "Fee Defaulters",
      value: stats.feeDefaulters,
      subtitle: "Students with pending fees",
      description: "Payment attention",
      icon: Wallet,
      filterValue: "defaulters",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      accent: "from-orange-500 to-amber-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(249,115,22,0.12)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const active =
          filter === card.filterValue;

        return (
          <button
            key={card.title}
            type="button"
            onClick={() =>
              setFilter(
                active
                  ? "all"
                  : card.filterValue
              )
            }
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              ${card.border}
              bg-[#071121]
              p-6
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-slate-700/80
              ${card.glow}
              ${
                active
                  ? "ring-1 ring-blue-500/50"
                  : ""
              }
            `}
          >
            {/* Top Accent */}
            <div
              className={`
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                ${card.accent}
                opacity-80
              `}
            />

            {/* Ambient Glow */}
            <div
              className={`
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-gradient-to-br
                ${card.accent}
                opacity-[0.035]
                blur-3xl
                transition-all
                duration-500
                group-hover:opacity-[0.10]
              `}
            />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {card.value.toLocaleString()}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`
                    relative
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.04]
                    ${card.bg}
                    transition-all
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-xl
                      bg-gradient-to-br
                      ${card.accent}
                      opacity-0
                      blur-md
                      transition-opacity
                      duration-300
                      group-hover:opacity-20
                    `}
                  />

                  <Icon
                    size={21}
                    className={`relative z-10 ${card.color}`}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Supporting Content */}
              <div className="mt-3">
                <p className="text-[11px] text-slate-500">
                  {card.subtitle}
                </p>

                <p className="mt-2 text-[11px] text-slate-400">
                  {card.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  View details
                </span>

                <span
                  className={`
                    flex
                    items-center
                    gap-1
                    text-[10px]
                    font-medium
                    ${card.color}
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  `}
                >
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}