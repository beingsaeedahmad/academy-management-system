"use server";

import { prisma } from "@/lib/prisma";

// ================= GET FEES =================

export async function getFees() {
  return prisma.fee.findMany({
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