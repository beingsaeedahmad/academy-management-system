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
  TrendingUp,
} from "lucide-react";

import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Main",
    items: [
      { icon: LayoutDashboard, title: "Dashboard", href: "/" },
      { icon: ClipboardPenLine, title: "Admissions", href: "/admissions" },
      { icon: GraduationCap, title: "Students", href: "/students" },
    ],
  },
  {
    title: "Academics",
    items: [
      { icon: CalendarCheck2, title: "Attendance", href: "/attendance" },
      { icon: BarChart3, title: "Results", href: "/results" },
    ],
  },
  {
    title: "Finance",
    items: [
      { icon: Wallet, title: "Fees", href: "/fees" },
      { icon: FileText, title: "Reports", href: "/reports" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: Users, title: "Teachers", href: "/teachers" },
      { icon: School, title: "Classes", href: "/classes" },
      { icon: BookCopy, title: "Subjects", href: "/subjects" },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        icon: TrendingUp,
        title: "Analytics",
        href: "/analytics",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        icon: Settings,
        title: "Settings",
        href: "/settings",
      },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "/dashboard";
  return pathname.startsWith(href);
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`
        sticky top-0 flex h-screen shrink-0 flex-col
        border-r border-slate-800/80 bg-[#020617]/95 backdrop-blur-xl
        transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-[260px]"}
      `}
    >
      <div className="border-b border-slate-800/80 p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold tracking-wide text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.12)]">
  SA
</div>

            {!collapsed && (
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">
                  SAEED ACADEMY
                </h2>
                <p className="truncate text-xs text-slate-500">
                  Management System
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.map((section) => (
          <div key={section.title} className="mb-5">
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                {section.title}
              </p>
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    title={collapsed ? item.title : undefined}
                    className={`
                      flex items-center gap-3 rounded-xl px-3 py-2.5
                      text-sm font-medium transition-all duration-200
                      ${
                        active
                          ? "bg-blue-500/10 text-white"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <Icon
                      size={18}
                      className={active ? "text-blue-400" : "text-slate-500"}
                    />

                    {!collapsed && <span>{item.title}</span>}

                    {active && !collapsed && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800/80 p-4">
        <div
          className={`flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
            SA
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                Administrator
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-500">Online</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
