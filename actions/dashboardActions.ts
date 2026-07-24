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

    prisma.fee.findMany({
      select: {
        totalFee: true,
        paidAmount: true,
        status: true,
      },
    }),
  ]);

  // Total Collected Fee
  const collectedFee = allFees.reduce(
    (total: number, fee: Pick<Fee, "paidAmount">) =>
      total + fee.paidAmount,
    0
  );

  // Total Remaining Pending Fee
  const pendingFees = allFees.reduce(
    (
      total: number,
      fee: Pick<Fee, "totalFee" | "paidAmount">
    ) => total + (fee.totalFee - fee.paidAmount),
    0
  );

  // Total Overdue Remaining Fee
  const overdueFees = allFees
    .filter(
      (fee: Pick<Fee, "status">) =>
        fee.status === "Overdue"
    )
    .reduce(
      (
        total: number,
        fee: Pick<Fee, "totalFee" | "paidAmount">
      ) => total + (fee.totalFee - fee.paidAmount),
      0
    );

  return {
    totalStudents,
    presentStudents,
    absentStudents,
    collectedFee,
    pendingFees,
    overdueFees,
  };
}