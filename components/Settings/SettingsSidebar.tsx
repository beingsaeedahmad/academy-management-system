"use client";

import {
  AlertTriangle,
  Bell,
  Building2,
  CircleHelp,
  Database,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  UserCircle,
} from "lucide-react";

import { SettingsSection } from "./settingsTypes";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

interface SidebarItem {
  id: SettingsSection;
  label: string;
  description: string;
  icon: React.ReactNode;
  danger?: boolean;
}

const menu = [
  {
    title: "General",
    items: [
      {
        id: "general" as SettingsSection,
        icon: <SlidersHorizontal size={18} />,
        title: "General",
        description: "General preferences",
      },
      {
        id: "academy" as SettingsSection,
        icon: <Building2 size={18} />,
        title: "Academy",
        description: "Academy information",
      },
    ],
  },
  {
    title: "Personalization",
    items: [
      {
        id: "appearance" as SettingsSection,
        icon: <Palette size={18} />,
        title: "Appearance",
        description: "System appearance",
      },
      {
        id: "notifications" as SettingsSection,
        icon: <Bell size={18} />,
        title: "Notifications",
        description: "Notification preferences",
      },
    ],
  },
  {
    title: "Security & Account",
    items: [
      {
        id: "security" as SettingsSection,
        icon: <ShieldCheck size={18} />,
        title: "Security",
        description: "Security preferences",
      },
      {
        id: "account" as SettingsSection,
        icon: <UserCircle size={18} />,
        title: "Account",
        description: "Account information",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        id: "backup" as SettingsSection,
        icon: <Database size={18} />,
        title: "Backup",
        description: "System backups",
      },
      {
        id: "danger" as SettingsSection,
        icon: <AlertTriangle size={18} />,
        title: "Danger Zone",
        description: "Sensitive actions",
        danger: true,
      },
    ],
  },
];

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col border-r border-slate-800/80 bg-[#020617]/95 backdrop-blur-xl">
      {/* --------------------------------------------------------------- */}
      {/* Header                                                          */}
      {/* --------------------------------------------------------------- */}

      <div className="border-b border-slate-800/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <SlidersHorizontal size={17} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-white">
              Settings
            </h2>

            <p className="truncate text-xs text-slate-500">
              System Configuration
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Navigation                                                      */}
      {/* --------------------------------------------------------------- */}

      <nav className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.map((section) => (
          <div key={section.title} className="mb-5">
            {/* Section Title */}
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              {section.title}
            </p>

            {/* Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onSectionChange(item.id)
                    }
                    className={[
                      "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
                      "text-left text-sm font-medium",
                      "transition-all duration-200",
                      active
                        ? item.danger
                          ? "bg-red-500/10 text-white"
                          : "bg-blue-500/10 text-white"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-white",
                    ].join(" ")}
                  >
                    {/* Icon */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <span
                        className={
                          active
                            ? item.danger
                              ? "text-red-400"
                              : "text-blue-400"
                            : item.danger
                              ? "text-red-500/60 group-hover:text-red-400"
                              : "text-slate-500 group-hover:text-slate-300"
                        }
                      >
                        {item.icon}
                      </span>
                    </span>

                    {/* Text */}
                    <span className="min-w-0 flex-1">
                      <span
                        className={[
                          "block truncate text-sm font-medium",
                          active
                            ? item.danger
                              ? "text-red-300"
                              : "text-white"
                            : "text-slate-400 group-hover:text-white",
                        ].join(" ")}
                      >
                        {item.title}
                      </span>

                      <span className="mt-0.5 block truncate text-[9px] font-normal text-slate-600 group-hover:text-slate-500">
                        {item.description}
                      </span>
                    </span>

                    {/* Active Indicator */}
                    {active && (
                      <span
                        className={[
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          item.danger
                            ? "bg-red-400"
                            : "bg-blue-400",
                        ].join(" ")}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* --------------------------------------------------------------- */}
      {/* Help Card                                                       */}
      {/* --------------------------------------------------------------- */}

      <div className="border-t border-slate-800/80 p-4">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <CircleHelp size={17} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">
                Need Help?
              </p>

              <p className="mt-0.5 truncate text-[9px] text-slate-500">
                Visit our help center
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-[10px] font-medium text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-white"
          >
            Help Center
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* User                                                            */}
      {/* --------------------------------------------------------------- */}

      <div className="border-t border-slate-800/80 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
            SA
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Administrator
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-xs text-slate-500">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}