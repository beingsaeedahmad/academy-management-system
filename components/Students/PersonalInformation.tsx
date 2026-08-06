"use client";

import {
  Calendar,
  Phone,
  School,
  User,
  Hash,
  BadgeCheck,
} from "lucide-react";

import { Student } from "@/types";

interface Props {
  student: Student;
}

export default function PersonalInformation({
  student,
}: Props) {
  const formatDate = (
    value: Date | string | null | undefined
  ) => {
    if (!value) return "N/A";

    const date =
      typeof value === "string"
        ? new Date(value)
        : value;

    return date.toLocaleDateString();
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur-xl">

      {/* Heading */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-white">
          Personal Information
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Student details stored in the academy database.
        </p>

      </div>

      <div className="space-y-6">

        <InfoRow
          icon={<User size={20} />}
          label="Student Name"
          value={student.name}
        />

        <InfoRow
          icon={<School size={20} />}
          label="Father Name"
          value={student.fatherName}
        />

        <InfoRow
          icon={<Hash size={20} />}
          label="Admission Number"
          value={student.admissionNo}
        />

        <InfoRow
          icon={<Hash size={20} />}
          label="Roll Number"
          value={student.rollNumber}
        />

        <InfoRow
          icon={<School size={20} />}
          label="Class"
          value={student.className}
        />

        <InfoRow
          icon={<Phone size={20} />}
          label="Phone Number"
          value={student.phone}
        />

        <InfoRow
          icon={<Calendar size={20} />}
          label="Admission Date"
          value={formatDate(student.admissionDate)}
        />

        <InfoRow
          icon={<BadgeCheck size={20} />}
          label="Status"
          value={student.status ?? "Active"}
        />

      </div>

    </section>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
}

function InfoRow({
  icon,
  label,
  value,
}: RowProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-[#0F172A]/70 p-4 transition hover:border-blue-500/30 hover:bg-slate-900">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <h3 className="mt-1 text-lg font-semibold text-white">
          {value || "N/A"}
        </h3>

      </div>

    </div>
  );
}