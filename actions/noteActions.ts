"use server";

import { prisma } from "@/lib/prisma";
import type { Note } from "@prisma/client";


// ================= TYPES =================

export type NoteData = Note;


// ================= GET NOTES =================

export async function getNotes(): Promise<NoteData[]> {
  return await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}


// ================= CREATE NOTE =================

interface CreateNoteData {
  title: string;
  subject: string;
  className: string;

  fileUrl: string;
  fileType: string;
}


export async function createNote(
  data: CreateNoteData
) {
  return await prisma.note.create({
    data: {
      title: data.title,

      subject: data.subject,

      className: data.className,

      fileUrl: data.fileUrl,

      fileType: data.fileType,
    },
  });
}


// ================= DELETE NOTE =================

export async function deleteNote(
  id: string
) {
  await prisma.note.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
  };
}


// ================= NOTE SUMMARY =================

export async function getNotesStats() {

  const [
    totalNotes,
    classes,
    subjects,
  ] = await Promise.all([

    prisma.note.count(),

    prisma.note.findMany({
      distinct: ["className"],
      select:{
        className:true,
      },
    }),

    prisma.note.findMany({
      distinct:["subject"],
      select:{
        subject:true,
      },
    }),

  ]);


  return {

    totalNotes,

    totalClasses:
      classes.length,

    totalSubjects:
      subjects.length,

  };
}