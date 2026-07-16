"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";


export default function AttendanceMonthDropdown() {

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


  const currentMonth = new Date().toLocaleString(
    "default",
    {
      month: "long",
    }
  );


  const [selectedMonth, setSelectedMonth] = useState(currentMonth);


  return (
    <div className="flex items-center gap-3">

      <CalendarDays
        className="h-5 w-5 text-blue-400"
      />


      <select
        value={selectedMonth}
        onChange={(e)=>setSelectedMonth(e.target.value)}
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

        {months.map((month)=>(
          <option
            key={month}
            value={month}
            className="bg-[#020817]"
          >
            {month}
          </option>
        ))}

      </select>

    </div>
  );
}