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
  }, [selectedStudentId]);

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
    grid,
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
        w-full
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
    w-full
    table-fixed
    border-collapse
  "
>
          <colgroup>
            <col className="w-[72px]" />
            <col className="w-20" />
            <col className="w-36" />
            {dates.map((date) => (
              <col key={date.date} />
            ))}
            <col className="w-16" />
            <col className="w-16" />
          </colgroup>

          <thead className="sticky top-0 z-40">
            <tr>
              <th
                className="
                  sticky
                  left-0
                  z-50
                  border
                  border-slate-700
                  bg-[#0F172A]
                  py-2
                  text-xs
                  font-bold
                "
              >
                Roll No
              </th>

              <th
                className="
                  sticky
                  left-[72px]
                  z-50
                  border
                  border-slate-700
                  bg-[#0F172A]
                  px-2
                  text-left
                  text-xs
                  font-bold
                "
              >
                Class
              </th>

              <th
                className="
                  sticky
                  left-[152px]
                  z-50
                  border
                  border-slate-700
                  bg-[#0F172A]
                  px-2
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

              <th
                className="
                  border
                  border-slate-700
                  bg-[#0F172A]
                  py-2
                  text-xs
                  font-bold
                  text-green-400
                "
              >
                Present
              </th>

              <th
                className="
                  border
                  border-slate-700
                  bg-[#0F172A]
                  py-2
                  text-xs
                  font-bold
                  text-red-400
                "
              >
                Absent
              </th>
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