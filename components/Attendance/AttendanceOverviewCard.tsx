"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
}

export default function AttendanceOverviewCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
  border,
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        ${border}
        bg-slate-900
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className={`
            ${bg}
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
          `}
        >
          <Icon
            className={`${color} h-7 w-7`}
          />
        </div>
      </div>
    </div>
  );
}