"use client";

import Link from "next/link";
import Card from "../UI/Card";
import {
  UserPlus,
  Wallet,
  CalendarCheck2,
  GraduationCap,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New Admission",
    description: "Ali Hassan admitted to Class 8",
    time: "5 minutes ago",
    href: "/admissions",
    icon: UserPlus,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Fee Received",
    description: "Ayesha paid July fee",
    time: "20 minutes ago",
    href: "/fees",
    icon: Wallet,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: 3,
    title: "Attendance Updated",
    description: "Class 10 attendance marked",
    time: "1 hour ago",
    href: "/attendance",
    icon: CalendarCheck2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: 4,
    title: "Result Published",
    description: "Mid-term results uploaded",
    time: "3 hours ago",
    href: "/results",
    icon: GraduationCap,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

export default function RecentActivity() {
  return (
    <Card
      title="Recent Activity"
      subtitle="Latest updates from the academy"
    >
      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <Link
              key={activity.id}
              href={activity.href}
              className="flex flex-col items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900 sm:flex-row sm:items-start"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${activity.bg}`}
              >
                <Icon className={activity.color} size={22} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white break-words">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {activity.time}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}