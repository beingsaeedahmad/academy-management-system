"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { StudentFee } from "./feesTypes";

import {
  calculateFeesSummary,
} from "./feesUtils";

import {
  getFees,
  updateFeePayment,
  type FeeWithStudent,
} from "@/actions/feeActions";

export default function useFees(
  selectedStudentId?: string | null
) {
  const today = new Date();

  const [fees, setFees] =
    useState<StudentFee[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedClass,
    setSelectedClass,
  ] = useState("All");

  const [selectedMonth, setSelectedMonth] =
    useState(today.getMonth() + 1);

  const [selectedYear, setSelectedYear] =
    useState(today.getFullYear());

  async function loadFees(
    month = selectedMonth,
    year = selectedYear
  ) {
    try {
      const feeData = await getFees(
        month,
        year,
        selectedStudentId
      );

      const data: StudentFee[] =
        feeData.map(
          (fee: FeeWithStudent) => ({
            id: fee.id,
            studentId: fee.student.id,

            rollNo:
              fee.student.rollNumber,

            name:
              fee.student.name,

            className:
              fee.student.className,

            month: fee.month,

            year: fee.year,

            totalFee:
              fee.totalFee,

            paidAmount:
              fee.paidAmount,

            dueDate:
              fee.dueDate.toISOString(),

            paymentDate:
              fee.paymentDate
                ? fee.paymentDate.toISOString()
                : null,

            status:
              fee.status as
                | "Paid"
                | "Pending"
                | "Overdue",
          })
        );

      setFees(data);
    } catch (error) {
      console.error(
        "LOAD FEES ERROR:",
        error
      );
    }
  }

  useEffect(() => {
    loadFees(
      selectedMonth,
      selectedYear
    );
  }, [
    selectedMonth,
    selectedYear,
    selectedStudentId,
  ]);

  const filteredFees =
    useMemo(() => {
      return fees.filter((item) => {
        const matchSearch =
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchClass =
          selectedClass === "All" ||
          item.className ===
            selectedClass;

        return (
          matchSearch &&
          matchClass
        );
      });
    }, [
      fees,
      search,
      selectedClass,
    ]);

  const summary =
    useMemo(() => {
      return calculateFeesSummary(
        filteredFees
      );
    }, [filteredFees]);

  async function updatePayment(
    id: string,
    amount: number
  ) {
    try {
      await updateFeePayment(
        id,
        amount
      );

      await loadFees(
        selectedMonth,
        selectedYear
      );
    } catch (error) {
      console.error(
        "UPDATE PAYMENT ERROR:",
        error
      );
    }
  }

  return {
    fees: filteredFees,

    summary,

    search,
    setSearch,

    selectedClass,
    setSelectedClass,

    selectedMonth,
    setSelectedMonth,

    selectedYear,
    setSelectedYear,

    updatePayment,

    reload: () =>
      loadFees(
        selectedMonth,
        selectedYear
      ),
  };
}