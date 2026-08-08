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

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
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
  attendance?: AttendanceRecord[];

  createdAt: Date;
  updatedAt: Date;
}
export interface Subject {
  id: string;
  name: string;
  code: string;
  chapter: string;
  className: string;
  teacherName: string | null;
  fileName: string | null;
  fileType: string | null;
  fileSize: number | null;
  fileUrl: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}