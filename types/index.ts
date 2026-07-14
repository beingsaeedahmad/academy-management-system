export interface Student {
  id: string;

  // Admission
  admissionNo: string;
  rollNumber: string;
  admissionDate: Date;

  // Personal
  name: string;
  fatherName: string;
  gender?: "Male" | "Female";
  dateOfBirth?: string;
  photo?: string;

  // Contact
  phone: string;
  email?: string;
  address?: string;

  // Academic
  className: string;
  section?: string;

  // Fees
  monthlyFees: number;

  // System
  createdAt: Date;
  updatedAt: Date;
}