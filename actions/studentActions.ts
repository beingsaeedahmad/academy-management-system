"use server";

import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import type { Student } from "@/types";

interface CreateStudentData {
  name: string;
  fatherName: string;
  gender?: string;
  className: string;
  phone: string;
  address?: string;
  monthlyFees: number;
  photo?: string;
}

// ================= CREATE STUDENT =================

export async function createStudent(data: CreateStudentData) {
  try {
    noStore();

    // Generate unique Admission No & Roll No
    const totalStudents = await prisma.student.count();

    let nextNumber = totalStudents + 1;

    let admissionNo = `ADM-${String(nextNumber).padStart(4, "0")}`;
    let rollNumber = `R-${String(nextNumber).padStart(4, "0")}`;

    // Check duplicate admission number
    while (
      await prisma.student.findUnique({
        where: {
          admissionNo,
        },
      })
    ) {
      nextNumber++;

      admissionNo = `ADM-${String(nextNumber).padStart(4, "0")}`;
      rollNumber = `R-${String(nextNumber).padStart(4, "0")}`;
    }

    // Create Student
    const student = await prisma.student.create({
      data: {
        admissionNo,
        rollNumber,
        name: data.name,
        fatherName: data.fatherName,
        gender: data.gender ?? null,
        className: data.className,
        phone: data.phone,
        address: data.address ?? null,
        monthlyFees: data.monthlyFees,
        photo: data.photo ?? null,
        admissionDate: new Date(),
      },
    });

    // Automatically create current month's fee
    const today = new Date();

    await prisma.fee.create({
      data: {
        studentId: student.id,
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        totalFee: student.monthlyFees,
        paidAmount: 0,
        dueDate: today,
        status: "Pending",
      },
    });

    return student;
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);
    throw error;
  }
}

// ================= GET ALL STUDENTS =================

export async function getStudents(): Promise<Student[]> {
  try {
    noStore();

    const students = await prisma.student.findMany({
      orderBy: [
        {
          className: "asc",
        },
        {
          name: "asc",
        },
      ],
      include: {
        fees: {
          orderBy: {
            createdAt: "desc",
          },
        },
        attendance: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    return students;
  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);
    throw error;
  }
}

// ================= GET STUDENT BY ID =================

export async function getStudentById(id: string) {
  try {
    noStore();

    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        fees: {
          orderBy: {
            createdAt: "desc",
          },
        },
        attendance: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    return student;
  } catch (error) {
    console.error("GET STUDENT BY ID ERROR:", error);
    throw error;
  }
}

// ================= DELETE STUDENT =================

export async function deleteStudent(id: string) {
  console.log("SERVER DELETE START:", id);

  try {
    noStore();

    // Delete attendance records
    await prisma.attendance.deleteMany({
      where: {
        studentId: id,
      },
    });

    // Delete fee records
    await prisma.fee.deleteMany({
      where: {
        studentId: id,
      },
    });

    // Delete student
    const deleted = await prisma.student.delete({
      where: {
        id,
      },
    });

    console.log("SERVER DELETE DONE:", deleted.id);

    return {
      success: true,
      id: deleted.id,
    };
  } catch (error) {
    console.error("SERVER DELETE ERROR:", error);
    throw error;
  }
}

// ================= UPDATE STUDENT =================

export async function updateStudent(
  id: string,
  data: {
    name?: string;
    fatherName?: string;
    gender?: string;
    className?: string;
    phone?: string;
    address?: string;
    monthlyFees?: number;
    photo?: string;
  }
) {
  try {
    noStore();

    const student = await prisma.student.update({
      where: {
        id,
      },
      data,
    });

    // If monthly fee is changed,
    // update the current month's pending fee.
    if (data.monthlyFees !== undefined) {
      const today = new Date();

      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const currentFee = await prisma.fee.findFirst({
        where: {
          studentId: id,
          month: currentMonth,
          year: currentYear,
        },
      });

      if (currentFee) {
        // Only update total fee.
        // Paid amount remains unchanged.
        await prisma.fee.update({
          where: {
            id: currentFee.id,
          },
          data: {
            totalFee: data.monthlyFees,
          },
        });
      } else {
        // Create current month's fee
        // if it doesn't already exist.
        await prisma.fee.create({
          data: {
            studentId: id,
            month: currentMonth,
            year: currentYear,
            totalFee: data.monthlyFees,
            paidAmount: 0,
            dueDate: today,
            status: "Pending",
          },
        });
      }
    }

    return student;
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);
    throw error;
  }
}

// ================= STUDENT STATS =================

export async function getStudentStats() {
  try {
    noStore();

    const today = new Date();

    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const [
      totalStudents,
      activeStudents,
      newAdmissions,
      feeDefaulters,
    ] = await Promise.all([
      // Total students
      prisma.student.count(),

      // Active students
      prisma.student.count({
        where: {
          status: "Active",
        },
      }),

      // New admissions this month
      prisma.student.count({
        where: {
          createdAt: {
            gte: firstDay,
            lt: nextMonth,
          },
        },
      }),

      // Current month pending/overdue fees
      prisma.fee.count({
        where: {
          month: currentMonth,
          year: currentYear,
          status: {
            in: ["Pending", "Overdue"],
          },
        },
      }),
    ]);

    return {
      totalStudents,
      activeStudents,
      newAdmissions,
      feeDefaulters,
    };
  } catch (error) {
    console.error("GET STUDENT STATS ERROR:", error);
    throw error;
  }
}