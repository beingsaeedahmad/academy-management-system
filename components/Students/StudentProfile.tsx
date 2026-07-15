"use client";

import { X, Phone, User, School, Calendar } from "lucide-react";
import { Student } from "@/types";

interface Props {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

export default function StudentProfile({
  student,
  open,
  onClose,
}: Props) {
  if (!open || !student) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-[420px] overflow-y-auto border-l border-slate-800 bg-[#020817] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-white">
            Student Profile
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          <div className="flex flex-col items-center">

            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
                {student.name.charAt(0)}
              </div>
            )}

            <h3 className="mt-4 text-2xl font-bold text-white">
              {student.name}
            </h3>

            <p className="text-slate-400">
              {student.className}
            </p>

          </div>

          <div className="space-y-4">

            <Info
              icon={<User size={18} />}
              title="Admission No"
              value={student.admissionNo}
            />

            <Info
              icon={<User size={18} />}
              title="Roll No"
              value={student.rollNumber}
            />

            <Info
              icon={<School size={18} />}
              title="Father Name"
              value={student.fatherName}
            />

            <Info
              icon={<Phone size={18} />}
              title="Phone"
              value={student.phone}
            />

            <Info
              icon={<Calendar size={18} />}
              title="Admission Date"
              value={student.admissionDate.toLocaleDateString()}
            />

          </div>

        </div>
      </div>
    </>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-2 flex items-center gap-2 text-blue-400">
        {icon}
        <span>{title}</span>
      </div>

      <p className="text-lg text-white">
        {value}
      </p>
    </div>
  );
}