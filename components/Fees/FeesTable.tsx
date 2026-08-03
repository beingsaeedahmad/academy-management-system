"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

import FeesRow from "./FeesRow";
import FeeConfirmationModal from "./FeeConfirmationModal";
import { StudentFee } from "./feesTypes";

interface Props {
  fees: StudentFee[];

  onPayment: (
    id: string,
    amount: number
  ) => void | Promise<void>;
}

const headers = [
  "Class",
  "Month",
  "Due Date",
  "Payment",
  "Fee",
  "Paid",
  "Due",
  "Status",
  "Action",
];

export default function FeesTable({
  fees,
  onPayment,
}: Props) {
  const [selectedFee, setSelectedFee] =
    useState<StudentFee | null>(null);

  const [remainingAmount, setRemainingAmount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const monthName = selectedFee
    ? new Date(
        selectedFee.year,
        selectedFee.month - 1
      ).toLocaleString("default", {
        month: "long",
      })
    : "";

  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-[#0B1120]
          shadow-xl
        "
      >
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-slate-700 bg-[#111827]">
              <th className="w-24 px-3 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-300">
                <div className="flex items-center gap-1">
                  Roll
                  <ArrowUpDown size={12} />
                </div>
              </th>

              <th className="w-56 px-3 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-300">
                <div className="flex items-center gap-1">
                  Student
                  <ArrowUpDown size={12} />
                </div>
              </th>

              {headers.map((item) => (
                <th
                  key={item}
                  className="
                    px-2
                    py-4
                    text-center
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-slate-300
                  "
                >
                  <div className="flex items-center justify-center gap-1">
                    {item}
                    <ArrowUpDown size={12} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {fees.length > 0 ? (
              fees.map((fee) => (
                <FeesRow
                  key={fee.id}
                  fee={fee}
                  onCollect={(fee, amount) => {
                    setSelectedFee(fee);
                    setRemainingAmount(amount);
                  }}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="
                    py-16
                    text-center
                    text-slate-400
                  "
                >
                  No fee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FeeConfirmationModal
        open={selectedFee !== null}
        loading={loading}
        studentName={selectedFee?.name ?? ""}
        month={monthName}
        amount={remainingAmount}
        onClose={() => {
          if (loading) return;

          setSelectedFee(null);
          setRemainingAmount(0);
        }}
        onConfirm={async () => {
          if (!selectedFee) return;

          setLoading(true);

          try {
            await onPayment(
              selectedFee.id,
              remainingAmount
            );

            setSelectedFee(null);
            setRemainingAmount(0);
          } finally {
            setLoading(false);
          }
        }}
      />
    </>
  );
}