import FeeStatusBadge from "./FeeStatusBadge";

import { StudentFee } from "./feesTypes";

import {
  calculateRemaining,
  formatCurrency,
} from "./feesUtils";

interface Props {
  fee: StudentFee;

  onPayment: (
    id: string,
    amount: number
  ) => void;
}

export default function FeesRow({
  fee,
  onPayment,
}: Props) {
  const remaining = calculateRemaining(
    fee.totalFee,
    fee.paidAmount
  );

  const monthName = new Date(
    fee.year,
    fee.month - 1
  ).toLocaleString("default", {
    month: "short",
  });

  const dueDate = new Date(
    fee.dueDate
  ).toLocaleDateString("en-GB");

  const paymentDate = fee.paymentDate
    ? new Date(
        fee.paymentDate
      ).toLocaleDateString("en-GB")
    : "-";

  return (
    <tr
      className="
        border-b
        border-slate-800
        bg-[#0B1220]
        transition
        hover:bg-slate-800/40
      "
    >
      {/* Roll */}

      <td
        className="
          w-24
          px-3
          py-4
          text-sm
          font-semibold
          text-white
          whitespace-nowrap
        "
      >
        {fee.rollNo}
      </td>

      {/* Student */}

      <td className="w-56 px-3 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-sm
              font-bold
              text-white
            "
          >
            {fee.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-white">
              {fee.name}
            </p>

            <p className="text-xs text-slate-400">
              {fee.rollNo}
            </p>
          </div>
        </div>
      </td>

      {/* Class */}

      <td className="px-2 py-4 text-center text-sm text-slate-300">
        {fee.className}
      </td>

      {/* Month */}

      <td className="px-2 py-4 text-center text-sm text-slate-300">
        {monthName}
      </td>

      {/* Due Date */}

      <td className="px-2 py-4 text-center text-sm text-slate-300">
        {dueDate}
      </td>

      {/* Payment Date */}

      <td className="px-2 py-4 text-center text-sm text-slate-300">
        {paymentDate}
      </td>

      {/* Total Fee */}

      <td className="px-2 py-4 text-center font-semibold text-white">
        {formatCurrency(fee.totalFee)}
      </td>

      {/* Paid */}

      <td className="px-2 py-4 text-center font-semibold text-emerald-400">
        {formatCurrency(fee.paidAmount)}
      </td>

      {/* Due */}

      <td className="px-2 py-4 text-center font-semibold text-red-400">
        {formatCurrency(remaining)}
      </td>

      {/* Status */}

      <td className="px-2 py-4 text-center">
        <FeeStatusBadge
          status={fee.status}
        />
      </td>

      {/* Action */}

      <td className="px-2 py-4 text-center">
        <button
          onClick={() => {
            if (remaining <= 0) {
              alert(
                "Fee already paid."
              );
              return;
            }

            if (
              !confirm(
                `Collect remaining fee from ${fee.name}?`
              )
            ) {
              return;
            }

            onPayment(
              fee.id,
              remaining
            );
          }}
          disabled={remaining <= 0}
          className={`
            rounded-lg
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            transition-all
            ${
              remaining > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-700 text-slate-400"
            }
          `}
        >
          {remaining > 0
            ? "Collect"
            : "Paid"}
        </button>
      </td>
    </tr>
  );
}