"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  GraduationCap,
  SearchX,
} from "lucide-react";
import { useRouter } from "next/navigation";

import EditStudentModal from "./EditStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

import {
  getStudents,
  deleteStudent,
} from "@/actions/studentActions";

import { Student } from "@/types";

interface Props {
  onView: (student: Student) => void;

  search: string;

  filter:
    | "all"
    | "active"
    | "new"
    | "defaulters";
}

export default function StudentTable({
  onView,
  search,
  filter,
}: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [editStudent, setEditStudent] =
    useState<Student | null>(null);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();

        setStudents(
          data.sort(
            (a: Student, b: Student) =>
              a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error(
          "STUDENTS LOAD ERROR:",
          error
        );
      }
    }

    loadStudents();
  }, []);

  const filteredStudents = students
    .filter((student) => {
      const value =
        search.trim().toLowerCase();

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(value) ||
        student.fatherName
          .toLowerCase()
          .includes(value) ||
        student.className
          .toLowerCase()
          .includes(value) ||
        student.admissionNo
          .toLowerCase()
          .includes(value) ||
        student.rollNumber
          .toLowerCase()
          .includes(value) ||
        student.phone
          .toLowerCase()
          .includes(value);

      if (!matchesSearch) return false;

      switch (filter) {
        case "active":
          return student.status === "Active";

        case "new": {
          const created =
            new Date(student.createdAt);

          const today = new Date();

          return (
            created.getMonth() ===
              today.getMonth() &&
            created.getFullYear() ===
              today.getFullYear()
          );
        }

        case "defaulters":
          return (
            student.fees?.some(
              (fee) =>
                fee.status === "Pending" ||
                fee.status === "Overdue"
            ) ?? false
          );

        default:
          return true;
      }
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      setDeleting(true);

      await deleteStudent(
        selectedStudent.id
      );

      setStudents((prev) =>
        prev.filter(
          (student) =>
            student.id !== selectedStudent.id
        )
      );

      setDeleteModal(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-slate-800/80
          bg-[#071121]
          shadow-[0_20px_70px_rgba(0,0,0,0.25)]
        "
      >
        {/* Top glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-2/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-blue-400/70
            to-transparent
          "
        />

        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800/70
            bg-slate-950/30
            px-6
            py-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-blue-500/15
                bg-blue-500/10
              "
            >
              <GraduationCap
                size={19}
                className="text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Student Directory
              </h3>

              <p className="mt-0.5 text-[10px] text-slate-500">
                {filteredStudents.length}{" "}
                student
                {filteredStudents.length !== 1
                  ? "s"
                  : ""}{" "}
                displayed
              </p>
            </div>
          </div>

          <div
            className="
              hidden
              rounded-full
              border
              border-slate-800
              bg-slate-900/70
              px-3
              py-1.5
              text-[9px]
              font-medium
              uppercase
              tracking-wider
              text-slate-500
              sm:block
            "
          >
            A — Z
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-800/70
                  bg-slate-950/50
                  text-left
                "
              >
                <th
                  className="
                    px-6
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Student
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Admission No
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Roll No
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Father Name
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Class
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Phone
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-center
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-20"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-slate-800
                          bg-slate-900
                        "
                      >
                        <SearchX
                          size={22}
                          className="text-slate-600"
                        />
                      </div>

                      <p className="mt-4 text-sm font-medium text-slate-400">
                        No students found
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Try adjusting your search
                        or filter
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(
                  (student) => (
                    <tr
                      key={student.id}
                      className="
                        group
                        border-b
                        border-slate-800/50
                        transition-all
                        duration-300
                        hover:bg-blue-500/[0.025]
                      "
                    >
                      {/* Student */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {student.photo ? (
                            <div
                              className="
                                rounded-full
                                border
                                border-slate-700
                                p-0.5
                                transition-all
                                duration-300
                                group-hover:border-blue-500/40
                              "
                            >
                              <img
                                src={student.photo}
                                alt={student.name}
                                className="
                                  h-10
                                  w-10
                                  rounded-full
                                  object-cover
                                "
                              />
                            </div>
                          ) : (
                            <div
                              className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-blue-500/20
                                bg-gradient-to-br
                                from-blue-500/20
                                to-indigo-500/10
                                text-sm
                                font-bold
                                text-blue-400
                              "
                            >
                              {student.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p
                              className="
                                truncate
                                text-sm
                                font-semibold
                                text-slate-200
                                transition-colors
                                group-hover:text-white
                              "
                            >
                              {student.name}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-600">
                              Student
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Admission */}
                      <td className="px-5 py-4">
                        <span
                          className="
                            inline-flex
                            rounded-lg
                            border
                            border-slate-800
                            bg-slate-950/60
                            px-2.5
                            py-1.5
                            font-mono
                            text-[10px]
                            text-slate-400
                          "
                        >
                          {student.admissionNo}
                        </span>
                      </td>

                      {/* Roll */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-slate-400">
                          #{student.rollNumber}
                        </span>
                      </td>

                      {/* Father */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400">
                          {student.fatherName}
                        </span>
                      </td>

                      {/* Class */}
                      <td className="px-5 py-4">
                        <span
                          className="
                            inline-flex
                            rounded-lg
                            border
                            border-violet-500/15
                            bg-violet-500/[0.06]
                            px-2.5
                            py-1.5
                            text-[10px]
                            font-medium
                            text-violet-300
                          "
                        >
                          {student.className}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400">
                          {student.phone}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-[9px]
                            font-semibold
                            ${
                              student.status ===
                              "Active"
                                ? `
                                  border-emerald-500/15
                                  bg-emerald-500/10
                                  text-emerald-400
                                `
                                : `
                                  border-rose-500/15
                                  bg-rose-500/10
                                  text-rose-400
                                `
                            }
                          `}
                        >
                          <span
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              ${
                                student.status ===
                                "Active"
                                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                                  : "bg-rose-400"
                              }
                            `}
                          />

                          {student.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              onView(student)
                            }
                            title="View student"
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-transparent
                              bg-blue-500/5
                              text-blue-400
                              transition-all
                              duration-200
                              hover:border-blue-500/20
                              hover:bg-blue-500/15
                              hover:shadow-[0_0_18px_rgba(59,130,246,0.12)]
                            "
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setEditStudent(
                                student
                              )
                            }
                            title="Edit student"
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-transparent
                              bg-amber-500/5
                              text-amber-400
                              transition-all
                              duration-200
                              hover:border-amber-500/20
                              hover:bg-amber-500/15
                              hover:shadow-[0_0_18px_rgba(245,158,11,0.10)]
                            "
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStudent(
                                student
                              );
                              setDeleteModal(
                                true
                              );
                            }}
                            title="Delete student"
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-transparent
                              bg-rose-500/5
                              text-rose-400
                              transition-all
                              duration-200
                              hover:border-rose-500/20
                              hover:bg-rose-500/15
                              hover:shadow-[0_0_18px_rgba(244,63,94,0.10)]
                            "
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filteredStudents.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-800/60
              bg-slate-950/20
              px-6
              py-3.5
            "
          >
            <span className="text-[10px] text-slate-600">
              Showing{" "}
              <span className="font-medium text-slate-400">
                {filteredStudents.length}
              </span>{" "}
              students
            </span>

            <span className="text-[9px] uppercase tracking-wider text-slate-700">
              Academy Management
            </span>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editStudent && (
        <EditStudentModal
          student={editStudent}
          open={true}
          onClose={() =>
            setEditStudent(null)
          }
          onUpdated={async () => {
            const data =
              await getStudents();

            setStudents(
              (data as Student[]).sort(
                (
                  a: Student,
                  b: Student
                ) =>
                  a.name.localeCompare(
                    b.name
                  )
              )
            );

            setEditStudent(null);

            router.refresh();
          }}
        />
      )}

      {/* Delete Modal */}
      <DeleteStudentModal
        open={deleteModal}
        loading={deleting}
        studentName={
          selectedStudent?.name ?? ""
        }
        admissionNo={
          selectedStudent?.admissionNo ?? ""
        }
        rollNumber={
          selectedStudent?.rollNumber ?? ""
        }
        className={
          selectedStudent?.className ?? ""
        }
        onClose={() => {
          if (deleting) return;

          setDeleteModal(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}