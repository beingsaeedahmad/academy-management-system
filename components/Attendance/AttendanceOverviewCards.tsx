"use client";

import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import { getAttendanceSummary } from "@/actions/attendanceSummaryActions";

interface Summary {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
}

export default function AttendanceOverviewCards() {
  const [summary, setSummary] = useState<Summary>({
    totalStudents: 0,
    present: 0,
    absent: 0,
    late: 0,
  });

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getAttendanceSummary();
        setSummary(data);
      } catch (error) {
        console.error("LOAD SUMMARY ERROR:", error);
      }
    }

    loadSummary();
  }, []);

  const cards = [
    {
      title: "Total Students",
      value: summary.totalStudents,
      subtitle: "Registered students",
      description: "Total enrolled",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      accent: "from-blue-500 to-cyan-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    },
    {
      title: "Present Today",
      value: summary.present,
      subtitle: "Attendance present",
      description: "Students present today",
      icon: UserCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      accent: "from-emerald-500 to-teal-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
    },
    {
      title: "Absent Today",
      value: summary.absent,
      subtitle: "Attendance absent",
      description: "Students absent today",
      icon: UserX,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      accent: "from-red-500 to-rose-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]",
    },
    {
      title: "Late Students",
      value: summary.late,
      subtitle: "Late attendance",
      description: "Students arrived late",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      accent: "from-amber-500 to-orange-500",
      glow:
        "hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              ${card.border}
              bg-[#071121]
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-slate-700/80
              ${card.glow}
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

                  <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
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
          </article>
        );
      })}
    </div>
  );
}