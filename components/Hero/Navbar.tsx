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



  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#020817]/90 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between gap-6 px-6 lg:px-8">
        <GlobalSearch />
      </div>
    </header>
  );
}
