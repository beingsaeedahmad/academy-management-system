export interface Student {
  id: string;

  admissionNo: string;
  rollNumber: string;

  name: string;
  fatherName: string;
  dateOfBirth?: string;
gender?: string | null;  phone: string;
  email?: string | null;

address?: string | null;



  className: string;
  section?: string;

  monthlyFees: number;

  admissionDate: Date;

 photo?: string | null;

  createdAt: Date;
  updatedAt: Date;
}