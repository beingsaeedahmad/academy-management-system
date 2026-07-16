"use client";

import { useEffect, useRef } from "react";

import AttendanceRow from "./AttendanceRow";
import useAttendanceGrid from "./useAttendanceGrid";
import useKeyboardNavigation from "./useKeyboardNavigation";

import { students } from "./attendanceData";

export default function AttendanceRegister() {
  const {
    dates,
    grid,
    selectedCell,
    moveSelection,
    setAttendance,
  } = useAttendanceGrid();

  const containerRef = useRef<HTMLDivElement>(null);

  /* ================= Keyboard ================= */

  useKeyboardNavigation({
    dates,
    selectedCell,
    totalRows: students.length,
    moveSelection,
    setAttendance,
    studentIds: students.map((s) => s.id),
  });

  /* ================= Auto Scroll ================= */

  useEffect(() => {
    const cell = containerRef.current?.querySelector(
      "[data-selected='true']"
    ) as HTMLElement | null;

    if (!cell) return;

    cell.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });

    cell.focus();
  }, [selectedCell]);

  return (
    <div
      className="
      rounded-xl
      border
      border-slate-800
      bg-[#0F172A]
      shadow-xl
      "
    >
<div
  ref={containerRef}
  className="w-full overflow-x-hidden overflow-y-visible"
>
        <table className="w-full table-fixed border-collapse">

          {/* ================= HEADER ================= */}

          <thead className="sticky top-0 z-40">

            <tr>

              {/* Roll */}

              <th
                className="
                sticky
                left-0
                z-50

                w-14
                min-w-[56px]

                border
                border-slate-700

                bg-[#0F172A]

                text-xs
                font-bold

                py-2
                "
              >
                Roll
              </th>

              {/* Name */}

              <th
                className="
                sticky
                left-14
                z-50

                w-44
                min-w-[176px]

                border
                border-slate-700

                bg-[#0F172A]

                px-3

                text-left
                text-xs
                font-bold
                "
              >
                Student Name
              </th>

              {/* Dates */}

              {dates.map((date) => (
                <th
                  key={date.date}
                  className={`
                  w-8
                  min-w-[32px]
                  h-8

                  border
                  border-slate-700

                  text-[11px]
                  font-bold
                  text-center

                  ${
                    date.isSunday
                      ? "bg-red-900 text-red-200"
                      : "bg-[#0F172A]"
                  }

                  ${
                    date.isToday
                      ? "bg-blue-700 text-white"
                      : ""
                  }
                  `}
                >
                  {date.day}
                </th>
              ))}

            </tr>

          </thead>

          {/* ================= BODY ================= */}

          <tbody>

            {students.map((student, index) => (

              <AttendanceRow
                key={student.id}
                student={student}
                rowIndex={index}
                dates={dates}
                grid={grid}
                selectedCell={selectedCell}
                moveSelection={moveSelection}
                setAttendance={setAttendance}
              />

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}