export interface Fee {
  id: string;

  studentId: string;

  month: number;
  year: number;

  totalFee: number;
  paidAmount: number;

  dueDate: Date;

  paymentDate?: Date | null;

  remarks?: string | null;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;

  admissionNo: string;
  rollNumber: string;

  name: string;
  fatherName: string;

  gender?: string | null;

  className: string;

  phone: string;
  email?: string | null;

  address?: string | null;

  monthlyFees: number;

  photo?: string | null;

  admissionDate: Date;

  status: string;

  fees?: Fee[];

  createdAt: Date;
  updatedAt: Date;
}
