"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CreateNoteData, UpdateNoteData } from "@/components/Notes/notesTypes";

export async function getNotes() {
  return await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getNoteById(id: string) {
  return await prisma.note.findUnique({
    where: { id },
  });
}

export async function createNote(data: CreateNoteData) {
  const note = await prisma.note.create({
    data: {
      title: data.title,
      description: data.description,
      subject: data.subject,
      className: data.className,
      category: data.category ?? "",
      uploadedBy: data.uploadedBy,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileType: data.fileType,
      fileSize: data.fileSize,
      downloads: 0,
      isPublished: true,
    },
  });

  revalidatePath("/notes");

  return note;
}

export async function updateNote(
  id: string,
  data: UpdateNoteData
) {
  const note = await prisma.note.update({
    where: { id },
    data,
  });

  revalidatePath("/notes");

  return note;
}

export async function deleteNote(id: string) {
  await prisma.note.delete({
    where: { id },
  });

  revalidatePath("/notes");

  return {
    success: true,
  };
}

export async function incrementDownloads(id: string) {
  const note = await prisma.note.update({
    where: { id },
    data: {
      downloads: {
        increment: 1,
      },
    },
  });

  revalidatePath("/notes");

  return note;
}

export async function togglePublish(id: string) {
  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  const updated = await prisma.note.update({
    where: { id },
    data: {
      isPublished: !note.isPublished,
    },
  });

  revalidatePath("/notes");

  return updated;
}