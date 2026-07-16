"use client";

import { useMemo, useState } from "react";

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

export default function useAttendanceGrid() {
  const [month, setMonth] = useState(getCurrentMonth());

  const [year, setYear] = useState(getCurrentYear());

  const dates = useMemo(
    () => generateMonthDates(year, month),
    [month, year]
  );

  const [grid, setGrid] = useState<AttendanceGrid>(
    createAttendanceGrid()
  );

  const [selectedCell, setSelectedCell] =
    useState<SelectedCell>({
      row: 0,
      column: Math.max(getTodayColumn(dates), 0),
    });

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