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
  icon: LucideIcon;
  filterValue: FilterType;
  color: string;
  bg: string;
  border: string;
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
      filterValue: "all",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: UserCheck,
      filterValue: "active",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "New Admissions",
      value: stats.newAdmissions,
      icon: UserPlus,
      filterValue: "new",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
    },
    {
      title: "Fee Defaulters",
      value: stats.feeDefaulters,
      icon: Wallet,
      filterValue: "defaulters",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const active = filter === card.filterValue;

        return (
          <button
            key={card.title}
            type="button"
            onClick={() =>
              setFilter(active ? "all" : card.filterValue)
            }
            className={`
              rounded-2xl
              border
              ${card.border}
              bg-slate-900
              p-6
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              ${active ? "ring-2 ring-blue-500" : ""}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`
                  ${card.bg}
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                `}
              >
                <Icon
                  className={`${card.color} h-7 w-7`}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}