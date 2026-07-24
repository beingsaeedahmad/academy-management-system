"use server";

import { prisma } from "@/lib/prisma";
import type { Fee, Student } from "@prisma/client";

export type FeeWithStudent = Fee & {
  student: Student;
};

// ================= GET FEES =================

export async function getFees(
  month?: number,
  year?: number
): Promise<FeeWithStudent[]> {
  const today = new Date();

  const selectedMonth =
    month ?? today.getMonth() + 1;

  const selectedYear =
    year ?? today.getFullYear();

  // Get all students
  const students = await prisma.student.findMany();

  // Auto create fee for selected month
  for (const student of students) {
    const exists = await prisma.fee.findUnique({
      where: {
        studentId_month_year: {
          studentId: student.id,
          month: selectedMonth,
          year: selectedYear,
        },
      },
    });

    if (!exists) {
      await prisma.fee.create({
        data: {
          studentId: student.id,

          month: selectedMonth,
          year: selectedYear,

          totalFee: student.monthlyFees,
          paidAmount: 0,

          dueDate: new Date(
            selectedYear,
            selectedMonth - 1,
            10
          ),

          paymentDate: null,

          remarks: null,

          status: "Pending",
        },
      });
    }
  }

  return prisma.fee.findMany({
    where: {
      month: selectedMonth,
      year: selectedYear,
    },

    include: {
      student: true,
    },

    orderBy: {
      student: {
        rollNumber: "asc",
      },
    },
  });
}

// ================= GENERATE MONTHLY FEES =================

export async function generateMonthlyFees(
  month: number,
  year: number
) {
  const students =
    await prisma.student.findMany();

  for (const student of students) {
    const exists =
      await prisma.fee.findUnique({
        where: {
          studentId_month_year: {
            studentId: student.id,
            month,
            year,
          },
        },
      });

    if (!exists) {
      await prisma.fee.create({
        data: {
          studentId: student.id,

          month,
          year,

          totalFee: student.monthlyFees,

          paidAmount: 0,

          dueDate: new Date(
            year,
            month - 1,
            10
          ),

          paymentDate: null,

          remarks: null,

          status: "Pending",
        },
      });
    }
  }

  return {
    success: true,
  };
}

// ================= CREATE FEE =================

export async function createFee(
  studentId: string,
  amount: number
) {
  const today = new Date();

  return prisma.fee.create({
    data: {
      studentId,

      month: today.getMonth() + 1,

      year: today.getFullYear(),

      totalFee: amount,

      paidAmount: 0,

      dueDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        10
      ),

      paymentDate: null,

      remarks: null,

      status: "Pending",
    },
  });
}

// ================= UPDATE PAYMENT =================

export async function updateFeePayment(
  id: string,
  amount: number
) {
  const fee =
    await prisma.fee.findUnique({
      where: {
        id,
      },
    });

  if (!fee) {
    throw new Error(
      "Fee record not found"
    );
  }

  const paidAmount =
    fee.paidAmount + amount;

  const status =
    paidAmount >= fee.totalFee
      ? "Paid"
      : "Pending";

  return prisma.fee.update({
    where: {
      id,
    },

    data: {
      paidAmount,

      status,

      paymentDate:
        status === "Paid"
          ? new Date()
          : null,
    },
  });
}

// ================= DELETE FEE =================

export async function deleteFee(
  id: string
) {
  return prisma.fee.delete({
    where: {
      id,
    },
  });
}