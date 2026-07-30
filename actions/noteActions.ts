"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface GetNotesOptions {
  search?: string;
  className?: string;
  subject?: string;
  category?: string;
  publishedOnly?: boolean;
}

export interface CreateNoteData {
  title: string;
  description?: string;

  subject: string;
  className: string;

  category?: string;
  uploadedBy?: string;

  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;

  isPublished?: boolean;
}

// ===========================
// GET NOTES
// ===========================

export async function getNotes(
  options: GetNotesOptions = {}
) {
  try {
    const notes = await prisma.note.findMany({
      where: {
        ...(options.search
          ? {
              OR: [
                {
                  title: {
                    contains: options.search,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: options.search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),

        ...(options.className
          ? {
              className: options.className,
            }
          : {}),

        ...(options.subject
          ? {
              subject: options.subject,
            }
          : {}),

        ...(options.category
          ? {
              category: options.category,
            }
          : {}),

        ...(options.publishedOnly
          ? {
              isPublished: true,
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return notes;
  } catch (error) {
    console.error("GET NOTES ERROR", error);

    return [];
  }
}

// ===========================
// CREATE NOTE
// ===========================

export async function createNote(
  data: CreateNoteData
) {
  try {
    const note = await prisma.note.create({
      data: {
        title: data.title,

        description: data.description,

        subject: data.subject,

        className: data.className,

        category: data.category,

        uploadedBy: data.uploadedBy,

        fileName: data.fileName,

        fileUrl: data.fileUrl,

        fileType: data.fileType,

        fileSize: data.fileSize,

        isPublished:
          data.isPublished ?? true,
      },
    });

    revalidatePath("/notes");

    return {
      success: true,
      note,
    };
  } catch (error) {
    console.error(
      "CREATE NOTE ERROR",
      error
    );

    return {
      success: false,
      message: "Failed to create note.",
    };
  }
}
//
// ===========================
// UPDATE NOTE
// ===========================
//

export interface UpdateNoteData {
  title?: string;
  description?: string;

  subject?: string;
  className?: string;

  category?: string;
  uploadedBy?: string;

  fileName?: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;

  isPublished?: boolean;
}

export async function updateNote(
  id: string,
  data: UpdateNoteData
) {
  try {
    const note = await prisma.note.update({
      where: {
        id,
      },

      data,
    });

    revalidatePath("/notes");

    return {
      success: true,
      note,
    };
  } catch (error) {
    console.error(
      "UPDATE NOTE ERROR",
      error
    );

    return {
      success: false,
      message: "Failed to update note.",
    };
  }
}

//
// ===========================
// DELETE NOTE
// ===========================
//

export async function deleteNote(
  id: string
) {
  try {
    await prisma.note.delete({
      where: {
        id,
      },
    });

    revalidatePath("/notes");

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "DELETE NOTE ERROR",
      error
    );

    return {
      success: false,
      message: "Failed to delete note.",
    };
  }
}

//
// ===========================
// DOWNLOAD COUNTER
// ===========================
//

export async function incrementDownloads(
  id: string
) {
  try {
    await prisma.note.update({
      where: {
        id,
      },

      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "DOWNLOAD ERROR",
      error
    );

    return {
      success: false,
    };
  }
}

//
// ===========================
// TOGGLE PUBLISH
// ===========================
//

export async function togglePublish(
  id: string,
  value: boolean
) {
  try {
    await prisma.note.update({
      where: {
        id,
      },

      data: {
        isPublished: value,
      },
    });

    revalidatePath("/notes");

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "TOGGLE PUBLISH ERROR",
      error
    );

    return {
      success: false,
    };
  }
}