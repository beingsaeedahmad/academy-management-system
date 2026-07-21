"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Fee, Student } from "@prisma/client";

import { StudentFee } from "./feesTypes";

import {
  calculateFeesSummary,
  getFeeStatus,
} from "./feesUtils";

import {
  getFees,
  updateFeePayment,
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

  // ==========================
  // LOAD FEES FROM DATABASE
  // ==========================

  useEffect(() => {
    async function loadFees() {
      try {
        const feeData = await getFees();

        const fees: StudentFee[] =
          feeData.map(
            (
              fee: Fee & {
                student: Student;
              }
            ) => ({
              id: fee.id,

              rollNo:
                fee.student.rollNumber,

              name: fee.student.name,

              className:
                fee.student.className,

              totalFee:
                fee.totalFee,

              paidAmount:
                fee.paidAmount,

              dueDate:
                fee.dueDate.toISOString(),

              status: fee.status as
                | "Paid"
                | "Pending"
                | "Overdue",
            })
          );

        setFees(fees);
      } catch (error) {
        console.error(
          "LOAD FEES ERROR:",
          error
        );
      }
    }

    loadFees();
  }, []);

  // ==========================
  // FILTER
  // ==========================

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

  // ==========================
  // SUMMARY
  // ==========================

  const summary =
    useMemo(() => {
      return calculateFeesSummary(
        fees
      );
    }, [fees]);

  // ==========================
  // UPDATE PAYMENT
  // ==========================

  async function updatePayment(
    id: string,
    amount: number
  ) {
    try {
      await updateFeePayment(
        id,
        amount
      );

      const feeData =
        await getFees();

      const updatedFees: StudentFee[] =
        feeData.map(
          (
            fee: Fee & {
              student: Student;
            }
          ) => ({
            id: fee.id,

            rollNo:
              fee.student.rollNumber,

            name: fee.student.name,

            className:
              fee.student.className,

            totalFee:
              fee.totalFee,

            paidAmount:
              fee.paidAmount,

            dueDate:
              fee.dueDate.toISOString(),

            status: fee.status as
              | "Paid"
              | "Pending"
              | "Overdue",
          })
        );

      setFees(updatedFees);
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