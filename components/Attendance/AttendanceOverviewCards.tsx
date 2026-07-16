"use client";

import {
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";

import AttendanceOverviewCard from "./AttendanceOverviewCard";


export default function AttendanceOverviewCards() {

  const cards = [
{
  title: "Total Students",
  value: 0,
  icon: Users,
  color: "from-blue-500/20 to-blue-900/40 border-blue-500/30",
},
{
  title: "Present Today",
  value: 0,
  icon: UserCheck,
  color: "from-emerald-500/20 to-emerald-900/40 border-emerald-500/30",
},
{
  title: "Absent Today",
  value: 0,
  icon: UserX,
  color: "from-red-500/20 to-red-900/40 border-red-500/30",
},
{
  title: "Late Students",
  value: 0,
  icon: Clock,
  color: "from-amber-500/20 to-amber-900/40 border-amber-500/30",
},
  ];


  return (
    <div
      className="
      grid
      gap-5
      sm:grid-cols-2
      xl:grid-cols-4
      "
    >

      {cards.map((card)=>(
        <AttendanceOverviewCard
          key={card.title}
          {...card}
        />
      ))}

    </div>
  );
}