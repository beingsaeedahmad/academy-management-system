"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Moon,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";

import GlobalSearch from "@/components/Search/GlobalSearch";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [dark, setDark] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const applyTheme = useCallback((nextDark: boolean) => {
    const root = document.documentElement;

    if (nextDark) {
      root.style.setProperty("--background", "#020817");
      root.style.setProperty("--foreground", "#f8fafc");
      root.dataset.theme = "dark";
    } else {
      root.style.setProperty("--background", "#f8fafc");
      root.style.setProperty("--foreground", "#0f172a");
      root.dataset.theme = "light";
    }

    localStorage.setItem("academy-theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    const storedTheme = localStorage.getItem("academy-theme");
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;

    applyTheme(storedTheme ? storedTheme === "dark" : prefersDark);
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [applyTheme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-navbar-menu]")) {
        setProfileOpen(false);
        setAlertsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#020817]/85 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between gap-4 px-4 lg:px-8">
        <div className="min-w-0 flex-1">
          <GlobalSearch />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {currentTime && (
            <div className="hidden rounded-xl border border-slate-800/80 bg-slate-900/50 px-3 py-2 text-xs font-medium tabular-nums text-slate-400 lg:block">
              {currentTime}
            </div>
          )}

          <button
            type="button"
            onClick={() => applyTheme(!dark)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300 transition hover:border-slate-700 hover:text-white"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="relative" data-navbar-menu>
            <button
              type="button"
              onClick={() => {
                setAlertsOpen((open) => !open);
                setProfileOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300 transition hover:border-slate-700 hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </button>

            {alertsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl">
                <p className="text-sm font-semibold text-white">Notifications</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  No pending alerts. Admissions, fees, and attendance updates
                  will appear here.
                </p>
              </div>
            )}
          </div>

          <div className="relative" data-navbar-menu>
            <button
              type="button"
              onClick={() => {
                setProfileOpen((open) => !open);
                setAlertsOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 py-1.5 pl-1.5 pr-3 text-left transition hover:border-slate-700"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                SA
              </span>
              <span className="hidden sm:block">
                <span className="block text-xs font-semibold text-white">
                  Administrator
                </span>
                <span className="block text-[11px] text-slate-500">
                  Super Admin
                </span>
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
                <div className="border-b border-slate-800 px-4 py-3">
                  <p className="text-sm font-semibold text-white">Saeed Ahmad</p>
                  <p className="text-xs text-slate-500">Academy Administrator</p>
                </div>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings size={15} />
                  Settings
                </Link>
                <Link
                  href="/students"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                  onClick={() => setProfileOpen(false)}
                >
                  <UserRound size={15} />
                  Students
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
