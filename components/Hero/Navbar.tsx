"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  Settings,
  Maximize2,
  Moon,
  UserCircle2,
  ChevronDown,
} from "lucide-react";

import GlobalSearch from "@/components/Search/GlobalSearch";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");

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

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-20
        border-b
        border-slate-800
        bg-[#020817]/80
        backdrop-blur-xl
      "
    >
      <div className="flex h-full items-center justify-between px-8">

        {/* Global Search */}

        <GlobalSearch />

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {/* Time */}

          <div className="hidden lg:block text-right">

            <p className="text-sm font-medium text-white">
              {currentTime}
            </p>

            <p className="text-xs text-slate-400">
              Academy Dashboard
            </p>

          </div>

          {/* Action Buttons */}

          {[
            Bell,
            Maximize2,
            Moon,
            Settings,
          ].map((Icon, index) => (

            <button
              key={index}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                text-slate-300
                transition-all
                duration-300
                hover:border-blue-500
                hover:text-white
                hover:shadow-[0_0_25px_rgba(37,99,235,.30)]
              "
            >
              <Icon size={20} />
            </button>

          ))}

          {/* Profile */}

          <button
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-2
              transition-all
              duration-300
              hover:border-blue-500
              hover:shadow-[0_0_25px_rgba(37,99,235,.25)]
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-cyan-500
                text-white
                shadow-[0_0_20px_rgba(37,99,235,.35)]
              "
            >
              <UserCircle2 size={24} />
            </div>

            <div className="hidden text-left xl:block">

              <h3 className="text-sm font-semibold text-white">
                Administrator
              </h3>

              <p className="text-xs text-slate-400">
                Super Admin
              </p>

            </div>

            <ChevronDown
              size={18}
              className="hidden text-slate-400 xl:block"
            />

          </button>

        </div>

      </div>
    </header>
  );
}