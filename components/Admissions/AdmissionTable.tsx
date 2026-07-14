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
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-700 text-slate-400">
            <tr>
              <th className="p-3">Admission No</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Student</th>
              <th className="p-3">Father</th>
              <th className="p-3">Class</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Fee</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-center text-slate-500"
                >
                  No admissions yet.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-800 hover:bg-slate-900"
                >
                  <td className="p-3">{student.admissionNo}</td>
                  <td className="p-3">{student.rollNumber}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.fatherName}</td>
                  <td className="p-3">{student.className}</td>
                  <td className="p-3">{student.phone}</td>
                  <td className="p-3">Rs. {student.monthlyFees}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}