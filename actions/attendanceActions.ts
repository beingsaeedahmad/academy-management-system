"use server";

import { prisma } from "@/lib/prisma";

export type AttendanceStatus = "" | "P" | "A" | "L" | "H";

// Get attendance for a month
export async function getAttendance(month: number, year: number) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    return await prisma.attendance.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  } catch (error) {
    console.error("GET ATTENDANCE ERROR:", error);
    throw error;
  }
}

// Save or update attendance
export async function saveAttendance(
  studentId: string,
  date: Date,
  status: AttendanceStatus
) {
  try {
    return await prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId,
          date,
        },
      },
      update: {
        status,
      },
      create: {
        studentId,
        date,
        status,
      },
    });
  } catch (error) {
    console.error("SAVE ATTENDANCE ERROR:", error);
    throw error;
  }
}