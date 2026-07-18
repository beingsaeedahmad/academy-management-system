"use client";

import { useEffect, useMemo, useState } from "react";
import { Student } from "@/types";

import {
  AttendanceGrid,
  AttendanceStatus,
  SelectedCell,
} from "./attendanceTypes";

import {
  createAttendanceGrid,
  updateAttendance,
} from "./attendanceData";

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
  setGrid(createAttendanceGrid(students));
}, [students]);

  function setAttendance(
    studentId: string,
    date: string,
    status: AttendanceStatus
  ) {
    setGrid((prev) =>
      updateAttendance(prev, studentId, date, status)
    );
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