"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

export interface ResultFilters {
  search?: string;
  className?: string;
  subject?: string;
  session?: string;
  status?: string;
}

export interface ResultFormData {
  studentId: string;

  /**
   * Subject ID is used only to resolve the subject name
   * from the Subject table.
   *
   * Result table stores subject as String.
   */
  subjectId?: string;

  /**
   * Direct subject name.
   */
  subject?: string;

  className?: string;
  session?: string;

  /**
   * Kept for UI compatibility.
   * Current Prisma Result model does not store examName.
   */
  examName?: string;

  totalMarks: number;
  obtainedMarks: number;

  grade?: string;
  status?: string;
  remarks?: string;

  /**
   * Kept for UI compatibility.
   * Current Prisma Result model does not store examDate.
   */
  examDate?: string | Date | null;
}

export type ResultStatus =
  | "Published"
  | "Pending"
  | "Draft";

export interface ResultRecord {
  id: string;

  studentId: string;
  studentName: string;
  rollNumber: string;

  subjectId: string | null;
  subject: string;

  className: string;

  session: string;

  /**
   * Compatibility field for existing UI.
   * Not stored in current Result model.
   */
  examName: string;

  totalMarks: number;
  obtainedMarks: number;

  percentage: number;

  grade: string;

  status: ResultStatus;

  remarks: string | null;

  /**
   * Compatibility field for existing UI.
   * Not stored in current Result model.
   */
  examDate: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface ResultsStats {
  totalStudents: number;
  publishedResults: number;
  pendingResults: number;
  averagePerformance: number;
}

export interface ResultStudentOption {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
}

export interface ResultSubjectOption {
  id: string;
  name: string;
  code: string;
  className: string;
}

/* -------------------------------------------------------------------------- */
/* PRISMA TYPES                                                               */
/* -------------------------------------------------------------------------- */

type ResultWithStudent = Prisma.ResultGetPayload<{
  include: {
    student: {
      select: {
        name: true;
        rollNumber: true;
        className: true;
      };
    };
  };
}>;

type ResultStudentRow = {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
};

type ResultSubjectRow = {
  id: string;
  name: string;
  code: string;
  className: string;
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function calculatePercentage(
  obtainedMarks: number,
  totalMarks: number
): number {
  if (
    !Number.isFinite(totalMarks) ||
    totalMarks <= 0
  ) {
    return 0;
  }

  return Number(
    (
      (obtainedMarks / totalMarks) *
      100
    ).toFixed(2)
  );
}

/* -------------------------------------------------------------------------- */

function calculateGrade(
  percentage: number
): string {
  if (percentage >= 90) {
    return "A+";
  }

  if (percentage >= 80) {
    return "A";
  }

  if (percentage >= 70) {
    return "B";
  }

  if (percentage >= 60) {
    return "C";
  }

  if (percentage >= 50) {
    return "D";
  }

  return "F";
}

/* -------------------------------------------------------------------------- */

function normalizeStatus(
  status?: string | null
): ResultStatus {
  const normalized =
    status?.trim().toLowerCase();

  if (normalized === "draft") {
    return "Draft";
  }

  if (normalized === "pending") {
    return "Pending";
  }

  return "Published";
}

/* -------------------------------------------------------------------------- */
/* MAP RESULT                                                                 */
/* -------------------------------------------------------------------------- */

function mapResult(
  result: ResultWithStudent
): ResultRecord {
  const totalMarks =
    Number(result.totalMarks);

  const obtainedMarks =
    Number(result.obtainedMarks);

  const percentage =
    calculatePercentage(
      obtainedMarks,
      totalMarks
    );

  const grade =
    result.grade?.trim() ||
    calculateGrade(percentage);

  return {
    id: result.id,

    studentId:
      result.studentId,

    studentName:
      result.student.name,

    rollNumber:
      result.student.rollNumber,

    /*
     * Current Result model stores only
     * subject name as a String.
     */
    subjectId: null,

    subject:
      result.subject?.trim() ||
      "Unknown Subject",

    className:
      result.className?.trim() ||
      result.student.className ||
      "Unknown Class",

    session:
      result.session?.trim() ||
      "Academic Session",

    /*
     * Current Prisma Result model does not
     * contain examName.
     *
     * Kept for UI compatibility.
     */
    examName: "",

    totalMarks,

    obtainedMarks,

    percentage,

    grade,

    status:
      normalizeStatus(
        result.status
      ),

    remarks:
      result.remarks,

    /*
     * Current Prisma Result model does not
     * contain examDate.
     *
     * Kept for UI compatibility.
     */
    examDate: null,

    createdAt:
      result.createdAt.toISOString(),

    updatedAt:
      result.updatedAt.toISOString(),
  };
}

/* -------------------------------------------------------------------------- */
/* GET RESULTS                                                                */
/* -------------------------------------------------------------------------- */

export async function getResults(
  filters: ResultFilters = {}
): Promise<ResultRecord[]> {
  try {
    const {
      search = "",
      className = "all",
      subject = "all",
      session = "all",
    } = filters;

    const trimmedSearch =
      search.trim();

    const where: Prisma.ResultWhereInput =
      {};

    /* ---------------------------------------------------------------------- */
    /* SEARCH                                                                 */
    /* ---------------------------------------------------------------------- */

    if (trimmedSearch) {
      where.OR = [
        {
          student: {
            name: {
              contains:
                trimmedSearch,
              mode: "insensitive",
            },
          },
        },

        {
          student: {
            rollNumber: {
              contains:
                trimmedSearch,
              mode: "insensitive",
            },
          },
        },

        {
          subject: {
            contains:
              trimmedSearch,
            mode: "insensitive",
          },
        },

        {
          className: {
            contains:
              trimmedSearch,
            mode: "insensitive",
          },
        },

        {
          session: {
            contains:
              trimmedSearch,
            mode: "insensitive",
          },
        },
      ];
    }

    /* ---------------------------------------------------------------------- */
    /* CLASS FILTER                                                           */
    /* ---------------------------------------------------------------------- */

    if (
      className &&
      className !== "all"
    ) {
      where.className =
        className;
    }

    /* ---------------------------------------------------------------------- */
    /* SUBJECT FILTER                                                         */
    /* ---------------------------------------------------------------------- */

    if (
      subject &&
      subject !== "all"
    ) {
      where.subject =
        subject;
    }

    /* ---------------------------------------------------------------------- */
    /* SESSION FILTER                                                         */
    /* ---------------------------------------------------------------------- */

    if (
      session &&
      session !== "all"
    ) {
      where.session =
        session;
    }

    /* ---------------------------------------------------------------------- */
    /* QUERY                                                                  */
    /* ---------------------------------------------------------------------- */

    const results =
      await prisma.result.findMany({
        where,

        include: {
          student: {
            select: {
              name: true,
              rollNumber: true,
              className: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const mappedResults: ResultRecord[] =
      results.map(
        (
          result: ResultWithStudent
        ) => mapResult(result)
      );

    /* ---------------------------------------------------------------------- */
    /* STATUS FILTER                                                          */
    /* ---------------------------------------------------------------------- */

    if (
      filters.status &&
      filters.status !== "all"
    ) {
      const requestedStatus =
        filters.status
          .trim()
          .toLowerCase();

      return mappedResults.filter(
        (
          result: ResultRecord
        ) =>
          result.status
            .toLowerCase() ===
          requestedStatus
      );
    }

    return mappedResults;
  } catch (error) {
    console.error(
      "Failed to load results:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to load student results."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* GET SINGLE RESULT                                                          */
/* -------------------------------------------------------------------------- */

export async function getResultById(
  id: string
): Promise<ResultRecord | null> {
  try {
    if (!id) {
      return null;
    }

    const result =
      await prisma.result.findUnique({
        where: {
          id,
        },

        include: {
          student: {
            select: {
              name: true,
              rollNumber: true,
              className: true,
            },
          },
        },
      });

    if (!result) {
      return null;
    }

    return mapResult(result);
  } catch (error) {
    console.error(
      "Failed to load result:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to load result."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* GET STUDENTS                                                               */
/* -------------------------------------------------------------------------- */

export async function getResultStudents(): Promise<
  ResultStudentOption[]
> {
  try {
    const students =
      await prisma.student.findMany({
        where: {
          status: "Active",
        },

        select: {
          id: true,
          name: true,
          rollNumber: true,
          className: true,
        },

        orderBy: [
          {
            className: "asc",
          },

          {
            name: "asc",
          },
        ],
      });

    const rows: ResultStudentRow[] =
      students;

    return rows.map(
      (
        student: ResultStudentRow
      ): ResultStudentOption => ({
        id: student.id,

        name:
          student.name,

        rollNumber:
          student.rollNumber,

        className:
          student.className,
      })
    );
  } catch (error) {
    console.error(
      "Failed to load result students:",
      error
    );

    throw new Error(
      "Unable to load students."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* GET SUBJECTS                                                               */
/* -------------------------------------------------------------------------- */

export async function getResultSubjects(): Promise<
  ResultSubjectOption[]
> {
  try {
    const subjects =
      await prisma.subject.findMany({
        where: {
          status: "Active",
        },

        select: {
          id: true,
          name: true,
          code: true,
          className: true,
        },

        orderBy: [
          {
            className: "asc",
          },

          {
            name: "asc",
          },
        ],
      });

    const rows: ResultSubjectRow[] =
      subjects;

    return rows.map(
      (
        subject: ResultSubjectRow
      ): ResultSubjectOption => ({
        id:
          subject.id,

        name:
          subject.name,

        code:
          subject.code,

        className:
          subject.className,
      })
    );
  } catch (error) {
    console.error(
      "Failed to load result subjects:",
      error
    );

    throw new Error(
      "Unable to load subjects."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* RESOLVE SUBJECT NAME                                                       */
/* -------------------------------------------------------------------------- */

async function resolveSubjectName(
  subjectId?: string,
  subjectName?: string
): Promise<string> {
  const trimmedName =
    subjectName?.trim();

  /*
   * If subject name is already provided,
   * use it directly.
   */
  if (trimmedName) {
    return trimmedName;
  }

  /*
   * Otherwise resolve subject from
   * Subject table using subjectId.
   */
  if (subjectId) {
    const subject =
      await prisma.subject.findUnique({
        where: {
          id: subjectId,
        },

        select: {
          name: true,
          status: true,
        },
      });

    if (!subject) {
      throw new Error(
        "Selected subject was not found."
      );
    }

    if (
      subject.status !== "Active"
    ) {
      throw new Error(
        "Selected subject is not active."
      );
    }

    return subject.name.trim();
  }

  throw new Error(
    "Subject is required."
  );
}

/* -------------------------------------------------------------------------- */
/* CREATE RESULT                                                              */
/* -------------------------------------------------------------------------- */

export async function createResult(
  data: ResultFormData
): Promise<ResultRecord> {
  try {
    if (!data.studentId) {
      throw new Error(
        "Student is required."
      );
    }

    if (
      !data.subjectId &&
      !data.subject?.trim()
    ) {
      throw new Error(
        "Subject is required."
      );
    }

    if (
      !Number.isFinite(
        data.totalMarks
      ) ||
      data.totalMarks <= 0
    ) {
      throw new Error(
        "Total marks must be greater than zero."
      );
    }

    if (
      !Number.isFinite(
        data.obtainedMarks
      ) ||
      data.obtainedMarks < 0
    ) {
      throw new Error(
        "Obtained marks cannot be negative."
      );
    }

    if (
      data.obtainedMarks >
      data.totalMarks
    ) {
      throw new Error(
        "Obtained marks cannot be greater than total marks."
      );
    }

    /* ---------------------------------------------------------------------- */
    /* VERIFY STUDENT                                                         */
    /* ---------------------------------------------------------------------- */

    const student =
      await prisma.student.findUnique({
        where: {
          id: data.studentId,
        },

        select: {
          id: true,
          status: true,
          className: true,
        },
      });

    if (!student) {
      throw new Error(
        "Selected student was not found."
      );
    }

    if (
      student.status !== "Active"
    ) {
      throw new Error(
        "Selected student is not active."
      );
    }

    /* ---------------------------------------------------------------------- */
    /* RESOLVE SUBJECT                                                        */
    /* ---------------------------------------------------------------------- */

    const subject =
      await resolveSubjectName(
        data.subjectId,
        data.subject
      );

    /* ---------------------------------------------------------------------- */
    /* CLASS                                                                   */
    /* ---------------------------------------------------------------------- */

    const className =
      data.className?.trim() ||
      student.className;

    /* ---------------------------------------------------------------------- */
    /* SESSION                                                                 */
    /* ---------------------------------------------------------------------- */

    const session =
      data.session?.trim() ||
      "Academic Session";

    /* ---------------------------------------------------------------------- */
    /* CALCULATE                                                              */
    /* ---------------------------------------------------------------------- */

    const percentage =
      calculatePercentage(
        data.obtainedMarks,
        data.totalMarks
      );

    const grade =
      data.grade?.trim() ||
      calculateGrade(
        percentage
      );

    /* ---------------------------------------------------------------------- */
    /* CREATE                                                                 */
    /* ---------------------------------------------------------------------- */

    const result =
      await prisma.result.create({
        data: {
          studentId:
            data.studentId,

          subject,

          className,

          session,

          totalMarks:
            data.totalMarks,

          obtainedMarks:
            data.obtainedMarks,

          percentage,

          grade,

          status:
            normalizeStatus(
              data.status
            ),

          remarks:
            data.remarks?.trim() ||
            null,
        },

        include: {
          student: {
            select: {
              name: true,
              rollNumber: true,
              className: true,
            },
          },
        },
      });

    return mapResult(result);
  } catch (error) {
    console.error(
      "Failed to create result:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to create result."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* UPDATE RESULT                                                              */
/* -------------------------------------------------------------------------- */

export async function updateResult(
  id: string,
  data: ResultFormData
): Promise<ResultRecord> {
  try {
    if (!id) {
      throw new Error(
        "Result ID is required."
      );
    }

    if (!data.studentId) {
      throw new Error(
        "Student is required."
      );
    }

    if (
      !data.subjectId &&
      !data.subject?.trim()
    ) {
      throw new Error(
        "Subject is required."
      );
    }

    if (
      !Number.isFinite(
        data.totalMarks
      ) ||
      data.totalMarks <= 0
    ) {
      throw new Error(
        "Total marks must be greater than zero."
      );
    }

    if (
      !Number.isFinite(
        data.obtainedMarks
      ) ||
      data.obtainedMarks < 0
    ) {
      throw new Error(
        "Obtained marks cannot be negative."
      );
    }

    if (
      data.obtainedMarks >
      data.totalMarks
    ) {
      throw new Error(
        "Obtained marks cannot be greater than total marks."
      );
    }

    /* ---------------------------------------------------------------------- */
    /* VERIFY STUDENT                                                         */
    /* ---------------------------------------------------------------------- */

    const student =
      await prisma.student.findUnique({
        where: {
          id: data.studentId,
        },

        select: {
          id: true,
          status: true,
          className: true,
        },
      });

    if (!student) {
      throw new Error(
        "Selected student was not found."
      );
    }

    if (
      student.status !== "Active"
    ) {
      throw new Error(
        "Selected student is not active."
      );
    }

    /* ---------------------------------------------------------------------- */
    /* RESOLVE SUBJECT                                                        */
    /* ---------------------------------------------------------------------- */

    const subject =
      await resolveSubjectName(
        data.subjectId,
        data.subject
      );

    /* ---------------------------------------------------------------------- */
    /* CLASS                                                                   */
    /* ---------------------------------------------------------------------- */

    const className =
      data.className?.trim() ||
      student.className;

    /* ---------------------------------------------------------------------- */
    /* SESSION                                                                 */
    /* ---------------------------------------------------------------------- */

    const session =
      data.session?.trim() ||
      "Academic Session";

    /* ---------------------------------------------------------------------- */
    /* CALCULATE                                                              */
    /* ---------------------------------------------------------------------- */

    const percentage =
      calculatePercentage(
        data.obtainedMarks,
        data.totalMarks
      );

    const grade =
      data.grade?.trim() ||
      calculateGrade(
        percentage
      );

    /* ---------------------------------------------------------------------- */
    /* UPDATE                                                                 */
    /* ---------------------------------------------------------------------- */

    const result =
      await prisma.result.update({
        where: {
          id,
        },

        data: {
          studentId:
            data.studentId,

          subject,

          className,

          session,

          totalMarks:
            data.totalMarks,

          obtainedMarks:
            data.obtainedMarks,

          percentage,

          grade,

          status:
            normalizeStatus(
              data.status
            ),

          remarks:
            data.remarks?.trim() ||
            null,
        },

        include: {
          student: {
            select: {
              name: true,
              rollNumber: true,
              className: true,
            },
          },
        },
      });

    return mapResult(result);
  } catch (error) {
    console.error(
      "Failed to update result:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to update result."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* DELETE RESULT                                                              */
/* -------------------------------------------------------------------------- */

export async function deleteResult(
  id: string
): Promise<{
  success: boolean;
}> {
  try {
    if (!id) {
      throw new Error(
        "Result ID is required."
      );
    }

    await prisma.result.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Failed to delete result:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to delete result."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* PUBLISH RESULT                                                             */
/* -------------------------------------------------------------------------- */

export async function publishResult(
  id: string
): Promise<ResultRecord> {
  try {
    if (!id) {
      throw new Error(
        "Result ID is required."
      );
    }

    await prisma.result.update({
      where: {
        id,
      },

      data: {
        status: "Published",
      },
    });

    const result =
      await getResultById(id);

    if (!result) {
      throw new Error(
        "Result not found."
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Failed to publish result:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to publish result."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* RESULTS STATS                                                              */
/* -------------------------------------------------------------------------- */

export async function getResultsStats(): Promise<ResultsStats> {
  try {
    const results =
      await prisma.result.findMany({
        select: {
          studentId: true,
          totalMarks: true,
          obtainedMarks: true,
          status: true,
        },
      });

    const studentIds =
      new Set<string>();

    let totalPercentage = 0;

    let publishedResults = 0;
    let pendingResults = 0;

    results.forEach(
      (
        result: {
          studentId: string;
          totalMarks: number;
          obtainedMarks: number;
          status: string;
        }
      ) => {
        studentIds.add(
          result.studentId
        );

        totalPercentage +=
          calculatePercentage(
            Number(
              result.obtainedMarks
            ),
            Number(
              result.totalMarks
            )
          );

        const status =
          result.status
            .trim()
            .toLowerCase();

        if (
          status === "published"
        ) {
          publishedResults++;
        }

        if (
          status === "pending"
        ) {
          pendingResults++;
        }
      }
    );

    const averagePerformance =
      results.length > 0
        ? Number(
            (
              totalPercentage /
              results.length
            ).toFixed(1)
          )
        : 0;

    return {
      totalStudents:
        studentIds.size,

      publishedResults,

      pendingResults,

      averagePerformance,
    };
  } catch (error) {
    console.error(
      "Failed to load result stats:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to load result statistics."
    );
  }
}

/* -------------------------------------------------------------------------- */
/* FILTER OPTIONS                                                             */
/* -------------------------------------------------------------------------- */

export async function getResultFilterOptions(): Promise<{
  classes: string[];
  subjects: string[];
  sessions: string[];
}> {
  try {
    const results =
      await prisma.result.findMany({
        select: {
          className: true,
          subject: true,
          session: true,
        },
      });

    const classes =
      new Set<string>();

    const subjects =
      new Set<string>();

    const sessions =
      new Set<string>();

    results.forEach(
      (
        result: {
          className: string;
          subject: string;
          session: string;
        }
      ) => {
        const className =
          result.className?.trim();

        const subject =
          result.subject?.trim();

        const session =
          result.session?.trim();

        if (className) {
          classes.add(
            className
          );
        }

        if (subject) {
          subjects.add(
            subject
          );
        }

        if (session) {
          sessions.add(
            session
          );
        }
      }
    );

    return {
      classes:
        Array.from(
          classes
        ).sort(
          (
            a: string,
            b: string
          ) =>
            a.localeCompare(b)
        ),

      subjects:
        Array.from(
          subjects
        ).sort(
          (
            a: string,
            b: string
          ) =>
            a.localeCompare(b)
        ),

      sessions:
        Array.from(
          sessions
        ).sort(
          (
            a: string,
            b: string
          ) =>
            b.localeCompare(a)
        ),
    };
  } catch (error) {
    console.error(
      "Failed to load result filters:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to load result filter options."
    );
  }
}