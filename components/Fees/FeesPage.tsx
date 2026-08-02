"use client";

import { useSearchParams } from "next/navigation";
import FeesSummaryCards from "./FeesSummaryCards";
import FeesTable from "./FeesTable";
import useFees from "./useFees";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function FeesPage() {
  const searchParams = useSearchParams();
  const selectedStudentId = searchParams.get("studentId");

  const {
    fees,
    summary,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    updatePayment,
  } = useFees();

  return (
    <div
      className="
        min-h-screen
        space-y-6
        rounded-2xl
        border
        border-slate-800
        bg-[#020817]
        p-6
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-slate-800
          bg-[#0F172A]
          p-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h1 className="text-2xl font-bold text-white">
            Fees Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage monthly student fee records.
          </p>
        </div>

        <div className="flex gap-3">
          {/* Month */}

          <select
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(Number(e.target.value))
            }
            className="
              rounded-xl
              border
              border-slate-700
              bg-[#111827]
              px-4
              py-2
              text-white
              outline-none
            "
          >
            {months.map((month, index) => (
              <option
                key={month}
                value={index + 1}
              >
                {month}
              </option>
            ))}
          </select>

          {/* Year */}

          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(Number(e.target.value))
            }
            className="
              rounded-xl
              border
              border-slate-700
              bg-[#111827]
              px-4
              py-2
              text-white
              outline-none
            "
          >
            {[2025, 2026, 2027, 2028, 2029, 2030].map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Summary */}

      <FeesSummaryCards summary={summary} />

      {/* Fees Table */}

      <FeesTable
        fees={selectedStudentId ? fees.filter((fee) => fee.name === fees.find((item) => item.id === selectedStudentId)?.name || fee.id === selectedStudentId) : fees}
        onPayment={updatePayment}
      />
    </div>
  );
}