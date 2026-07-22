"use client";

import Link from "next/link";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/dashboardActions";

import {
  GraduationCap,
  CalendarCheck2,
  Wallet,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentStudents: 0,
    absentStudents: 0,
    pendingFees: 0,
    overdueFees: 0,
    collectedFee: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Students",
      value: stats.totalStudents.toString(),
      subtitle: "Registered Students",
      icon: GraduationCap,
      href: "/students",
    },
    {
      title: "Attendance",
      value: stats.presentStudents.toString(),
      subtitle: "Present Today",
      icon: CalendarCheck2,
      href: "/attendance",
    },
    {
      title: "Fees",
      value: `Rs. ${stats.collectedFee.toLocaleString()}`,
      subtitle: "Collected Fees",
      icon: Wallet,
      href: "/fees",
    },
    {
      title: "Pending Fees",
      value: stats.pendingFees.toString(),
      subtitle: "Pending Payments",
      icon: BarChart3,
      href: "/fees",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="mt-2 text-slate-400">
          Welcome back to your Academy Management System.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link key={card.title} href={card.href}>
              <Card hover className="cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{card.title}</p>

                    <h2 className="mt-3 text-4xl font-bold text-white">
                      {card.value}
                    </h2>

                    <p className="mt-3 text-sm text-slate-500">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,.25)]">
                    <Icon size={28} />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-blue-400">
                    View Details
                  </span>

                  <ArrowUpRight size={18} className="text-blue-400" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}