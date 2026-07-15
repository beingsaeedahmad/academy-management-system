"use client";

import { useAcademyStore } from "@/store/academyStore";
import Card from "../UI/Card";

export default function AdmissionTable() {
  const students = useAcademyStore((state) => state.students);

  return (
    <Card
      title="Recent Admissions"
      subtitle={`Total Students: ${students.length}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-700 bg-slate-900">
            <tr className="text-slate-300">
              <th className="p-4">Admission No</th>
              <th className="p-4">Roll No</th>
              <th className="p-4">Student</th>
              <th className="p-4">Father</th>
              <th className="p-4">Class</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Fee</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-slate-500"
                >
                  No admissions yet.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/60"
                >
                  <td className="p-4 font-medium text-slate-200">
                    {student.admissionNo}
                  </td>

                  <td className="p-4 text-slate-200">
                    {student.rollNumber}
                  </td>

                  <td className="p-4 font-semibold text-white">
                    {student.name}
                  </td>

                  <td className="p-4 text-slate-200">
                    {student.fatherName}
                  </td>

                  <td className="p-4 text-slate-200">
                    {student.className}
                  </td>

                  <td className="p-4 text-slate-200">
                    {student.phone}
                  </td>

                  <td className="p-4 font-medium text-green-400">
                    Rs. {student.monthlyFees}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}