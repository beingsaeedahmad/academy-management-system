export type FeeStatus =
  | "Paid"
  | "Pending"
  | "Overdue";


export interface StudentFee {
  id: string;

  rollNo: string;

  name: string;

  className: string;

  totalFee: number;

  paidAmount: number;

  dueDate: string;

  status: FeeStatus;
}


export interface FeesSummary {
  total: number;

  paid: number;

  pending: number;

  overdue: number;
}


export interface FeeFilters {
  search: string;

  className: string;

  month: number;

  year: number;
}