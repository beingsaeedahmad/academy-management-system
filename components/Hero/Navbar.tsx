"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  Settings,
  Maximize2,
  Moon,
  Sun,
  UserCircle2,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import GlobalSearch from "@/components/Search/GlobalSearch";

const notifications = [
  {
    id: 1,
    title: "New admission completed",
    description: "Ali Hassan was admitted to Class 8",
  },
  {
    id: 2,
    title: "Fee payment received",
    description: "Ayesha paid July fee",
  },
  {
    id: 3,
    title: "Attendance updated",
    description: "Class 10 attendance status saved",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initialDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDarkMode(initialDark);
    applyTheme(initialDark);

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [applyTheme]);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    window.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  function toggleTheme() {
    setIsDarkMode((current) => {
      const next = !current;
      applyTheme(next);
      return next;
    });
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  function openNotifications() {
    setNotificationsOpen((open) => !open);
    setProfileOpen(false);
  }

  function openProfileMenu() {
    setProfileOpen((open) => !open);
    setNotificationsOpen(false);
  }

  function goToSettings() {
    router.push("/settings");
  }

  function goToProfile() {
    router.push("/settings");
  }

  function logOut() {
    router.push("/dashboard");
  }

  return (
    <header className="sticky top-0 z-40 h-20 border-b border-slate-800 bg-[#020817]/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-8">
        <GlobalSearch />

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium text-white">{currentTime}</p>
            <p className="text-xs text-slate-400">Academy Dashboard</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={openNotifications}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300 transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,.30)]"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-80 rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-2xl">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Notifications</p>
                      <p className="text-xs text-slate-500">Latest activity updates</p>
                    </div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                      <AlertCircle size={16} />
                    </span>
                  </div>

                  <div className="space-y-2">
                    {notifications.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-3 text-left transition-all duration-200 hover:border-blue-500 hover:bg-slate-800"
                        onClick={() => {
                          router.push("/dashboard");
                          setNotificationsOpen(false);
                        }}
                      >
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300 transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,.30)]"
              aria-label="Toggle fullscreen"
            >
              <Maximize2 size={20} />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300 transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,.30)]"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              type="button"
              onClick={goToSettings}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300 transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,.30)]"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={openProfileMenu}
              className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,.25)]"
              aria-label="Profile menu"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(37,99,235,.35)]">
                <UserCircle2 size={24} />
              </div>
              <div className="hidden xl:block text-left">
                <h3 className="text-sm font-semibold text-white">Administrator</h3>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
              <ChevronDown size={18} className="hidden xl:block text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-3xl border border-slate-800 bg-slate-950 p-3 shadow-2xl">
                <button
                  type="button"
                  onClick={goToProfile}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left transition-all duration-200 hover:border-blue-500 hover:bg-slate-800"
                >
                  <span>
                    <p className="text-sm font-semibold text-white">My Profile</p>
                    <p className="text-xs text-slate-400">Account settings</p>
                  </span>
                  <CheckCircle size={18} className="text-blue-400" />
                </button>

                <button
                  type="button"
                  onClick={goToSettings}
                  className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left transition-all duration-200 hover:border-blue-500 hover:bg-slate-800"
                >
                  <span>
                    <p className="text-sm font-semibold text-white">Settings</p>
                    <p className="text-xs text-slate-400">App configuration</p>
                  </span>
                  <AlertCircle size={18} className="text-amber-400" />
                </button>

                <button
                  type="button"
                  onClick={logOut}
                  className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left transition-all duration-200 hover:border-red-500 hover:bg-red-950"
                >
                  <span>
                    <p className="text-sm font-semibold text-white">Logout</p>
                    <p className="text-xs text-slate-400">Return to dashboard</p>
                  </span>
                  <ArrowRight size={18} className="text-red-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
