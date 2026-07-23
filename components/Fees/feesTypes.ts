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


}