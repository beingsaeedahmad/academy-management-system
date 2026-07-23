import FeesRow from "./FeesRow";

import { StudentFee } from "./feesTypes";

interface Props {
  fees: StudentFee[];

  onPayment: (
    id: string,
    amount: number
  ) => void;
}

export default function FeesTable({
  fees,
  onPayment,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-[#0F172A]
        shadow-xl
      "
    >
      <div className="overflow-x-auto">
        <table
          className="
            w-full
            table-fixed
            border-collapse
          "
        >
          {/* HEADER */}

          <thead className="sticky top-0 z-40">
            <tr>
              <th
                className="
                  sticky
                  left-0
                  z-50
                  w-20
                  border
                  border-slate-700
                  bg-[#0F172A]
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-300
                "
              >
                Roll
              </th>

              <th
                className="
                  sticky
                  left-20
                  z-50
                  w-56
                  border
                  border-slate-700
                  bg-[#0F172A]
                  px-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-300
                "
              >
                Student
              </th>

              {[
                "Class",
                "Month",
                "Due Date",
                "Payment Date",
                "Total Fee",
                "Paid",
                "Due",
                "Status",
                "Action",
              ].map((title) => (
                <th
                  key={title}
                  className="
                    border
                    border-slate-700
                    bg-[#0F172A]
                    py-4
                    px-3
                    text-center
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-300
                  "
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <FeesRow
                key={fee.id}
                fee={fee}
                onPayment={onPayment}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}