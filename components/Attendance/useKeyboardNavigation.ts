"use client";

import { useEffect } from "react";

import {
  AttendanceColumn,
  AttendanceGrid,
  AttendanceStatus,
  SelectedCell,
} from "./attendanceTypes";

const ATTENDANCE_SPACE_CYCLE: AttendanceStatus[] = [
  "",
  "P",
  "A",
  "L",
];

interface Props {
  dates: AttendanceColumn[];

  selectedCell: SelectedCell;

  totalRows: number;

  moveSelection: (
    row: number,
    column: number
  ) => void;

  setAttendance: (
    studentId: string,
    date: string,
    status: AttendanceStatus
  ) => void;

  studentIds: string[];

  grid: AttendanceGrid;
}

export default function useKeyboardNavigation({
  dates,
  selectedCell,
  totalRows,
  moveSelection,
  setAttendance,
  studentIds,
  grid,
}: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const { row, column } = selectedCell;

      switch (e.key) {
        /* ================= Arrow Right ================= */

        case "ArrowRight":
          e.preventDefault();

          if (column < dates.length - 1) {
            moveSelection(row, column + 1);
          }

          break;

        /* ================= Arrow Left ================= */

        case "ArrowLeft":
          e.preventDefault();

          if (column > 0) {
            moveSelection(row, column - 1);
          }

          break;

        /* ================= Arrow Up ================= */

        case "ArrowUp":
          e.preventDefault();

          if (row > 0) {
            moveSelection(row - 1, column);
          }

          break;

        /* ================= Arrow Down ================= */

        case "ArrowDown":
          e.preventDefault();

          if (row < totalRows - 1) {
            moveSelection(row + 1, column);
          }

          break;

        /* ================= Present ================= */

        case "p":
        case "P":
          e.preventDefault();

          if (!dates[column].isSunday) {
            setAttendance(
              studentIds[row],
              dates[column].date,
              "P"
            );
          }

          break;

        /* ================= Absent ================= */

        case "a":
        case "A":
          e.preventDefault();

          if (!dates[column].isSunday) {
            setAttendance(
              studentIds[row],
              dates[column].date,
              "A"
            );
          }

          break;

        /* ================= Leave ================= */

        case "l":
        case "L":
          e.preventDefault();

          if (!dates[column].isSunday) {
            setAttendance(
              studentIds[row],
              dates[column].date,
              "L"
            );
          }

          break;

        /* ================= Holiday ================= */

        case "h":
        case "H":
          e.preventDefault();

          if (!dates[column].isSunday) {
            setAttendance(
              studentIds[row],
              dates[column].date,
              "H"
            );
          }

          break;

        /* ================= Empty ================= */

        case "Delete":
        case "Backspace":
        case "0":
        case " ":
          e.preventDefault();

          if (!dates[column].isSunday) {
            const studentId = studentIds[row];
            const currentStatus =
              grid?.[studentId]?.[dates[column].date] ?? "";
            const nextIndex =
              (ATTENDANCE_SPACE_CYCLE.indexOf(currentStatus) + 1) %
              ATTENDANCE_SPACE_CYCLE.length;
            const nextStatus =
              ATTENDANCE_SPACE_CYCLE[nextIndex];

            setAttendance(
              studentId,
              dates[column].date,
              nextStatus
            );
          }

          break;

        /* ================= Tab ================= */

        case "Tab":
          e.preventDefault();

          if (column < dates.length - 1) {
            moveSelection(row, column + 1);
          } else if (row < totalRows - 1) {
            moveSelection(row + 1, 0);
          }

          break;

        /* ================= Enter ================= */

        case "Enter":
          e.preventDefault();

          if (row < totalRows - 1) {
            moveSelection(row + 1, column);
          }

          break;

        default:
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [
    dates,
    selectedCell,
    totalRows,
    moveSelection,
    setAttendance,
    studentIds,
    grid,
  ]);
}