import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Attendance
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const month = Number(searchParams.get("month"));
    const year = Number(searchParams.get("year"));

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const attendance = await prisma.attendance.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load attendance" },
      { status: 500 }
    );
  }
}

// SAVE Attendance
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const attendanceDate = new Date(body.date);
    attendanceDate.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId: body.studentId,
          date: attendanceDate,
        },
      },
      update: {
        status: body.status,
      },
      create: {
        studentId: body.studentId,
        date: attendanceDate,
        status: body.status,
      },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save attendance" },
      { status: 500 }
    );
  }
}