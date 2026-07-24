export type FeeStatus =
  | "Paid"
  | "Pending"
  | "Overdue";

export interface StudentFee {
  id: string;

  rollNo: string;

  name: string;

  className: string;

  month: number;

  year: number;

  totalFee: number;

  paidAmount: number;

  dueDate: string;

  paymentDate?: string | null;

  status: FeeStatus;
}

export interface FeesSummary {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
}