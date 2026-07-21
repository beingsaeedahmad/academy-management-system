"use server";

import { prisma } from "@/lib/prisma";
import { Attendance } from "@prisma/client";

export async function getAttendanceSummary() {
  const today = new Date();

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );

  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
    0,
    0,
    0,
    0
  );

  const totalStudents =
    await prisma.student.count();

  const attendance =
    await prisma.attendance.findMany({
      where: {
        date: {
          gte: start,
          lt: end,
        },
      },
    });

  return {
    totalStudents,

present: attendance.filter(
  (a: { status: string }) => a.status === "P"
).length,

absent: attendance.filter(
  (a: { status: string }) => a.status === "A"
).length,

late: attendance.filter(
  (a: { status: string }) => a.status === "L"
).length,
  };
}