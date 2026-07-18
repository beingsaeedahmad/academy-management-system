import {
  AttendanceGrid,
  AttendanceStatus,
  Student,
} from "./attendanceTypes";


export function createAttendanceGrid(
  students: Student[]
): AttendanceGrid {

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