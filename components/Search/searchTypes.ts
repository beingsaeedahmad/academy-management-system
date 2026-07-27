export type SearchCategory =
  | "Student"
  | "Admission"
  | "Attendance"
  | "Fees"
  | "Notes"
  | "Reports";

export interface SearchResult {
  id: string;

  title: string;

  subtitle: string;

  category: SearchCategory;

  href: string;
}