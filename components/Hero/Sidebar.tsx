"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardPenLine,
  GraduationCap,
  CalendarCheck2,
  Wallet,
  BarChart3,
  FileText,
  BookOpen,
  Users,
  School,
  BookCopy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Circle,
} from "lucide-react";

import { usePathname } from "next/navigation";

const menu = [
  {
    title: "MAIN",
    items: [
      {
        icon: LayoutDashboard,
        title: "Dashboard",
        href: "/",
      },
      {
        icon: ClipboardPenLine,
        title: "Admissions",
        href: "/admissions",
      },
      {
        icon: GraduationCap,
        title: "Students",
        href: "/students",
      },
    ],
  },

  {
    title: "ACADEMICS",
    items: [
      {
        icon: CalendarCheck2,
        title: "Attendance",
        href: "/attendance",
      },
      {
        icon: BarChart3,
        title: "Results",
        href: "/results",
      },
      {
        icon: BookOpen,
        title: "Notes",
        href: "/notes",
      },
    ],
  },

  {
    title: "FINANCE",
    items: [
      {
        icon: Wallet,
        title: "Fees",
        href: "/fees",
      },
      {
        icon: FileText,
        title: "Reports",
        href: "/reports",
      },
    ],
  },

  {
    title: "MANAGEMENT",
    items: [
      {
        icon: Users,
        title: "Teachers",
        href: "/teachers",
      },
      {
        icon: School,
        title: "Classes",
        href: "/classes",
      },
      {
        icon: BookCopy,
        title: "Subjects",
        href: "/subjects",
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        icon: Settings,
        title: "Settings",
        href: "/settings",
      },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  return (
    <aside
      className={`
        relative
        flex
        h-screen
        flex-col
        border-r
        border-slate-800
        bg-[#020617]
        transition-all
        duration-300
        ${
          collapsed
            ? "w-24"
            : "w-[300px]"
        }
      `}
    >
      {/* Logo */}

      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-cyan-500
                text-xl
                font-bold
                text-white
                shadow-[0_0_30px_rgba(37,99,235,.45)]
              "
            >
              SA
            </div>

            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-white">
                  Academy ERP
                </h2>

                <p className="text-sm text-slate-400">
                  Management System
                </p>
              </div>
            )}

          </div>

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              p-2
              text-slate-300
              transition-all
              duration-300
              hover:border-blue-500
              hover:text-white
              hover:shadow-[0_0_20px_rgba(37,99,235,.35)]
            "
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

        </div>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-6">

        {menu.map((section) => (

          <div
            key={section.title}
            className="mb-8"
          >

            {!collapsed && (
              <h3 className="mb-3 px-3 text-xs font-bold tracking-widest text-slate-500">
                {section.title}
              </h3>
            )}

            <div className="space-y-2">

              {section.items.map((item) => {

                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                 className={`
  group
  relative
  flex
  items-center
  gap-4
  rounded-2xl
  border
  px-4
  py-3
  transition-all
  duration-300

  ${
    pathname === item.href
      ? "border-blue-500/40 bg-blue-600/10 text-white shadow-[0_0_25px_rgba(37,99,235,.25)]"
      : "border-transparent text-slate-300 hover:border-blue-500/30 hover:bg-slate-900 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,.18)]"
  }
`}


                  >
                    <Icon
                      size={22}
                      className="text-blue-400"
                    />

                    {!collapsed && (
                      <span className="font-medium">
                        {item.title}
                      </span>
                    )}
                  </Link>
                );

              })}

            </div>

          </div>

        ))}

      </div>

      <div className="border-t border-slate-800 p-5">
  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-[0_0_25px_rgba(37,99,235,.08)]">

    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,.35)]">
        SA
      </div>

      {!collapsed && (
        <div className="flex-1">

          <h4 className="font-semibold text-white">
            Administrator
          </h4>

          <div className="mt-1 flex items-center gap-2">

            <Circle
              size={8}
              fill="#22C55E"
              className="text-green-500"
            />

            <span className="text-xs text-slate-400">
              Online
            </span>

          </div>

        </div>
      )}

    </div>

  </div>
</div>
    </aside>
  );
}