import {
  AttendanceGrid,
  AttendanceStatus,
  Student,
} from "./attendanceTypes";

export const students: Student[] = Array.from(
  { length: 50 },
  (_, index) => ({
    id: `STD-${index + 1}`,
    rollNo: String(index + 1).padStart(3, "0"),
    name: `Student ${index + 1}`,
  })
);

export function createAttendanceGrid(): AttendanceGrid {
  const grid: AttendanceGrid = {};

  students.forEach((student) => {
    grid[student.id] = {};
  });

  return grid;
}

export function updateAttendance(
  grid: AttendanceGrid,
  studentId: string,
  date: string,
  status: AttendanceStatus
): AttendanceGrid {
  return {
    ...grid,
    [studentId]: {
      ...grid[studentId],
      [date]: status,
    },
  };
}