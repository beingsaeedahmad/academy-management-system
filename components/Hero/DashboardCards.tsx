"use client";

import Link from "next/link";
import Card from "../UI/Card";

import {
  ClipboardPenLine,
  GraduationCap,
  CalendarCheck2,
  Wallet,
  BarChart3,
  FileText,
  Users,
  BookOpen,
  School,
  BookCopy,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    title: "Admissions",
    value: "120",
    subtitle: "New Admissions",
    icon: ClipboardPenLine,
    href: "/admissions",
  },
  {
    title: "Students",
    value: "520",
    subtitle: "Registered Students",
    icon: GraduationCap,
    href: "/students",
  },
  {
    title: "Attendance",
    value: "95%",
    subtitle: "Today's Attendance",
    icon: CalendarCheck2,
    href: "/attendance",
  },
  {
    title: "Fees",
    value: "Rs.450K",
    subtitle: "Collected This Month",
    icon: Wallet,
    href: "/fees",
  },
  {
    title: "Results",
    value: "18",
    subtitle: "Pending Results",
    icon: BarChart3,
    href: "/results",
  },
  {
    title: "Reports",
    value: "14",
    subtitle: "Generated Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    title: "Teachers",
    value: "28",
    subtitle: "Faculty Members",
    icon: Users,
    href: "/teachers",
  },
  {
    title: "Notes",
    value: "96",
    subtitle: "Uploaded Notes",
    icon: BookOpen,
    href: "/notes",
  },
  {
    title: "Classes",
    value: "15",
    subtitle: "Active Classes",
    icon: School,
    href: "/classes",
  },
  {
    title: "Subjects",
    value: "42",
    subtitle: "Available Subjects",
    icon: BookCopy,
    href: "/subjects",
  },
];

export default function DashboardCards() {
  return (
    <section>

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back to your Academy Management System.
        </p>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
            >
              <Card
                hover
                className="cursor-pointer"
              >
                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-white">
                      {card.value}
                    </h2>

                    <p className="mt-3 text-sm text-slate-500">
                      {card.subtitle}
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-600/10
                      text-blue-400
                      shadow-[0_0_20px_rgba(37,99,235,.25)]
                    "
                  >
                    <Icon size={28} />
                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-sm text-blue-400">
                    View Details
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-blue-400"
                  />

                </div>

              </Card>
            </Link>
          );

        })}

      </div>

    </section>
  );
}