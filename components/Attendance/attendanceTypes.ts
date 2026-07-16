export type AttendanceStatus = "" | "P" | "A" | "L" | "H";

export interface Student {
  id: string;
  rollNo: string;
  name: string;
}

export interface AttendanceColumn {
  date: string;
  day: number;
  isSunday: boolean;
  isToday: boolean;
}

export interface SelectedCell {
  row: number;
  column: number;
}

export type AttendanceGrid = Record<
  string,
  Record<string, AttendanceStatus>
>;