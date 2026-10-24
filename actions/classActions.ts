"use server";

import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export type ClassInput = {
  name: string;
  section?: string;
  teacherName?: string;
  room?: string;
  capacity?: number;
  status?: string;
};

export type ClassRecord = {
  id: string;
  name: string;
  section: string | null;
  teacherName: string | null;
  room: string | null;
  capacity: number;
  status: string;
  studentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function getClasses(): Promise<ClassRecord[]> {
  noStore();

  const [studentGroups, existingNames] = await Promise.all([
    prisma.student.groupBy({
      by: ["className"],
      _count: { className: true },
    }),
    prisma.academyClass.findMany({
      select: { name: true },
    }),
  ]);

  const known = new Set(existingNames.map((item) => item.name));
  const missing = studentGroups.filter(
    (group) => group.className && !known.has(group.className)
  );

  if (missing.length > 0) {
    await prisma.academyClass.createMany({
      data: missing.map((group) => ({
        name: group.className,
        status: "Active",
      })),
      skipDuplicates: true,
    });
  }

  const [syncedClasses, counts] = await Promise.all([
    prisma.academyClass.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.student.groupBy({
      by: ["className"],
      _count: { className: true },
    }),
  ]);

  const countMap = new Map(
    counts.map((item) => [item.className, item._count.className])
  );

  return syncedClasses.map((item) => ({
    ...item,
    studentCount: countMap.get(item.name) ?? 0,
  }));
}

export async function createClass(data: ClassInput) {
  noStore();

  if (!data.name.trim()) {
    throw new Error("Class name is required.");
  }

  return prisma.academyClass.create({
    data: {
      name: data.name.trim(),
      section: data.section?.trim() || null,
      teacherName: data.teacherName?.trim() || null,
      room: data.room?.trim() || null,
      capacity: Number(data.capacity) || 30,
      status: data.status || "Active",
    },
  });
}

export async function updateClass(id: string, data: ClassInput) {
  noStore();

  return prisma.academyClass.update({
    where: { id },
    data: {
      name: data.name.trim(),
      section: data.section?.trim() || null,
      teacherName: data.teacherName?.trim() || null,
      room: data.room?.trim() || null,
      capacity: Number(data.capacity) || 30,
      status: data.status || "Active",
    },
  });
}

export async function deleteClass(id: string) {
  noStore();

  return prisma.academyClass.delete({
    where: { id },
  });
}
