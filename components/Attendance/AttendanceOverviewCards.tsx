"use client";

import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";

import AttendanceOverviewCard from "./AttendanceOverviewCard";
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
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      title: "Present Today",
      value: summary.present,
      icon: UserCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "Absent Today",
      value: summary.absent,
      icon: UserX,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    },
    {
      title: "Late Students",
      value: summary.late,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <AttendanceOverviewCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          bg={card.bg}
          border={card.border}
        />
      ))}
    </div>
  );
}