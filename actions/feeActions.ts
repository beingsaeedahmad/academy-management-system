"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type FeeWithStudent = Prisma.FeeGetPayload<{
  include: {
    student: true;
  };
}>;

// ================= GET FEES =================

export async function getFees(): Promise<FeeWithStudent[]> {

  const fee = await prisma.fee.findFirst();

console.log(fee?.paymentDate);

  const today = new Date();

  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // Get all students
  const students = await prisma.student.findMany();

  // Create current month fee if missing
  for (const student of students) {
    const feeExists = await prisma.fee.findUnique({
      where: {
        studentId_month_year: {
          studentId: student.id,
          month: currentMonth,
          year: currentYear,
        },
      },
    });

    if (!feeExists) {
      await prisma.fee.create({
        data: {
          studentId: student.id,

          month: currentMonth,

          year: currentYear,

          totalFee: student.monthlyFees,

          paidAmount: 0,

          dueDate: new Date(
            currentYear,
            currentMonth - 1,
            10
          ),

          paymentDate: null,

          remarks: null,

          status: "Pending",
        },
      });
    }
  }

  const fees = await prisma.fee.findMany({
    include: {
      student: true,
    },
    orderBy: [
      {
        year: "desc",
      },
      {
        month: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return fees;
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
  const fee = await prisma.fee.findUnique({
    where: {
      id,
    },
  });

  if (!fee) {
    throw new Error("Fee record not found");
  }

  const paidAmount = fee.paidAmount + amount;

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