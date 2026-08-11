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
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/80
        p-6
        shadow-lg
        shadow-black/20
        backdrop-blur-xl
      "
    >
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-blue-500/70" />

      {/* Header */}
      <div className="relative mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-400
                ring-1
                ring-blue-500/20
              "
            >
              <User size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Personal Information
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Student profile details
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            hidden
            rounded-full
            border
            border-slate-800
            bg-slate-950/60
            px-3
            py-1
            text-[10px]
            font-medium
            uppercase
            tracking-wider
            text-slate-500
            sm:block
          "
        >
          Database
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow
          icon={<User size={18} />}
          label="Student Name"
          value={student.name}
        />

        <InfoRow
          icon={<School size={18} />}
          label="Father Name"
          value={student.fatherName}
        />

        <InfoRow
          icon={<Hash size={18} />}
          label="Admission Number"
          value={student.admissionNo}
        />

        <InfoRow
          icon={<Hash size={18} />}
          label="Roll Number"
          value={student.rollNumber}
        />

        <InfoRow
          icon={<School size={18} />}
          label="Class"
          value={student.className}
        />

        <InfoRow
          icon={<Phone size={18} />}
          label="Phone Number"
          value={student.phone}
        />

        <InfoRow
          icon={<Calendar size={18} />}
          label="Admission Date"
          value={formatDate(student.admissionDate)}
        />

        <InfoRow
          icon={<BadgeCheck size={18} />}
          label="Status"
          value={student.status ?? "Active"}
          status
        />
      </div>
    </section>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
  status?: boolean;
}

function InfoRow({
  icon,
  label,
  value,
  status,
}: RowProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-slate-800
        bg-slate-950/40
        p-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-blue-500/30
        hover:bg-slate-900
        hover:shadow-lg
        hover:shadow-blue-500/5
      "
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-500/10
            text-blue-400
            ring-1
            ring-blue-500/10
            transition-all
            duration-300
            group-hover:bg-blue-500/15
            group-hover:ring-blue-500/20
          "
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>

          {status ? (
            <div className="mt-1">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-emerald-400
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {value || "Active"}
              </span>
            </div>
          ) : (
            <p className="mt-1 truncate text-sm font-semibold text-white">
              {value || "N/A"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}