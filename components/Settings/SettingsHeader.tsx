"use client";

import {
  Activity,
  Bell,
  ChevronDown,
  CircleUserRound,
  Settings,
} from "lucide-react";

interface SettingsHeaderProps {
  notificationCount?: number;
  status?: "online" | "maintenance" | "offline";
}

export default function SettingsHeader({
  notificationCount = 0,
  status = "online",
}: SettingsHeaderProps) {
  const statusConfig = {
    online: {
      label: "All Systems Operational",
      dot: "bg-emerald-400",
      glow: "shadow-[0_0_12px_rgba(52,211,153,0.8)]",
      text: "text-emerald-400",
    },
    maintenance: {
      label: "Maintenance Mode",
      dot: "bg-amber-400",
      glow: "shadow-[0_0_12px_rgba(251,191,36,0.8)]",
      text: "text-amber-400",
    },
    offline: {
      label: "System Offline",
      dot: "bg-red-400",
      glow: "shadow-[0_0_12px_rgba(248,113,113,0.8)]",
      text: "text-red-400",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <header className="mb-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Settings Icon */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/10 shadow-[0_0_30px_rgba(37,99,235,0.12)]">
            <div className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-xl" />

            <Settings className="relative h-7 w-7 text-blue-400" />
          </div>

          {/* Title */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Settings
              </h1>

              <span className="hidden rounded-full border border-blue-500/20 bg-blue-500/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-400 sm:inline-flex">
                AMS
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              Manage your academy system preferences and
              configuration.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* System Status */}
          <div className="flex min-h-[58px] items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-4 backdrop-blur-xl">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03]">
              <span
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  currentStatus.dot,
                  currentStatus.glow,
                ].join(" ")}
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-[11px] font-medium text-slate-500">
                System Status
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <Activity
                  className={[
                    "h-3 w-3",
                    currentStatus.text,
                  ].join(" ")}
                />

                <p
                  className={[
                    "text-xs font-semibold",
                    currentStatus.text,
                  ].join(" ")}
                >
                  {currentStatus.label}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-[58px] w-[58px] items-center justify-center rounded-xl border border-white/10 bg-slate-950/50 text-slate-400 backdrop-blur-xl transition hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-400"
          >
            <Bell className="h-5 w-5" />

            {notificationCount > 0 && (
              <span className="absolute right-3 top-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </span>
            )}
          </button>

          {/* Administrator */}
          <button
            type="button"
            className="flex min-h-[58px] items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-3.5 text-left backdrop-blur-xl transition hover:border-blue-500/20 hover:bg-blue-500/5"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600/10">
              <CircleUserRound className="h-5 w-5 text-blue-400" />
            </div>

            {/* User Info */}
            <div className="hidden min-w-[100px] sm:block">
              <p className="text-xs font-semibold text-white">
                Administrator
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Super Admin
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-blue-500/30 via-white/5 to-transparent" />
    </header>
  );
}