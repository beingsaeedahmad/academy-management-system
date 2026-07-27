"use server";

import { prisma } from "@/lib/prisma";
import { Fee } from "@prisma/client";

export async function getDashboardStats() {
  // Today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [
    totalStudents,
    presentStudents,
    absentStudents,
    allFees,
  ] = await Promise.all([
    prisma.student.count(),

    prisma.attendance.count({
      where: {
        status: "P",
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    }),

    prisma.attendance.count({
      where: {
        status: "A",
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    }),

prisma.fee.findMany({ where: { month: today.getMonth() + 1, year: today.getFullYear(), }, select: { totalFee: true, paidAmount: true, status: true, }, }),
  ]);

  // Total Collected Fee
  const collectedFee = allFees.reduce(
    (
      total: number,
      fee: Pick<Fee, "paidAmount">
    ) => total + fee.paidAmount,
    0
  );

  // Only Pending + Overdue Remaining Amount
  const pendingFees = allFees
    .filter(
      (
        fee: Pick<Fee, "status">
      ) =>
        fee.status === "Pending" ||
        fee.status === "Overdue"
    )
    .reduce(
      (
        total: number,
        fee: Pick<
          Fee,
          "totalFee" | "paidAmount"
        >
      ) =>
        total +
        Math.max(
          fee.totalFee - fee.paidAmount,
          0
        ),
      0
    );

  // Overdue Remaining Amount
  const overdueFees = allFees
    .filter(
      (
        fee: Pick<Fee, "status">
      ) =>
        fee.status === "Overdue"
    )
    .reduce(
      (
        total: number,
        fee: Pick<
          Fee,
          "totalFee" | "paidAmount"
        >
      ) =>
        total +
        Math.max(
          fee.totalFee - fee.paidAmount,
          0
        ),
      0
    );

    console.log("TOTAL FEES:", allFees.length);

console.table(allFees);

  return {
    totalStudents,
    presentStudents,
    absentStudents,
    collectedFee,
    pendingFees,
    overdueFees,
  };
}