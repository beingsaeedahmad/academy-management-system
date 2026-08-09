"use server";

import { prisma } from "@/lib/prisma";

export interface ReportFilters {
  month: string;
  year: string;
}

export interface ReportsData {
  summary: {
    totalStudents: number;
    activeStudents: number;
    attendanceRate: number;
    feesCollected: number;
    feesPending: number;
  };

  attendance: {
    present: number;
    absent: number;
    leave: number;
    holiday: number;
    total: number;
    attendanceRate: number;
  };

  fees: {
    totalFees: number;
    collected: number;
    pending: number;
    overdue: number;
    collectionRate: number;
  };

  students: {
    total: number;
    active: number;
    inactive: number;
    newAdmissions: number;
  };

  academic: {
    totalSubjects: number;
    totalNotes: number;
    totalClasses: number;
  };

  recentStudents: {
    id: string;
    name: string;
    className: string;
    status: string;
    admissionDate: string;
  }[];
}

interface FeeReportRecord {
  totalFee: number;
  paidAmount: number;
  status: string;
}

interface RecentStudentRecord {
  id: string;
  name: string;
  className: string;
  status: string;
  admissionDate: Date;
}

function getDateRange(month: string, year: string) {
  if (year === "all") {
    return null;
  }

  const numericYear = Number(year);

  if (!numericYear) {
    return null;
  }

  if (month === "all") {
    return {
      start: new Date(numericYear, 0, 1),
      end: new Date(numericYear + 1, 0, 1),
    };
  }

  const numericMonth = Number(month);

  if (
    !numericMonth ||
    numericMonth < 1 ||
    numericMonth > 12
  ) {
    return null;
  }

  return {
    start: new Date(
      numericYear,
      numericMonth - 1,
      1
    ),
    end: new Date(
      numericYear,
      numericMonth,
      1
    ),
  };
}

export async function getReports(
  filters: ReportFilters
): Promise<ReportsData> {
  const { month, year } = filters;

  const dateRange = getDateRange(month, year);

  /*
   * =========================================================
   * STUDENTS
   * =========================================================
   */

  const totalStudents =
    await prisma.student.count();

  const activeStudents =
    await prisma.student.count({
      where: {
        status: "Active",
      },
    });

  const inactiveStudents =
    await prisma.student.count({
      where: {
        NOT: {
          status: "Active",
        },
      },
    });

  const newAdmissions =
    await prisma.student.count({
      where: dateRange
        ? {
            admissionDate: {
              gte: dateRange.start,
              lt: dateRange.end,
            },
          }
        : {},
    });

  /*
   * =========================================================
   * ATTENDANCE
   * =========================================================
   */

  const attendanceWhere = dateRange
    ? {
        date: {
          gte: dateRange.start,
          lt: dateRange.end,
        },
      }
    : {};

  const attendanceRecords =
    await prisma.attendance.findMany({
      where: attendanceWhere,
      select: {
        status: true,
      },
    });

  let present = 0;
  let absent = 0;
  let leave = 0;
  let holiday = 0;

  for (const record of attendanceRecords) {
    const status = record.status
      .toUpperCase()
      .trim();

    switch (status) {
      case "P":
      case "PRESENT":
        present++;
        break;

      case "A":
      case "ABSENT":
        absent++;
        break;

      case "L":
      case "LEAVE":
        leave++;
        break;

      case "H":
      case "HOLIDAY":
        holiday++;
        break;

      default:
        break;
    }
  }

  const attendanceTotal =
    present +
    absent +
    leave +
    holiday;

  const attendanceWorkingDays =
    present +
    absent +
    leave;

  const attendanceRate =
    attendanceWorkingDays > 0
      ? Math.round(
          (present / attendanceWorkingDays) * 100
        )
      : 0;

  /*
   * =========================================================
   * FEES
   * =========================================================
   */

  const feesWhere =
    month !== "all" && year !== "all"
      ? {
          month: Number(month),
          year: Number(year),
        }
      : year !== "all"
        ? {
            year: Number(year),
          }
        : month !== "all"
          ? {
              month: Number(month),
            }
          : {};

  const feeRecords: FeeReportRecord[] =
    await prisma.fee.findMany({
      where: feesWhere,
      select: {
        totalFee: true,
        paidAmount: true,
        status: true,
      },
    });

  const totalFees = feeRecords.reduce(
    (sum: number, fee: FeeReportRecord) => {
      return sum + fee.totalFee;
    },
    0
  );

  const collected = feeRecords.reduce(
    (sum: number, fee: FeeReportRecord) => {
      return sum + fee.paidAmount;
    },
    0
  );

  const pending = feeRecords.reduce(
    (sum: number, fee: FeeReportRecord) => {
      return (
        sum +
        Math.max(
          fee.totalFee - fee.paidAmount,
          0
        )
      );
    },
    0
  );

  const overdue = feeRecords.reduce(
    (sum: number, fee: FeeReportRecord) => {
      if (
        fee.status.toLowerCase() ===
        "overdue"
      ) {
        return (
          sum +
          Math.max(
            fee.totalFee - fee.paidAmount,
            0
          )
        );
      }

      return sum;
    },
    0
  );

  const collectionRate =
    totalFees > 0
      ? Math.round(
          (collected / totalFees) * 100
        )
      : 0;

  /*
   * =========================================================
   * ACADEMIC
   * =========================================================
   */

  const totalSubjects =
    await prisma.subject.count();

  const totalNotes =
    await prisma.note.count();

  const classRecords =
    await prisma.student.findMany({
      select: {
        className: true,
      },
      distinct: ["className"],
    });

  const totalClasses =
    classRecords.length;

  /*
   * =========================================================
   * RECENT STUDENTS
   * =========================================================
   */

  const recentStudents: RecentStudentRecord[] =
    await prisma.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        name: true,
        className: true,
        status: true,
        admissionDate: true,
      },
    });

  /*
   * =========================================================
   * RETURN
   * =========================================================
   */

  return {
    summary: {
      totalStudents,
      activeStudents,
      attendanceRate,
      feesCollected: collected,
      feesPending: pending,
    },

    attendance: {
      present,
      absent,
      leave,
      holiday,
      total: attendanceTotal,
      attendanceRate,
    },

    fees: {
      totalFees,
      collected,
      pending,
      overdue,
      collectionRate,
    },

    students: {
      total: totalStudents,
      active: activeStudents,
      inactive: inactiveStudents,
      newAdmissions,
    },

    academic: {
      totalSubjects,
      totalNotes,
      totalClasses,
    },

    recentStudents:
      recentStudents.map(
        (student: RecentStudentRecord) => ({
          id: student.id,
          name: student.name,
          className: student.className,
          status: student.status,
          admissionDate:
            student.admissionDate.toISOString(),
        })
      ),
  };
}