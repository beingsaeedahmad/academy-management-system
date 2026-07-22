"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  // Today (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Tomorrow (00:00:00)
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [
    totalStudents,
    presentStudents,
    absentStudents,
    feeSummary,
    pendingFees,
    overdueFees,
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

    prisma.fee.aggregate({
      _sum: {
        paidAmount: true,
      },
    }),

    prisma.fee.count({
      where: {
        status: "Pending",
      },
    }),

    prisma.fee.count({
      where: {
        status: "Overdue",
      },
    }),
  ]);

  return {
    totalStudents,
    presentStudents,
    absentStudents,
    pendingFees,
    overdueFees,
    collectedFee: feeSummary._sum.paidAmount ?? 0,
  };
}