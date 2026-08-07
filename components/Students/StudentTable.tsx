"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
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

  const [students, setStudents] =
    useState<Student[]>([]);

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

        const data =
          await getStudents();

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
          .includes(value)

        ||

        student.fatherName
          .toLowerCase()
          .includes(value)

        ||

        student.className
          .toLowerCase()
          .includes(value)

        ||

        student.admissionNo
          .toLowerCase()
          .includes(value)

        ||

        student.rollNumber
          .toLowerCase()
          .includes(value)

        ||

        student.phone
          .toLowerCase()
          .includes(value);

      if (!matchesSearch)
        return false;

      switch (filter) {

        case "active":

          return (
            student.status ===
            "Active"
          );

        case "new": {

          const created =
            new Date(
              student.createdAt
            );

          const today =
            new Date();

          return (

            created.getMonth() ===
              today.getMonth()

            &&

            created.getFullYear() ===
              today.getFullYear()

          );

        }

        case "defaulters":

          return (

            student.fees?.some(
              (fee) =>

                fee.status ===
                  "Pending"

                ||

                fee.status ===
                  "Overdue"

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
            student.id !==
            selectedStudent.id
        )
      );

      setDeleteModal(false);

      setSelectedStudent(null);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete student."
      );

    } finally {

      setDeleting(false);

    }

  };

  return (

    <>
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead
            className="
              border-b
              border-slate-800
              bg-slate-950
            "
          >

            <tr
              className="
                text-left
                text-sm
                font-semibold
                text-slate-300
              "
            >

              <th className="px-6 py-4">
                Photo
              </th>

              <th className="px-6 py-4">
                Admission No
              </th>

              <th className="px-6 py-4">
                Roll No
              </th>

              <th className="px-6 py-4">
                Student Name
              </th>

              <th className="px-6 py-4">
                Father Name
              </th>

              <th className="px-6 py-4">
                Class
              </th>

              <th className="px-6 py-4">
                Phone
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="
                    py-16
                    text-center
                    text-slate-500
                  "
                >
                  No students found.
                </td>

              </tr>

            ) : (

              filteredStudents.map((student) => (
                <tr
                key={student.id}
                className="
                  border-b
                  border-slate-800
                  transition
                  hover:bg-slate-800/60
                "
              >

                <td className="px-6 py-4">

                  {student.photo ? (

                    <img
                      src={student.photo}
                      alt={student.name}
                      className="
                        h-12
                        w-12
                        rounded-full
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-600
                        font-semibold
                        text-white
                      "
                    >
                      {student.name.charAt(0)}
                    </div>

                  )}

                </td>

                <td className="px-6 py-4 text-slate-200">
                  {student.admissionNo}
                </td>

                <td className="px-6 py-4 text-slate-200">
                  {student.rollNumber}
                </td>

                <td className="px-6 py-4 font-semibold text-white">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-slate-200">
                  {student.fatherName}
                </td>

                <td className="px-6 py-4 text-slate-200">
                  {student.className}
                </td>

                <td className="px-6 py-4 text-slate-200">
                  {student.phone}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        student.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {student.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <button
                      onClick={() => onView(student)}
                      className="
                        rounded-lg
                        bg-blue-500/10
                        p-2
                        text-blue-400
                        transition
                        hover:bg-blue-500/20
                      "
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        setEditStudent(student)
                      }
                      className="
                        rounded-lg
                        bg-yellow-500/10
                        p-2
                        text-yellow-400
                        transition
                        hover:bg-yellow-500/20
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {

                        setSelectedStudent(
                          student
                        );

                        setDeleteModal(true);

                      }}
                      className="
                        rounded-lg
                        bg-red-500/10
                        p-2
                        text-red-400
                        transition
                        hover:bg-red-500/20
                      "
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
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

<DeleteStudentModal
  open={deleteModal}
  loading={deleting}
  studentName={selectedStudent?.name ?? ""}
  admissionNo={selectedStudent?.admissionNo ?? ""}
  rollNumber={selectedStudent?.rollNumber ?? ""}
  className={selectedStudent?.className ?? ""}
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