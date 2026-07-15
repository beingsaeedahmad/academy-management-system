"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useAcademyStore } from "@/store/academyStore";
import { Student } from "@/types";

interface Props {
  onView: (student: Student) => void;
}

export default function StudentTable({
  onView,
}: Props) {
  const students = useAcademyStore((state) => state.students);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-950 border-b border-slate-800">
            <tr className="text-left text-sm font-semibold text-slate-300">
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Admission No</th>
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Father Name</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-16 text-center text-slate-500"
                >
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/60"
                >
                  {/* Photo */}
                  <td className="px-6 py-4">
                    {student.photo ? (
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="h-12 w-12 rounded-full object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>

                  {/* Admission No */}
                  <td className="px-6 py-4 text-slate-200">
                    {student.admissionNo}
                  </td>

                  {/* Roll No */}
                  <td className="px-6 py-4 text-slate-200">
                    {student.rollNumber}
                  </td>

                  {/* Student Name */}
                  <td className="px-6 py-4 font-semibold text-white">
                    {student.name}
                  </td>

                  {/* Father Name */}
                  <td className="px-6 py-4 text-slate-200">
                    {student.fatherName}
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4 text-slate-200">
                    {student.className}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-slate-200">
                    {student.phone}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">

                     <button
  title="View"
  onClick={() => onView(student)}
  className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
>
  <Eye size={18} />
</button> 
                      <button
                        title="Edit"
                        className="rounded-lg bg-yellow-500/10 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        title="Delete"
                        className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
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
    </div>
  );
}