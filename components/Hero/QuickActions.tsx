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
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "New Admission",
    description: "Register a new student",
    href: "/admissions",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Add Student",
    description: "Create student profile",
    href: "/students",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Collect Fee",
    description: "Receive student fee",
    href: "/fees",
    icon: Wallet,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Attendance",
    description: "Mark today's attendance",
    href: "/attendance",
    icon: CalendarCheck2,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Reports",
    description: "Generate academy reports",
    href: "/reports",
    icon: FileText,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Upload Notes",
    description: "Upload class notes",
    href: "/notes",
    icon: BookOpen,
    color: "from-cyan-500 to-sky-500",
  },
];

export default function QuickActions() {
  return (
    <Card
      title="Quick Actions"
      subtitle="Frequently used shortcuts"
    >
      <div className="grid gap-4 sm:grid-cols-2">

        {actions.map((action) => {

          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="
                group
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/60
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500/40
                hover:shadow-[0_0_25px_rgba(37,99,235,.20)]
              "
            >

              <div className="flex items-start justify-between">

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    ${action.color}
                    text-white
                    shadow-lg
                  `}
                >
                  <Icon size={26} />
                </div>

                <ArrowRight
                  size={18}
                  className="
                    text-slate-500
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-blue-400
                  "
                />

              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {action.description}
              </p>

            </Link>
          );

        })}

      </div>
    </Card>
  );
}