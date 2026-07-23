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

export default function useFees() {
  const [fees, setFees] =
    useState<StudentFee[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedClass,
    setSelectedClass,
  ] = useState("All");

  async function loadFees() {
    try {
      const feeData = await getFees();

      const data: StudentFee[] =
        feeData.map(
          (fee: FeeWithStudent) => ({
            id: fee.id,

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
    loadFees();
  }, []);

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
        fees
      );
    }, [fees]);

  async function updatePayment(
    id: string,
    amount: number
  ) {
    try {
      await updateFeePayment(
        id,
        amount
      );

      await loadFees();
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

    updatePayment,
  };
}