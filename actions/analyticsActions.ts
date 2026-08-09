"use server";

import { prisma } from "@/lib/prisma";

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
  paidAmount: number | null;
  totalFee: number | null;
  status: string;
  paymentDate: Date | null;
}

interface ResultRecord {
  totalMarks: number | null;
  obtainedMarks: number | null;
}

export interface AnalyticsData {
  overview: {
    totalStudents: number;
    attendanceRate: number;
    feesCollected: number;
    averageResult: number;
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

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    /*
     * =========================================================
     * STUDENTS
     * =========================================================
     */

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
      (student: StudentRecord) =>
        student.status?.toLowerCase() === "active"
    ).length;

    const inactiveStudents =
      totalStudents - activeStudents;

    /*
     * =========================================================
     * CLASS DISTRIBUTION
     * =========================================================
     */

    const classMap = new Map<string, number>();

    students.forEach((student: StudentRecord) => {
      const className =
        student.className?.trim() || "Unknown";

      classMap.set(
        className,
        (classMap.get(className) ?? 0) + 1
      );
    });

    const classDistribution = Array.from(
      classMap.entries()
    )
      .map(
        ([className, students]: [string, number]) => ({
          className,
          students,
        })
      )
      .sort(
        (
          a: { students: number },
          b: { students: number }
        ) => b.students - a.students
      );

    /*
     * =========================================================
     * ATTENDANCE
     * =========================================================
     */

    const attendanceRecords: AttendanceRecord[] =
      await prisma.attendance.findMany({
        select: {
          status: true,
          date: true,
        },
      });

    const presentAttendance =
      attendanceRecords.filter(
        (record: AttendanceRecord) =>
          record.status === "P" ||
          record.status === "Present"
      ).length;

    const absentAttendance =
      attendanceRecords.filter(
        (record: AttendanceRecord) =>
          record.status === "A" ||
          record.status === "Absent"
      ).length;

    const leaveAttendance =
      attendanceRecords.filter(
        (record: AttendanceRecord) =>
          record.status === "L" ||
          record.status === "Leave"
      ).length;

    const attendanceTotal =
      presentAttendance +
      absentAttendance +
      leaveAttendance;

    const attendanceRate =
      attendanceTotal > 0
        ? (presentAttendance / attendanceTotal) * 100
        : 0;

    /*
     * =========================================================
     * MONTHLY ATTENDANCE
     * =========================================================
     */

    const attendanceMonthMap = new Map<
      string,
      {
        present: number;
        absent: number;
        leave: number;
      }
    >();

    attendanceRecords.forEach(
      (record: AttendanceRecord) => {
        const date = new Date(record.date);

        const month = date.toLocaleString("en-US", {
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
      }
    );

    const monthlyAttendance =
      Array.from(
        attendanceMonthMap.entries()
      ).map(
        (
          [month, values]: [
            string,
            {
              present: number;
              absent: number;
              leave: number;
            }
          ]
        ) => ({
          month,
          ...values,
        })
      );

    /*
     * =========================================================
     * FEES
     * =========================================================
     */

    const fees: FeeRecord[] =
      await prisma.fee.findMany({
        select: {
          paidAmount: true,
          totalFee: true,
          status: true,
          paymentDate: true,
        },
      });

    const feesCollected = fees.reduce(
      (
        total: number,
        fee: FeeRecord
      ) =>
        total + Number(fee.paidAmount ?? 0),
      0
    );

    const pendingFees = fees
      .filter(
        (fee: FeeRecord) =>
          fee.status === "Pending"
      )
      .reduce(
        (
          total: number,
          fee: FeeRecord
        ) =>
          total +
          Math.max(
            Number(fee.totalFee ?? 0) -
              Number(fee.paidAmount ?? 0),
            0
          ),
        0
      );

    const overdueFees = fees
      .filter(
        (fee: FeeRecord) =>
          fee.status === "Overdue"
      )
      .reduce(
        (
          total: number,
          fee: FeeRecord
        ) =>
          total +
          Math.max(
            Number(fee.totalFee ?? 0) -
              Number(fee.paidAmount ?? 0),
            0
          ),
        0
      );

    /*
     * =========================================================
     * MONTHLY FEES
     * =========================================================
     */

    const monthlyFeeMap = new Map<
      string,
      number
    >();

    fees.forEach((fee: FeeRecord) => {
      if (!fee.paymentDate) return;

      const date = new Date(
        fee.paymentDate
      );

      const month = date.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );

      monthlyFeeMap.set(
        month,
        (monthlyFeeMap.get(month) ?? 0) +
          Number(fee.paidAmount ?? 0)
      );
    });

    const monthlyFees = Array.from(
      monthlyFeeMap.entries()
    ).map(
      ([month, amount]: [string, number]) => ({
        month,
        amount,
      })
    );

    /*
     * =========================================================
     * RESULTS
     * =========================================================
     */

    const results: ResultRecord[] =
      await prisma.result.findMany({
        select: {
          totalMarks: true,
          obtainedMarks: true,
        },
      });

    const totalResults = results.length;

    let totalPercentage = 0;
    let validResults = 0;

    let passedResults = 0;
    let failedResults = 0;

    results.forEach(
      (result: ResultRecord) => {
        const totalMarks =
          Number(result.totalMarks ?? 0);

        const obtainedMarks =
          Number(result.obtainedMarks ?? 0);

        if (totalMarks <= 0) return;

        const percentage =
          (obtainedMarks / totalMarks) * 100;

        totalPercentage += percentage;
        validResults++;

        if (percentage >= 50) {
          passedResults++;
        } else {
          failedResults++;
        }
      }
    );

    const averageResult =
      validResults > 0
        ? totalPercentage / validResults
        : 0;

    /*
     * =========================================================
     * FINAL DATA
     * =========================================================
     */

    return {
      overview: {
        totalStudents,

        attendanceRate: Number(
          attendanceRate.toFixed(1)
        ),

        feesCollected,

        averageResult: Number(
          averageResult.toFixed(1)
        ),
      },

      students: {
        total: totalStudents,
        active: activeStudents,
        inactive: inactiveStudents,
      },

      attendance: {
        present: presentAttendance,
        absent: absentAttendance,
        leave: leaveAttendance,

        rate: Number(
          attendanceRate.toFixed(1)
        ),
      },

      fees: {
        collected: feesCollected,
        pending: pendingFees,
        overdue: overdueFees,
      },

      results: {
        total: totalResults,

        averagePercentage: Number(
          averageResult.toFixed(1)
        ),

        passed: passedResults,
        failed: failedResults,
      },

      classDistribution,

      monthlyFees,

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