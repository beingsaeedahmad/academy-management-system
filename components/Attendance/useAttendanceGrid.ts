"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Student } from "@/types";

import {
  AttendanceGrid,
  AttendanceStatus,
  SelectedCell,
} from "./attendanceTypes";


import {
  generateMonthDates,
  getCurrentMonth,
  getCurrentYear,
  getTodayColumn,
} from "./attendanceUtils";

import {
  getAttendance,
  saveAttendance,
  deleteAttendance,
} from "@/actions/attendanceActions";




export default function useAttendanceGrid(
  students: Student[]
) {


function createEmptyGrid(students: Student[]): AttendanceGrid {
  const grid: AttendanceGrid = {};

  students.forEach((student) => {
    grid[student.id] = {};
  });

  return grid;
}

const [month, setMonth] = useState(
  getCurrentMonth()
);

const [year, setYear] = useState(
  getCurrentYear()
);
  const dates = useMemo(
    () => generateMonthDates(year, month),
    [month, year]
  );

  const [grid, setGrid] =
    useState<AttendanceGrid>({});

  const [selectedCell, setSelectedCell] =
    useState<SelectedCell>({
      row: 0,
      column: Math.max(
        getTodayColumn(dates),
        0
      ),
    });

  useEffect(() => {
    setGrid(createEmptyGrid(students));
  }, [students]);
    useEffect(() => {
    async function loadAttendance() {
      if (!students.length) return;

      try {
        const records = await getAttendance(
          month,
          year
        );

        const newGrid =
          createEmptyGrid(students);

        records.forEach((record: {
  studentId: string;
  date: Date;
  status: string;
}) => {
          const d = new Date(record.date);

          const date =
            `${d.getFullYear()}-` +
            `${String(
              d.getMonth() + 1
            ).padStart(2, "0")}-` +
            `${String(
              d.getDate()
            ).padStart(2, "0")}`;

          if (newGrid[record.studentId]) {
            newGrid[record.studentId][date] =
              record.status as AttendanceStatus;
          }
        });

        setGrid(newGrid);
      } catch (error) {
        console.error(
          "LOAD ATTENDANCE ERROR:",
          error
        );
      }
    }

    loadAttendance();
  }, [students, month, year]);

  const setAttendance = useCallback(
    async (
      studentId: string,
      date: string,
      status: AttendanceStatus
    ) => {
      try {
        if (status === "") {
          await deleteAttendance(
            studentId,
            date
          );
        } else {
          await saveAttendance(
            studentId,
            date,
            status
          );
        }

        setGrid((prev) => ({
          ...prev,
          [studentId]: {
            ...prev[studentId],
            [date]: status,
          },
        }));
      } catch (error) {
        console.error(
          "SAVE ATTENDANCE ERROR:",
          error
        );
      }
    },
    []
  );

  const moveSelection = useCallback(
    (row: number, column: number) => {
      setSelectedCell({
        row,
        column,
      });
    },
    []
  );
    const changeMonth = useCallback(
    (newMonth: number, newYear: number) => {
      setMonth(newMonth);
      setYear(newYear);
    },
    []
  );

  const focusToday = useCallback(() => {
    setSelectedCell({
      row: 0,
      column: Math.max(
        getTodayColumn(dates),
        0
      ),
    });
  }, [dates]);

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