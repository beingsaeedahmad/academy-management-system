"use server";

import { prisma } from "@/lib/prisma";

/* =========================================================
   TYPES
========================================================= */

interface StudentRecord {
  id: string;
  className: string | null;
  status: string | null;
}

interface AttendanceRecord {
  status: string;
  date: Date;
}

interface FeeRecord {
  studentId: string;
  paidAmount: number | null;
  totalFee: number | null;
  status: string;
  paymentDate: Date | null;
  month: number;
  year: number;
}

interface ResultRecord {
  totalMarks: number;
  obtainedMarks: number;
}

/* =========================================================
   ANALYTICS DATA
========================================================= */

export interface AnalyticsData {
  overview: {
    totalStudents: number;
    attendanceRate: number;
    feesCollected: number;
    pendingFees: number;

    totalFees: number;
    presentAttendance: number;
    absentAttendance: number;
    feeDefaulters: number;
  };

  students: {
    total: number;
    active: number;
    inactive: number;
  };

  attendance: {
    present: number;
    absent: number;
    leave: number;
    rate: number;
  };

  fees: {
    collected: number;
    pending: number;
    overdue: number;
  };

  results: {
    total: number;
    averagePercentage: number;
    passed: number;
    failed: number;
  };

  classDistribution: {
    className: string;
    students: number;
  }[];

  monthlyFees: {
    month: string;
    amount: number;
  }[];

  monthlyAttendance: {
    month: string;
    present: number;
    absent: number;
    leave: number;
  }[];
}

/* =========================================================
   GET ANALYTICS DATA
========================================================= */

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    /* =======================================================
       STUDENTS
    ======================================================= */

    const students: StudentRecord[] =
      await prisma.student.findMany({
        select: {
          id: true,
          className: true,
          status: true,
        },
      });

    const totalStudents = students.length;

    const activeStudents = students.filter(
      (student) =>
        student.status?.toLowerCase() === "active"
    ).length;

    const inactiveStudents =
      totalStudents - activeStudents;

    /* =======================================================
       CLASS DISTRIBUTION
    ======================================================= */

    const classMap = new Map<string, number>();

    students.forEach((student) => {
      const className =
        student.className?.trim() || "Unknown";

      classMap.set(
        className,
        (classMap.get(className) ?? 0) + 1
      );
    });

    const classDistribution =
      Array.from(classMap.entries())
        .map(([className, studentCount]) => ({
          className,
          students: studentCount,
        }))
        .sort(
          (a, b) =>
            b.students - a.students
        );

    /* =======================================================
       ATTENDANCE
    ======================================================= */

    const attendanceRecords: AttendanceRecord[] =
      await prisma.attendance.findMany({
        select: {
          status: true,
          date: true,
        },
      });

    const presentAttendance =
      attendanceRecords.filter(
        (record) =>
          record.status === "P" ||
          record.status === "Present"
      ).length;

    const absentAttendance =
      attendanceRecords.filter(
        (record) =>
          record.status === "A" ||
          record.status === "Absent"
      ).length;

    const leaveAttendance =
      attendanceRecords.filter(
        (record) =>
          record.status === "L" ||
          record.status === "Leave"
      ).length;

    const attendanceTotal =
      presentAttendance +
      absentAttendance +
      leaveAttendance;

    const attendanceRate =
      attendanceTotal > 0
        ? (presentAttendance /
            attendanceTotal) *
          100
        : 0;

    /* =======================================================
       MONTHLY ATTENDANCE
    ======================================================= */

    const attendanceMonthMap = new Map<
      string,
      {
        present: number;
        absent: number;
        leave: number;
      }
    >();

    attendanceRecords.forEach((record) => {
      const date = new Date(record.date);

      const month =
        date.toLocaleString("en-US", {
          month: "short",
        });

      if (!attendanceMonthMap.has(month)) {
        attendanceMonthMap.set(month, {
          present: 0,
          absent: 0,
          leave: 0,
        });
      }

      const current =
        attendanceMonthMap.get(month)!;

      if (
        record.status === "P" ||
        record.status === "Present"
      ) {
        current.present++;
      } else if (
        record.status === "A" ||
        record.status === "Absent"
      ) {
        current.absent++;
      } else if (
        record.status === "L" ||
        record.status === "Leave"
      ) {
        current.leave++;
      }
    });

    const monthlyAttendance =
      Array.from(
        attendanceMonthMap.entries()
      ).map(([month, values]) => ({
        month,
        ...values,
      }));

    /* =======================================================
       FEES
    ======================================================= */

    const fees: FeeRecord[] =
      await prisma.fee.findMany({
        select: {
          studentId: true,
          paidAmount: true,
          totalFee: true,
          status: true,
          paymentDate: true,
          month: true,
          year: true,
        },
      });

    /* =======================================================
       CURRENT MONTH
    ======================================================= */

    const now = new Date();

    const currentMonth =
      now.getMonth() + 1;

    const currentYear =
      now.getFullYear();

    const currentMonthFees =
      fees.filter(
        (fee) =>
          fee.month === currentMonth &&
          fee.year === currentYear
      );

    /* =======================================================
       TOTAL FEES - CURRENT MONTH
    ======================================================= */

    const totalFees =
      currentMonthFees.reduce(
        (total, fee) => {
          return (
            total +
            Number(fee.totalFee ?? 0)
          );
        },
        0
      );

    /* =======================================================
       FEES COLLECTED - CURRENT MONTH
    ======================================================= */

    const feesCollected =
      currentMonthFees.reduce(
        (total, fee) => {
          return (
            total +
            Number(fee.paidAmount ?? 0)
          );
        },
        0
      );

    /* =======================================================
       PENDING FEES - CURRENT MONTH
       
       Pending =
       totalFee - paidAmount
    ======================================================= */

    const pendingFees =
      currentMonthFees.reduce(
        (total, fee) => {
          const totalFee =
            Number(
              fee.totalFee ?? 0
            );

          const paidAmount =
            Number(
              fee.paidAmount ?? 0
            );

          const outstanding =
            Math.max(
              totalFee - paidAmount,
              0
            );

          return (
            total + outstanding
          );
        },
        0
      );

    /* =======================================================
       OVERDUE FEES - CURRENT MONTH
    ======================================================= */

    const overdueFees =
      currentMonthFees
        .filter(
          (fee) =>
            fee.status?.toLowerCase() ===
            "overdue"
        )
        .reduce(
          (total, fee) => {
            const totalFee =
              Number(
                fee.totalFee ?? 0
              );

            const paidAmount =
              Number(
                fee.paidAmount ?? 0
              );

            const outstanding =
              Math.max(
                totalFee - paidAmount,
                0
              );

            return (
              total + outstanding
            );
          },
          0
        );

    /* =======================================================
       FEE DEFAULTERS - CURRENT MONTH

       A student is a defaulter if their current-month
       outstanding fee is greater than zero.

       Set is used so one student is counted only once.
    ======================================================= */

    const feeDefaulterIds =
      new Set<string>();

    currentMonthFees.forEach(
      (fee) => {
        const totalFee =
          Number(
            fee.totalFee ?? 0
          );

        const paidAmount =
          Number(
            fee.paidAmount ?? 0
          );

        const outstanding =
          Math.max(
            totalFee - paidAmount,
            0
          );

        if (outstanding > 0) {
          feeDefaulterIds.add(
            fee.studentId
          );
        }
      }
    );

    const feeDefaulters =
      feeDefaulterIds.size;

    /* =======================================================
       MONTHLY FEES
       
       Only paid amounts are included.
    ======================================================= */

    const monthlyFeeMap =
      new Map<string, number>();

    fees.forEach((fee) => {
      if (!fee.paymentDate) {
        return;
      }

      const date =
        new Date(fee.paymentDate);

      const month =
        date.toLocaleString(
          "en-US",
          {
            month: "short",
          }
        );

      monthlyFeeMap.set(
        month,
        (monthlyFeeMap.get(month) ?? 0) +
          Number(
            fee.paidAmount ?? 0
          )
      );
    });

    const monthlyFees =
      Array.from(
        monthlyFeeMap.entries()
      ).map(
        ([month, amount]) => ({
          month,
          amount,
        })
      );

    /* =======================================================
       RESULTS
    ======================================================= */

    const results: ResultRecord[] =
      await prisma.result.findMany({
        select: {
          totalMarks: true,
          obtainedMarks: true,
        },
      });

    const totalResults =
      results.length;

    let totalPercentage = 0;

    let passedResults = 0;
    let failedResults = 0;

    results.forEach((result) => {
      const totalMarks =
        Number(
          result.totalMarks ?? 0
        );

      const obtainedMarks =
        Number(
          result.obtainedMarks ?? 0
        );

      const percentage =
        totalMarks > 0
          ? (obtainedMarks /
              totalMarks) *
            100
          : 0;

      totalPercentage +=
        percentage;

      /*
       * Passing percentage = 40%
       */
      if (percentage >= 40) {
        passedResults++;
      } else {
        failedResults++;
      }
    });

    const averageResult =
      totalResults > 0
        ? totalPercentage /
          totalResults
        : 0;

    /* =======================================================
       FINAL ANALYTICS DATA
    ======================================================= */

    return {
      overview: {
        totalStudents,

        attendanceRate:
          Number(
            attendanceRate.toFixed(1)
          ),

        feesCollected,

        pendingFees,

        /*
         * New Analytics Cards
         */

        totalFees,

        presentAttendance,

        absentAttendance,

        feeDefaulters,
      },

      /* =====================================================
         STUDENTS
      ===================================================== */

      students: {
        total: totalStudents,
        active: activeStudents,
        inactive: inactiveStudents,
      },

      /* =====================================================
         ATTENDANCE
      ===================================================== */

      attendance: {
        present:
          presentAttendance,

        absent:
          absentAttendance,

        leave:
          leaveAttendance,

        rate:
          Number(
            attendanceRate.toFixed(1)
          ),
      },

      /* =====================================================
         FEES
      ===================================================== */

      fees: {
        collected:
          feesCollected,

        pending:
          pendingFees,

        overdue:
          overdueFees,
      },

      /* =====================================================
         RESULTS
      ===================================================== */

      results: {
        total:
          totalResults,

        averagePercentage:
          Number(
            averageResult.toFixed(1)
          ),

        passed:
          passedResults,

        failed:
          failedResults,
      },

      /* =====================================================
         CLASS DISTRIBUTION
      ===================================================== */

      classDistribution,

      /* =====================================================
         MONTHLY FEES
      ===================================================== */

      monthlyFees,

      /* =====================================================
         MONTHLY ATTENDANCE
      ===================================================== */

      monthlyAttendance,
    };
  } catch (error) {
    console.error(
      "Failed to load analytics data:",
      error
    );

    throw new Error(
      "Unable to load analytics data."
    );
  }
}