import {
  FeeStatus,
  StudentFee,
  FeesSummary,
} from "./feesTypes";


export function calculateRemaining(
  total: number,
  paid: number
) {
  return total - paid;
}


export function getFeeStatus(
  total: number,
  paid: number,
  dueDate: string
): FeeStatus {

  const remaining =
    calculateRemaining(total, paid);


  if (remaining <= 0) {
    return "Paid";
  }


  const today = new Date();

  const due = new Date(dueDate);


  if (due < today) {
    return "Overdue";
  }


  return "Pending";
}



export function calculateFeesSummary(
  fees: StudentFee[]
): FeesSummary {


  return fees.reduce(
    (acc, item) => {

      acc.total += item.totalFee;

      acc.paid += item.paidAmount;


      const remaining =
        calculateRemaining(
          item.totalFee,
          item.paidAmount
        );


      if (remaining > 0) {

        if (item.status === "Overdue") {
          acc.overdue += remaining;
        }
        else {
          acc.pending += remaining;
        }

      }


      return acc;

    },
    {
      total: 0,
      paid: 0,
      pending: 0,
      overdue: 0,
    }
  );
}



export function formatCurrency(
  amount:number
){
  return new Intl.NumberFormat(
    "en-PK",
    {
      style:"currency",
      currency:"PKR",
      maximumFractionDigits:0,
    }
  ).format(amount);
}