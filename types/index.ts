export interface Fee {
  id: string;

  month: number;
  year: number;

  totalFee: number;
  paidAmount: number;

  status: "Paid" | "Pending" | "Overdue";
}

export interface Student {
  id: string;

  admissionNo: string;
  rollNumber: string;

  name: string;
  fatherName: string;

  dateOfBirth?: string;

  gender?: string | null;

  phone: string;

  email?: string | null;

  address?: string | null;

  className: string;

  section?: string;

  monthlyFees: number;

  admissionDate: Date;

  photo?: string | null;

  status: "Active" | "Inactive";

  fees?: Fee[];

  createdAt: Date;

  updatedAt: Date;
}