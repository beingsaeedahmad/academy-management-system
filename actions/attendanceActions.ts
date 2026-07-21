"use server";

import { prisma } from "@/lib/prisma";

export type AttendanceStatus = "P" | "A" | "L" | "H";

// ================= GET ATTENDANCE =================

export async function getAttendance(
  month: number,
  year: number
) {
  try {
    console.log("Loading Attendance:", {
      month,
      year,
    });

    const startDate = new Date(
      year,
      month - 1,
      1,
      0,
      0,
      0,
      0
    );

    const endDate = new Date(
      year,
      month,
      1,
      0,
      0,
      0,
      0
    );

    const attendance =
      await prisma.attendance.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: {
          date: "asc",
        },
      });

    console.log(
      "Attendance Records Found:",
      attendance.length
    );

    return attendance;
  } catch (error) {
    console.error(
      "GET ATTENDANCE ERROR:",
      error
    );
    throw error;
  }
}

// ================= SAVE ATTENDANCE =================

export async function saveAttendance(
  studentId: string,
  date: string,
  status: AttendanceStatus
) {
  try {
    console.log("Saving Attendance:", {
      studentId,
      date,
      status,
    });

    const [year, month, day] = date
      .split("-")
      .map(Number);

    // Timezone Safe (12 Noon)
    const attendanceDate = new Date(
      year,
      month - 1,
      day,
      12,
      0,
      0,
      0
    );

    const attendance =
      await prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId,
            date: attendanceDate,
          },
        },
        update: {
          status,
        },
        create: {
          studentId,
          date: attendanceDate,
          status,
        },
      });

    console.log(
      "Attendance Saved Successfully:",
      attendance
    );

    return attendance;
  } catch (error) {
    console.error(
      "SAVE ATTENDANCE ERROR:",
      error
    );
    throw error;
  }
}

// ================= DELETE ATTENDANCE =================

export async function deleteAttendance(
  studentId: string,
  date: string
) {
  try {
    console.log("Deleting Attendance:", {
      studentId,
      date,
    });

    const [year, month, day] = date
      .split("-")
      .map(Number);

    const startDate = new Date(
      year,
      month - 1,
      day,
      0,
      0,
      0,
      0
    );

    const endDate = new Date(
      year,
      month - 1,
      day + 1,
      0,
      0,
      0,
      0
    );

    const result =
      await prisma.attendance.deleteMany({
        where: {
          studentId,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

    console.log(
      "Attendance Deleted:",
      result
    );

    return result;
  } catch (error) {
    console.error(
      "DELETE ATTENDANCE ERROR:",
      error
    );
    throw error;
  }
}