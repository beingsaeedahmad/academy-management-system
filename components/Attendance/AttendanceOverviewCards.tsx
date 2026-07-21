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
  const [summary, setSummary] =
    useState<Summary>({
      totalStudents: 0,
      present: 0,
      absent: 0,
      late: 0,
    });

  useEffect(() => {
    async function loadSummary() {
      try {
        const data =
          await getAttendanceSummary();

        setSummary(data);
      } catch (error) {
        console.error(
          "LOAD SUMMARY ERROR:",
          error
        );
      }
    }

    loadSummary();
  }, []);

  const cards = [
    {
      title: "Total Students",
      value: summary.totalStudents,
      icon: Users,
      color:
        "from-blue-500/20 to-blue-900/40 border-blue-500/30",
    },
    {
      title: "Present Today",
      value: summary.present,
      icon: UserCheck,
      color:
        "from-emerald-500/20 to-emerald-900/40 border-emerald-500/30",
    },
    {
      title: "Absent Today",
      value: summary.absent,
      icon: UserX,
      color:
        "from-red-500/20 to-red-900/40 border-red-500/30",
    },
    {
      title: "Late Students",
      value: summary.late,
      icon: Clock,
      color:
        "from-amber-500/20 to-amber-900/40 border-amber-500/30",
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
      {cards.map((card) => (
        <AttendanceOverviewCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
}