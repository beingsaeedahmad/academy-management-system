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

interface Props {
  filter: "all" | "active" | "new" | "defaulters";

  setFilter: React.Dispatch<
    React.SetStateAction<
      "all" | "active" | "new" | "defaulters"
    >
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
        console.error("LOAD STUDENT STATS ERROR:", error);
      }
    }

    loadStats();
  }, []);

const cards: (CardItem & {
  filterValue: "all" | "active" | "new" | "defaulters";
})[] = [
  {
    title: "Total Students",
    value: stats.totalStudents,
    icon: Users,
    filterValue: "all",
    color:
      "from-blue-500/20 via-blue-500/10 to-slate-900 border-blue-500/30 shadow-blue-500/20",
  },
  {
    title: "Active Students",
    value: stats.activeStudents,
    icon: UserCheck,
    filterValue: "active",
    color:
      "from-emerald-500/20 via-emerald-500/10 to-slate-900 border-emerald-500/30 shadow-emerald-500/20",
  },
  {
    title: "New Admissions",
    value: stats.newAdmissions,
    icon: UserPlus,
    filterValue: "new",
    color:
      "from-cyan-500/20 via-cyan-500/10 to-slate-900 border-cyan-500/30 shadow-cyan-500/20",
  },
  {
    title: "Fee Defaulters",
    value: stats.feeDefaulters,
    icon: Wallet,
    filterValue: "defaulters",
    color:
      "from-rose-500/20 via-rose-500/10 to-slate-900 border-rose-500/30 shadow-rose-500/20",
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

        const active =
          filter === card.filterValue;

        return (
          <button
            key={card.title}
            type="button"
            onClick={() => {
  if (filter === card.filterValue) {
    setFilter("all");
  } else {
    setFilter(card.filterValue);
  }
}}
            className={`
              rounded-0xl
              border
              bg-gradient-to-br
              ${card.color}
              p-5
              text-left
              backdrop-blur-xl
              shadow-[0_0_25px_rgba(37,99,235,0.12)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]
              ${
                active
                  ? "ring-2 ring-blue-500 scale-[1.02]"
                  : ""
              }
              cursor-pointer
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
                  rounded-0xl
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
          </button>
        );
      })}
    </div>
  );
}