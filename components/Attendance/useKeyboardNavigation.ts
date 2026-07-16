"use client";

import { useEffect } from "react";

import {
  AttendanceColumn,
  AttendanceStatus,
  SelectedCell,
} from "./attendanceTypes";

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
}

export default function useKeyboardNavigation({
  dates,
  selectedCell,
  totalRows,
  moveSelection,
  setAttendance,
  studentIds,
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
            setAttendance(
              studentIds[row],
              dates[column].date,
              ""
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
  ]);
}