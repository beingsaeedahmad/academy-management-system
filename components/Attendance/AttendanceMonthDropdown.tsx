"use client";

import { CalendarDays } from "lucide-react";

interface Props {
  month: number;
  year: number;
  onChange: (
    month: number,
    year: number
  ) => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AttendanceMonthDropdown({
  month,
  year,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <CalendarDays className="h-5 w-5 text-blue-400" />

      <select
        value={month}
        onChange={(e) =>
          onChange(
            Number(e.target.value),
            year
          )
        }
        className="
          rounded-xl
          border
          border-slate-700
          bg-[#020817]
          px-4
          py-2
          text-sm
          text-white
          outline-none
          focus:border-blue-500
        "
      >
        {months.map((item, index) => (
          <option
            key={item}
            value={index + 1}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}