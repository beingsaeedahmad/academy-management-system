import type { Student } from "@/types";

export type AttendanceStatus = "" | "P" | "A" | "L" | "H";

export type { Student };

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