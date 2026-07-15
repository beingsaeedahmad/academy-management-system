export interface Student {
  id: string;

  admissionNo: string;
  rollNumber: string;

  name: string;
  fatherName: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female";

  phone: string;
  email?: string;
  address?: string;

  className: string;
  section?: string;

  monthlyFees: number;

  admissionDate: Date;

  photo?: string;

  createdAt: Date;
  updatedAt: Date;
}