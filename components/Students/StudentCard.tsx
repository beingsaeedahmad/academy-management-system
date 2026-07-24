"use client";

import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserPlus,
  Wallet,
  LucideIcon,
} from "lucide-react";

import { getStudentStats } from "@/actions/studentActions";

interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  newAdmissions: number;
  feeDefaulters: number;
}

interface CardItem {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StudentCard() {
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
        console.error("LOAD STUDENT STATS ERROR:", error);
      }
    }

    loadStats();
  }, []);

  const cards: CardItem[] = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color:
        "border-blue-500/30 from-blue-500/20 to-blue-900/20",
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: UserCheck,
      color:
        "border-green-500/30 from-green-500/20 to-green-900/20",
    },
    {
      title: "New Admissions",
      value: stats.newAdmissions,
      icon: UserPlus,
      color:
        "border-cyan-500/30 from-cyan-500/20 to-cyan-900/20",
    },
    {
      title: "Fee Defaulters",
      value: stats.feeDefaulters,
      icon: Wallet,
      color:
        "border-red-500/30 from-red-500/20 to-red-900/20",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              rounded-3xl
              border
              bg-gradient-to-br
              ${card.color}
              p-5
              backdrop-blur-xl
              shadow-[0_0_25px_rgba(37,99,235,0.12)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-md
                  shadow-inner
                "
              >
                <Icon
                  className="
                    h-7
                    w-7
                    text-white
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}