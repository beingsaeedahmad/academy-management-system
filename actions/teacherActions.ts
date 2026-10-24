"use server";

import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export type TeacherInput = {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  qualification?: string;
  className?: string;
  status?: string;
};

export async function getTeachers() {
  noStore();

  return prisma.teacher.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createTeacher(data: TeacherInput) {
  noStore();

  if (!data.name.trim() || !data.phone.trim() || !data.subject.trim()) {
    throw new Error("Name, phone and subject are required.");
  }

  return prisma.teacher.create({
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      subject: data.subject.trim(),
      qualification: data.qualification?.trim() || null,
      className: data.className?.trim() || null,
      status: data.status || "Active",
    },
  });
}

export async function updateTeacher(id: string, data: TeacherInput) {
  noStore();

  return prisma.teacher.update({
    where: { id },
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      subject: data.subject.trim(),
      qualification: data.qualification?.trim() || null,
      className: data.className?.trim() || null,
      status: data.status || "Active",
    },
  });
}

export async function deleteTeacher(id: string) {
  noStore();

  return prisma.teacher.delete({
    where: { id },
  });
}
