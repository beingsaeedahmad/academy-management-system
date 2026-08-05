"use client";

import Link from "next/link";
import Card from "../UI/Card";

import {
  UserPlus,
  GraduationCap,
  Wallet,
  CalendarCheck2,
  FileText,
  BookOpen,
  ArrowUpRight,
  Zap,
} from "lucide-react";

const actions = [
  {
    title: "New Admission",
    description: "Register a new student",
    href: "/admissions",
    icon: UserPlus,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    hoverBorder: "hover:border-blue-500/30",
  },
  {
    title: "Add Student",
    description: "Create student profile",
    href: "/students",
    icon: GraduationCap,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    hoverBorder: "hover:border-indigo-500/30",
  },
  {
    title: "Collect Fee",
    description: "Receive student payment",
    href: "/fees",
    icon: Wallet,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/30",
  },
  {
    title: "Attendance",
    description: "Mark today's attendance",
    href: "/attendance",
    icon: CalendarCheck2,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    hoverBorder: "hover:border-amber-500/30",
  },
  {
    title: "Reports",
    description: "Generate academy reports",
    href: "/reports",
    icon: FileText,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    hoverBorder: "hover:border-violet-500/30",
  },
  {
    title: "Upload Notes",
    description: "Share class materials",
    href: "/notes",
    icon: BookOpen,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/30",
  },
];

export default function QuickActions() {
  return (
    <Card
      hover={false}
      title="Quick Actions"
      subtitle="Frequently used shortcuts"
      icon={<Zap size={20} />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`
                group flex items-center gap-4 rounded-xl
                border border-slate-800/80
                bg-slate-900/30
                p-4
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-slate-900/60
                ${action.hoverBorder}
              `}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconBg}`}
              >
                <Icon size={20} className={action.iconColor} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white">
                  {action.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight
                size={16}
                className="shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400"
              />
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
