"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import {
  UserCircle2,
  ChevronDown,
  ArrowRight,
  Settings,
  LogOut,
} from "lucide-react";

import GlobalSearch from "@/components/Search/GlobalSearch";

export default function Navbar() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement;

    if (dark) {
      root.style.setProperty("--background", "#020817");
      root.style.setProperty("--foreground", "#f8fafc");
      root.dataset.theme = "dark";
    } else {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
      root.dataset.theme = "light";
    }

    localStorage.setItem("academy-theme", dark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    const storedTheme = localStorage.getItem("academy-theme");
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDark = storedTheme ? storedTheme === "dark" : prefersDark;

    applyTheme(initialDark);

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [applyTheme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-profile-menu]")) {
        setProfileOpen(false);
      }
    }

    if (profileOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileOpen]);

  function goToSettings() {
    router.push("/settings");
    setProfileOpen(false);
  }

  function logOut() {
    router.push("/");
    setProfileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#020817]/90 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between gap-6 px-6 lg:px-8">
        <GlobalSearch />

        <div className="flex items-center gap-5">
          <div className="hidden text-right lg:block">
            <p className="text-sm font-medium tabular-nums text-white">
              {currentTime}
            </p>
            <p className="text-xs text-slate-500">Academy Dashboard</p>
          </div>

          <div className="relative" data-profile-menu>
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 transition-colors hover:border-slate-700 hover:bg-slate-900"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <UserCircle2 size={20} />
              </div>
              <div className="hidden text-left xl:block">
                <p className="text-sm font-medium text-white">Administrator</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <ChevronDown
                size={16}
                className={`hidden text-slate-500 transition-transform xl:block ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl">
                <button
                  type="button"
                  onClick={goToSettings}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
                >
                  <Settings size={16} className="text-slate-500" />
                  Settings
                </button>

                <div className="border-t border-slate-800" />

                <button
                  type="button"
                  onClick={logOut}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
                >
                  <LogOut size={16} className="text-red-400" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
