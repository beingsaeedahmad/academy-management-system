"use server";

import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

interface CreateSubjectData {
  subject: string;
  chapter: string;
  className: string;
  teacherName?: string;
  file?: File;
}

interface UpdateSubjectData {
  subject?: string;
  chapter?: string;
  className?: string;
  teacherName?: string;
  status?: string;
  file?: File;
}

async function saveSubjectFile(file: File) {
  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "subjects"
  );

  await fs.mkdir(uploadDirectory, {
    recursive: true,
  });

  const extension = path.extname(file.name);

  const safeFileName =
    `${crypto.randomUUID()}${extension}`;

  const filePath = path.join(
    uploadDirectory,
    safeFileName
  );

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  await fs.writeFile(filePath, buffer);

  return {
    fileName: file.name,
    fileType: file.type || "application/octet-stream",
    fileSize: file.size,
    fileUrl: `/uploads/subjects/${safeFileName}`,
  };
}

// CREATE SUBJECT
export async function createSubject(
  formData: FormData
) {
  try {
    const subject =
      String(formData.get("subject") ?? "").trim();

    const chapter =
      String(formData.get("chapter") ?? "").trim();

    const className =
      String(formData.get("className") ?? "").trim();

    const teacherName =
      String(formData.get("teacherName") ?? "").trim();

    const fileValue =
      formData.get("file");

    const file =
      fileValue instanceof File
        ? fileValue
        : null;

    if (!subject) {
      throw new Error(
        "Subject name is required."
      );
    }

    if (!chapter) {
      throw new Error(
        "Chapter name is required."
      );
    }

    if (!className) {
      throw new Error(
        "Class is required."
      );
    }

    if (!teacherName) {
      throw new Error(
        "Teacher name is required."
      );
    }

    if (!file) {
      throw new Error(
        "Please select a file."
      );
    }

    const fileData =
      await saveSubjectFile(file);

    const createdSubject =
      await prisma.subject.create({
        data: {
          name: subject,
          code: `${subject}-${chapter}-${className}`
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9-]/g, "")
            .toUpperCase()
            .slice(0, 80),

          chapter,

          className,

          teacherName,

          fileName:
            fileData.fileName,

          fileType:
            fileData.fileType,

          fileSize:
            fileData.fileSize,

          fileUrl:
            fileData.fileUrl,

          status: "Active",
        },
      });

    return createdSubject;
  } catch (error) {
    console.error(
      "CREATE SUBJECT ERROR:",
      error
    );

    throw error;
  }
}

// GET ALL SUBJECTS
export async function getSubjects() {
  try {
    const subjects =
      await prisma.subject.findMany({
        orderBy: [
          {
            className: "asc",
          },
          {
            name: "asc",
          },
          {
            chapter: "asc",
          },
        ],
      });

    return subjects;
  } catch (error) {
    console.error(
      "GET SUBJECTS ERROR:",
      error
    );

    throw error;
  }
}

// GET SUBJECT BY ID
export async function getSubjectById(
  id: string
) {
  try {
    const subject =
      await prisma.subject.findUnique({
        where: {
          id,
        },
      });

    return subject;
  } catch (error) {
    console.error(
      "GET SUBJECT BY ID ERROR:",
      error
    );

    throw error;
  }
}

// UPDATE SUBJECT
export async function updateSubject(
  id: string,
  data: UpdateSubjectData
) {
  try {
    const subject =
      await prisma.subject.update({
        where: {
          id,
        },

        data: {
          ...(data.subject !== undefined && {
            name: data.subject.trim(),
          }),

          ...(data.chapter !== undefined && {
            chapter: data.chapter.trim(),
          }),

          ...(data.className !== undefined && {
            className:
              data.className.trim(),
          }),

          ...(data.teacherName !== undefined && {
            teacherName:
              data.teacherName.trim() || null,
          }),

          ...(data.status !== undefined && {
            status: data.status,
          }),
        },
      });

    return subject;
  } catch (error) {
    console.error(
      "UPDATE SUBJECT ERROR:",
      error
    );

    throw error;
  }
}

// DELETE SUBJECT
export async function deleteSubject(
  id: string
) {
  try {
    const subject =
      await prisma.subject.delete({
        where: {
          id,
        },
      });

    if (subject.fileUrl) {
      const filePath =
        path.join(
          process.cwd(),
          "public",
          subject.fileUrl
        );

      try {
        await fs.unlink(filePath);
      } catch (fileError) {
        console.warn(
          "SUBJECT FILE DELETE WARNING:",
          fileError
        );
      }
    }

    return {
      success: true,
      id: subject.id,
    };
  } catch (error) {
    console.error(
      "DELETE SUBJECT ERROR:",
      error
    );

    throw error;
  }
}