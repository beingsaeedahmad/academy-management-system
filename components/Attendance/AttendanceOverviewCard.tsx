"use client";

import { LucideIcon } from "lucide-react";

interface AttendanceOverviewCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function AttendanceOverviewCard({
  title,
  value,
  icon: Icon,
  color,
}: AttendanceOverviewCardProps) {
  return (
    <div
      className={`
      rounded-3xl
      border
      ${color}
      bg-gradient-to-br
      p-5
      backdrop-blur-xl
      shadow-[0_0_25px_rgba(37,99,235,0.12)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]
      `}
    >

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="
            mt-2
            text-3xl
            font-bold
            text-white
          ">
            {value}
          </h2>
        </div>


        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-white/10
          backdrop-blur-md
          shadow-inner
          "
        >
          <Icon 
            className="
            h-7
            w-7
            text-white
            "
          />
        </div>

      </div>

    </div>
  );
}