"use server";

import { prisma } from "@/lib/prisma";
import { Fee } from "@prisma/client";

type DashboardStudent = {
  id: string;
  name: string;
  className: string;
  createdAt: Date;
};

type DashboardFee = {
  id: string;
  paidAmount: number;
  month: number;
  year: number;
  updatedAt: Date;
  student: {
    name: string;
  };
};

type DashboardAttendance = {
  id: string;
  status: string;
  updatedAt: Date;
  student: {
    name: string;
    className: string;
  };
};

type DashboardNote = {
  id: string;
  title: string;
  className: string | null;
  createdAt: Date;
};

type MonthlyStudent = {
  admissionDate: Date;
};

type MonthlyFee = {
  month: number;
  year: number;
  paidAmount: number;
};

/* =========================================================
   DASHBOARD STATS
========================================================= */

export async function getDashboardStats() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

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
      where: {
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      },

      select: {
        totalFee: true,
        paidAmount: true,
        status: true,
      },
    }),
  ]);

  const collectedFee = allFees.reduce(
    (
      total: number,
      fee: Pick<Fee, "paidAmount">
    ) => {
      return total + fee.paidAmount;
    },
    0
  );

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
      ) => {
        return (
          total +
          Math.max(
            fee.totalFee -
              fee.paidAmount,
            0
          )
        );
      },
      0
    );

  const overdueFees = allFees
    .filter(
      (
        fee: Pick<Fee, "status">
      ) => fee.status === "Overdue"
    )
    .reduce(
      (
        total: number,
        fee: Pick<
          Fee,
          "totalFee" | "paidAmount"
        >
      ) => {
        return (
          total +
          Math.max(
            fee.totalFee -
              fee.paidAmount,
            0
          )
        );
      },
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

/* =========================================================
   RECENT ACTIVITY
========================================================= */

export type ActivityType =
  | "admission"
  | "fee"
  | "attendance"
  | "note";

export interface DashboardActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  href: string;
}

export async function getRecentActivity(): Promise<
  DashboardActivity[]
> {
  const [
    rawStudents,
    rawFees,
    rawAttendance,
    rawNotes,
  ] = await Promise.all([
    prisma.student.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        name: true,
        className: true,
        createdAt: true,
      },
    }),

    prisma.fee.findMany({
      where: {
        paidAmount: {
          gt: 0,
        },
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        paidAmount: true,
        month: true,
        year: true,
        updatedAt: true,

        student: {
          select: {
            name: true,
          },
        },
      },
    }),

    prisma.attendance.findMany({
      orderBy: {
        updatedAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        status: true,
        updatedAt: true,

        student: {
          select: {
            name: true,
            className: true,
          },
        },
      },
    }),

    prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        title: true,
        className: true,
        createdAt: true,
      },
    }),
  ]);

  const students: DashboardStudent[] =
    rawStudents;

  const fees: DashboardFee[] =
    rawFees;

  const attendanceRecords: DashboardAttendance[] =
    rawAttendance;

  const notes: DashboardNote[] =
    rawNotes;

  const statusLabels: Record<
    string,
    string
  > = {
    P: "Present",
    A: "Absent",
    L: "Late",
    H: "Holiday",
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const activities: DashboardActivity[] = [
    ...students.map(
      (
        student: DashboardStudent
      ) => ({
        id: `student-${student.id}`,

        type: "admission" as const,

        title: "New Admission",

        description:
          `${student.name} admitted to ${student.className}`,

        timestamp:
          student.createdAt.toISOString(),

        href: "/students",
      })
    ),

    ...fees.map(
      (fee: DashboardFee) => ({
        id: `fee-${fee.id}`,

        type: "fee" as const,

        title: "Fee Received",

        description:
          `${fee.student.name} paid Rs. ${fee.paidAmount.toLocaleString()} (${monthNames[fee.month - 1]} ${fee.year})`,

        timestamp:
          fee.updatedAt.toISOString(),

        href: "/fees",
      })
    ),

    ...attendanceRecords.map(
      (
        record: DashboardAttendance
      ) => ({
        id: `attendance-${record.id}`,

        type: "attendance" as const,

        title: "Attendance Updated",

        description:
          `${record.student.name} (${record.student.className}) marked ${
            statusLabels[record.status] ??
            record.status
          }`,

        timestamp:
          record.updatedAt.toISOString(),

        href: "/attendance",
      })
    ),

    ...notes.map(
      (note: DashboardNote) => ({
        id: `note-${note.id}`,

        type: "note" as const,

        title: "Note Uploaded",

        description:
          `"${note.title}" added for ${
            note.className ?? "All Classes"
          }`,

        timestamp:
          note.createdAt.toISOString(),

        href: "/notes",
      })
    ),
  ];

  return activities
    .sort(
      (
        a: DashboardActivity,
        b: DashboardActivity
      ) =>
        new Date(
          b.timestamp
        ).getTime() -
        new Date(
          a.timestamp
        ).getTime()
    )
    .slice(0, 6);
}

/* =========================================================
   MONTHLY CHART
========================================================= */

export interface MonthlyChartPoint {
  month: string;
  students: number;
  fees: number;
}

export async function getMonthlyChartData(): Promise<
  MonthlyChartPoint[]
> {
  const now = new Date();

  const months: {
    month: number;
    year: number;
    label: string;
  }[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    months.push({
      month:
        date.getMonth() + 1,

      year:
        date.getFullYear(),

      label:
        date.toLocaleString(
          "en-US",
          {
            month: "short",
          }
        ),
    });
  }

  const startDate = new Date(
    months[0].year,
    months[0].month - 1,
    1
  );

  const [
    rawStudents,
    rawFees,
  ] = await Promise.all([
    prisma.student.findMany({
      where: {
        admissionDate: {
          gte: startDate,
        },
      },

      select: {
        admissionDate: true,
      },
    }),

    prisma.fee.findMany({
      where: {
        OR: months.map(
          ({
            month,
            year,
          }) => ({
            month,
            year,
          })
        ),
      },

      select: {
        month: true,
        year: true,
        paidAmount: true,
      },
    }),
  ]);

  const students: MonthlyStudent[] =
    rawStudents;

  const fees: MonthlyFee[] =
    rawFees;

  return months.map(
    ({
      month,
      year,
      label,
    }) => ({
      month: label,

      students: students.filter(
        (
          student: MonthlyStudent
        ) => {
          const admission =
            new Date(
              student.admissionDate
            );

          return (
            admission.getMonth() +
              1 ===
              month &&
            admission.getFullYear() ===
              year
          );
        }
      ).length,

      fees: fees
        .filter(
          (
            fee: MonthlyFee
          ) =>
            fee.month === month &&
            fee.year === year
        )
        .reduce(
          (
            sum: number,
            fee: MonthlyFee
          ) =>
            sum +
            fee.paidAmount,
          0
        ),
    })
  );
}