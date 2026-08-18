"use client";

import { useEffect, useState } from "react";
import { Search, GraduationCap, RefreshCw, Download } from "lucide-react";
import { useSearchParams } from "next/navigation";

import FeesSummaryCards from "./FeesSummaryCards";
import FeesToolbar from "./FeesToolbar";
import FeesTable from "./FeesTable";
import useFees from "./useFees";

type FilterType =
  | "all"
  | "paid"
  | "pending"
  | "defaulters";

export default function FeesPageContent() {
  const searchParams = useSearchParams();
  const selectedStudentId =
    searchParams.get("studentId");

  const [filter, setFilter] =
    useState<FilterType>("all");

  const {
    fees,
    search,
    setSearch,
    selectedClass,
    setSelectedClass,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    statusFilter,
    setStatusFilter,
    updatePayment,
    reload,
  } = useFees(selectedStudentId);

  useEffect(() => {
    if (filter === "all") {
      setStatusFilter(null);
    } else if (filter === "paid") {
      setStatusFilter("Paid");
    } else if (filter === "pending") {
      setStatusFilter("Pending");
    } else if (filter === "defaulters") {
      setStatusFilter("Overdue");
    }
  }, [filter, setStatusFilter]);

  const handleRefresh = async () => {
    await reload();
  };

  const handleMonthChange = (
    month: number,
    year: number
  ) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleExport = () => {
    const rows = fees.map((fee) => ({
      Roll: fee.rollNo,
      Student: fee.name,
      Class: fee.className,
      Month: fee.month,
      Year: fee.year,
      "Due Date": fee.dueDate,
      "Payment Date":
        fee.paymentDate ?? "",
      "Total Fee": fee.totalFee,
      Paid: fee.paidAmount,
      Due:
        fee.totalFee - fee.paidAmount,
      Status: fee.status,
    }));

    if (rows.length === 0) {
      return;
    }

    const headers = Object.keys(rows[0]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const value =
              row[
                header as keyof typeof row
              ];

            return `"${String(value).replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = `fees-${selectedYear}-${selectedMonth}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="w-full space-y-6 px-4 py-6">

        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                <GraduationCap
                  size={22}
                  className="text-blue-400"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Fee Management
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage student fees and
                  payment records
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-800
                bg-slate-900/70
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-300
                transition
                hover:border-slate-700
                hover:bg-slate-800
                hover:text-white
              "
            >
              <RefreshCw size={15} />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-500/30
                bg-blue-500/10
                px-4
                py-2.5
                text-sm
                font-medium
                text-blue-400
                transition
                hover:bg-blue-500/20
              "
            >
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <FeesSummaryCards
          filter={filter}
          setFilter={setFilter}
        />

        {/* Toolbar */}
        <FeesToolbar
          search={search}
          setSearch={setSearch}
          selectedClass={selectedClass}
          setSelectedClass={
            setSelectedClass
          }
        />

        {/* Month / Year Controls */}
        <div
          className="
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-slate-800/80
            bg-slate-950/70
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Search
              size={16}
              className="text-slate-500"
            />

            <span>
              Showing fees for{" "}
              <span className="font-medium text-white">
                {new Date(
                  selectedYear,
                  selectedMonth - 1
                ).toLocaleString(
                  "default",
                  {
                    month: "long",
                  }
                )}{" "}
                {selectedYear}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedMonth}
              onChange={(event) =>
                handleMonthChange(
                  Number(event.target.value),
                  selectedYear
                )
              }
              className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                px-3
                py-2
                text-sm
                text-white
                outline-none
                focus:border-blue-500
              "
            >
              {Array.from(
                { length: 12 },
                (_, index) => {
                  const month =
                    index + 1;

                  return (
                    <option
                      key={month}
                      value={month}
                    >
                      {new Date(
                        selectedYear,
                        index
                      ).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}
                    </option>
                  );
                }
              )}
            </select>

            <select
              value={selectedYear}
              onChange={(event) =>
                handleMonthChange(
                  selectedMonth,
                  Number(event.target.value)
                )
              }
              className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                px-3
                py-2
                text-sm
                text-white
                outline-none
                focus:border-blue-500
              "
            >
              {Array.from(
                { length: 5 },
                (_, index) => {
                  const year =
                    new Date().getFullYear() -
                    2 +
                    index;

                  return (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  );
                }
              )}
            </select>
          </div>
        </div>

        {/* Fees Table */}
        <FeesTable
          fees={fees}
          onPayment={updatePayment}
        />

      </div>
    </div>
  );
}