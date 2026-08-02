"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import AttendanceRow from "./AttendanceRow";
import useAttendanceGrid from "./useAttendanceGrid";
import useKeyboardNavigation from "./useKeyboardNavigation";

import { getStudents } from "@/actions/studentActions";
import { Student } from "@/types";

interface Props {
  month: number;
  year: number;
  selectedStudentId?: string | null;
}

export default function AttendanceRegister({
  month,
  year,
  selectedStudentId,
}: Props) {
  const [students, setStudents] = useState<Student[]>([]);

  // ✅ Sort only once and use everywhere
  const sortedStudents = useMemo(
    () =>
      [...students].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        })
      ),
    [students]
  );

  const {
    dates,
    grid,
    selectedCell,
    moveSelection,
    setAttendance,
    changeMonth,
  } = useAttendanceGrid(sortedStudents);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();
        const filtered = selectedStudentId
          ? data.filter((student) => student.id === selectedStudentId)
          : data;
        setStudents(filtered);
      } catch (error) {
        console.error(
          "LOAD STUDENTS ERROR:",
          error
        );
      }
    }

    loadStudents();
  }, []);

  useEffect(() => {
    changeMonth(month, year);
  }, [month, year, changeMonth]);

  useKeyboardNavigation({
    dates,
    selectedCell,
    totalRows: sortedStudents.length,
    moveSelection,
    setAttendance,
    studentIds: sortedStudents.map(
      (student) => student.id
    ),
  });

  useEffect(() => {
    const cell =
      containerRef.current?.querySelector(
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
  className="
    w-full
    overflow-x-auto
    overflow-y-hidden
    scrollbar-thin
    scrollbar-thumb-slate-700
    scrollbar-track-transparent
  "
>
     <table
  className="
    min-w-max
    border-collapse
  "
>
          <thead className="sticky top-0 z-40">
            <tr>
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
                  py-2
                  text-xs
                  font-bold
                "
              >
                Roll
              </th>

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

          <tbody>
            {sortedStudents.map(
              (student, index) => (
                <AttendanceRow
                  key={student.id}
                  student={student}
                  rowIndex={index}
                  dates={dates}
                  grid={grid}
                  selectedCell={
                    selectedCell
                  }
                  moveSelection={
                    moveSelection
                  }
                  setAttendance={
                    setAttendance
                  }
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}