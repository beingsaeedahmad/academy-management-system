"use client";

import AttendanceCell from "./AttendanceCell";

import {
  AttendanceColumn,
  AttendanceGrid,
  AttendanceStatus,
  SelectedCell,
  Student,
} from "./attendanceTypes";

interface Props {
  student: Student;

  rowIndex: number;

  dates: AttendanceColumn[];

  grid: AttendanceGrid;

  selectedCell: SelectedCell;

  moveSelection: (
    row: number,
    column: number
  ) => void;

  setAttendance: (
    studentId: string,
    date: string,
    status: AttendanceStatus
  ) => void;
}

export default function AttendanceRow({
  student,
  rowIndex,
  dates,
  grid,
  selectedCell,
  moveSelection,
  setAttendance,
}: Props) {
  return (
    <tr
      className={`
        transition-colors

        ${
          selectedCell.row === rowIndex
            ? "bg-blue-900/20"
            : "hover:bg-slate-800/30"
        }
      `}
    >
      {/* Roll No */}

      <td
        className="
          sticky
          left-0
          z-20

          w-14
          min-w-[56px]

          border
          border-slate-700

          bg-[#020817]

          text-center
          text-xs
          font-semibold
        "
      >
        {student.rollNumber}
      </td>

      {/* Student Name */}

      <td
        className="
          sticky
          left-14
          z-20

          w-40
          min-w-[160px]

          border
          border-slate-700

          bg-[#020817]

          px-2

          text-xs
          font-medium

          whitespace-nowrap
        "
      >
        {student.name}
      </td>

      {/* Attendance Cells */}

      {dates.map((date, columnIndex) => (
        <AttendanceCell
          key={date.date}
          status={
            grid[student.id]?.[date.date] ?? ""
          }
          isSelected={
            selectedCell.row === rowIndex &&
            selectedCell.column === columnIndex
          }
          isToday={date.isToday}
          isSunday={date.isSunday}
          onClick={() =>
            moveSelection(
              rowIndex,
              columnIndex
            )
          }
          onChange={(newStatus) =>
            setAttendance(
              student.id,
              date.date,
              newStatus
            )
          }
        />
      ))}
    </tr>
  );
}