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

  const [loading, setLoading] = useState(false);

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
          border border-slate-800/80
          bg-slate-950/80
          shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]
        "
      >
        {/* Table Header */}
        <div className="border-b border-slate-800/80 bg-slate-900/40 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Fee Records
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Student fee collection and payment details
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-400">
              {fees.length} Records
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] table-fixed">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/70">
                <th
                  className="
                    w-24
                    px-3
                    py-3.5
                    text-left
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-500
                  "
                >
                  <div className="flex items-center gap-1.5">
                    Roll
                    <ArrowUpDown
                      size={11}
                      className="text-slate-600"
                    />
                  </div>
                </th>

                <th
                  className="
                    w-56
                    px-3
                    py-3.5
                    text-left
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-500
                  "
                >
                  <div className="flex items-center gap-1.5">
                    Student
                    <ArrowUpDown
                      size={11}
                      className="text-slate-600"
                    />
                  </div>
                </th>

                {headers.map((item) => (
                  <th
                    key={item}
                    className="
                      px-2
                      py-3.5
                      text-center
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-500
                    "
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      {item}

                      <ArrowUpDown
                        size={11}
                        className="text-slate-600"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
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
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-600">
                        <span className="text-lg">₹</span>
                      </div>

                      <p className="text-sm font-medium text-slate-300">
                        No fee records found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Fee records will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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