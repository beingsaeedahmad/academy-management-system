"use server";

import { prisma } from "@/lib/prisma";

export async function globalSearch(query: string) {

  if (!query.trim()) {
    return [];
  }

  const value = query.trim();

  const students = await prisma.student.findMany({

    where: {

      OR: [

        {
          name: {
            contains: value,
            mode: "insensitive",
          },
        },

        {
          fatherName: {
            contains: value,
            mode: "insensitive",
          },
        },

        {
          admissionNo: {
            contains: value,
            mode: "insensitive",
          },
        },

        {
          rollNumber: {
            contains: value,
            mode: "insensitive",
          },
        },

      ],

    },

    take: 5,

  });

  const notes = await prisma.note.findMany({

    where: {

      OR: [

        {
          title: {
            contains: value,
            mode: "insensitive",
          },
        },

        {
          subject: {
            contains: value,
            mode: "insensitive",
          },
        },

      ],

    },

    take: 5,

  });

  const fees = await prisma.fee.findMany({

    where: {

      student: {

        OR: [

          {
            name: {
              contains: value,
              mode: "insensitive",
            },
          },

          {
            rollNumber: {
              contains: value,
              mode: "insensitive",
            },
          },

        ],

      },

    },

    include: {
      student: true,
    },

    take: 5,

  });

  return {

    students,

    notes,

    fees,

  };

}