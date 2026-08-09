export type ReportType =
  | "overview"
  | "attendance"
  | "fees"
  | "students"
  | "academic";

export interface ReportsSummary {
  totalStudents: number;
  activeStudents: number;
  attendanceRate: number;
  feesCollected: number;
  feesPending: number;
}

export interface AttendanceReportData {
  present: number;
  absent: number;
  leave: number;
  holiday: number;
  total: number;
  attendanceRate: number;
}

export interface FeesReportData {
  totalFees: number;
  collected: number;
  pending: number;
  overdue: number;
  collectionRate: number;
}

export interface StudentReportData {
  total: number;
  active: number;
  inactive: number;
  newAdmissions: number;
}

export interface AcademicReportData {
  totalSubjects: number;
  totalNotes: number;
  totalClasses: number;
}

export interface ReportTableRow {
  id: string;
  name: string;
  className: string;
  status: string;
  value: string;
}