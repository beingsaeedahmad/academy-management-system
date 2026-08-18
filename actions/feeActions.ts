"use server";

import { prisma } from "@/lib/prisma";
import type { Fee, Student } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

export type FeeWithStudent = Fee & {
  student: Student;
};

// ================= GET FEES =================

export async function getFees(
  month?: number,
  year?: number,
  studentId?: string | null
): Promise<FeeWithStudent[]> {
  try {
    noStore();

    const today = new Date();

    const selectedMonth =
      month ?? today.getMonth() + 1;

    const selectedYear =
      year ?? today.getFullYear();

    // Get all students
    const students = await prisma.student.findMany();

    // Automatically create fee for selected month
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

    // Get selected month's fees
    const fees = await prisma.fee.findMany({
      where: {
        month: selectedMonth,
        year: selectedYear,
        ...(studentId ? { studentId } : {}),
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

    // If specific student was requested
    // and selected month has no record,
    // return that student's fee history.
    if (studentId && fees.length === 0) {
      return prisma.fee.findMany({
        where: {
          studentId,
        },

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
        ],
      });
    }

    return fees;
  } catch (error) {
    console.error("GET FEES ERROR:", error);
    throw error;
  }
}

// ================= GET FEE STATS =================

export async function getFeeStats() {
  try {
    noStore();

    const today = new Date();

    const currentMonth =
      today.getMonth() + 1;

    const currentYear =
      today.getFullYear();

    // Make sure every student has
    // a fee record for the current month.
    const students = await prisma.student.findMany({
      select: {
        id: true,
        monthlyFees: true,
      },
    });

    for (const student of students) {
      const exists = await prisma.fee.findUnique({
        where: {
          studentId_month_year: {
            studentId: student.id,
            month: currentMonth,
            year: currentYear,
          },
        },
      });

      if (!exists) {
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

    // Get current month's fees
    const fees = await prisma.fee.findMany({
      where: {
        month: currentMonth,
        year: currentYear,
      },

      select: {
        totalFee: true,
        paidAmount: true,
      },
    });

    let totalFees = 0;
    let paidFees = 0;
    let pendingFees = 0;
    let feeDefaulters = 0;

    for (const fee of fees) {
      const totalFee = Number(
        fee.totalFee ?? 0
      );

      const paidAmount = Number(
        fee.paidAmount ?? 0
      );

      const pendingAmount = Math.max(
        totalFee - paidAmount,
        0
      );

      totalFees += totalFee;
      paidFees += Math.min(
        paidAmount,
        totalFee
      );
      pendingFees += pendingAmount;

      // Student is a defaulter when
      // current month's fee is not fully paid.
      if (pendingAmount > 0) {
        feeDefaulters++;
      }
    }

    return {
      totalFees,
      paidFees,
      pendingFees,
      feeDefaulters,
      month: currentMonth,
      year: currentYear,
    };
  } catch (error) {
    console.error("GET FEE STATS ERROR:", error);
    throw error;
  }
}

// ================= GENERATE MONTHLY FEES =================

export async function generateMonthlyFees(
  month: number,
  year: number
) {
  try {
    noStore();

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
  } catch (error) {
    console.error(
      "GENERATE MONTHLY FEES ERROR:",
      error
    );

    throw error;
  }
}

// ================= CREATE FEE =================

export async function createFee(
  studentId: string,
  amount: number
) {
  try {
    noStore();

    const today = new Date();

    return await prisma.fee.create({
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
  } catch (error) {
    console.error("CREATE FEE ERROR:", error);
    throw error;
  }
}

// ================= UPDATE PAYMENT =================

export async function updateFeePayment(
  id: string,
  amount: number
) {
  try {
    noStore();

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

    // Prevent invalid negative payment
    if (amount < 0) {
      throw new Error(
        "Payment amount cannot be negative"
      );
    }

    const paidAmount =
      fee.paidAmount + amount;

    const status =
      paidAmount >= fee.totalFee
        ? "Paid"
        : "Pending";

    return await prisma.fee.update({
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
  } catch (error) {
    console.error(
      "UPDATE FEE PAYMENT ERROR:",
      error
    );

    throw error;
  }
}

// ================= DELETE FEE =================

export async function deleteFee(
  id: string
) {
  try {
    noStore();

    return await prisma.fee.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("DELETE FEE ERROR:", error);
    throw error;
  }
}