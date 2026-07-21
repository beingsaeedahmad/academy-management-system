"use client";

import { useEffect, useMemo, useState } from "react";
import { Student } from "@/types";

import {
  AttendanceGrid,
  AttendanceStatus,
  SelectedCell,
} from "./attendanceTypes";

import { createAttendanceGrid } from "./attendanceData";

import {
  generateMonthDates,
  getCurrentMonth,
  getCurrentYear,
  getTodayColumn,
} from "./attendanceUtils";

export default function useAttendanceGrid(
  students: Student[]
) {
  const [month, setMonth] = useState(getCurrentMonth());

  const [year, setYear] = useState(getCurrentYear());

  const dates = useMemo(
    () => generateMonthDates(year, month),
    [month, year]
  );

  const [grid, setGrid] = useState<AttendanceGrid>(
    createAttendanceGrid(students)
  );

  const [selectedCell, setSelectedCell] =
    useState<SelectedCell>({
      row: 0,
      column: Math.max(getTodayColumn(dates), 0),
    });

  useEffect(() => {
    async function loadAttendance() {
      const response = await fetch(
        `/api/attendance?month=${month}&year=${year}`
      );

      if (!response.ok) return;

      const records = await response.json();

      const newGrid: AttendanceGrid =
        createAttendanceGrid(students);

      records.forEach((record: any) => {
        const date = new Date(record.date)
          .toISOString()
          .split("T")[0];

        newGrid[record.studentId][date] =
          record.status;
      });

      setGrid(newGrid);
    }

    if (students.length) {
      loadAttendance();
    }
  }, [students, month, year]);
    async function setAttendance(
    studentId: string,
    date: string,
    status: AttendanceStatus
  ) {

    console.log("Saving:", {
  studentId,
  date,
  status,
});

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          date,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save attendance");
      }

      setGrid((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [date]: status,
        },
      }));
    } catch (error) {
      console.error("SAVE ATTENDANCE ERROR:", error);
    }
  }

  function moveSelection(
    row: number,
    column: number
  ) {
    setSelectedCell({
      row,
      column,
    });
  }

  function changeMonth(
    month: number,
    year: number
  ) {
    setMonth(month);
    setYear(year);
  }

  function focusToday() {
    setSelectedCell({
      row: 0,
      column: Math.max(getTodayColumn(dates), 0),
    });
  }

  return {
    month,
    year,
    dates,
    grid,
    selectedCell,

    setAttendance,
    moveSelection,
    changeMonth,
    focusToday,
  };
}