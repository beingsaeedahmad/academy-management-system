"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Pencil,
  Printer,
} from "lucide-react";

import { Student } from "@/types";

import ProfileStats from "./ProfileStats";
import PersonalInformation from "./PersonalInformation";
import AttendanceHistory from "./AttendanceHistory";
import FeeOverview from "./FeeOverview";

interface Props {
  student: Student;
  onClose?: () => void;
}

export default function StudentProfile({
  student,
  onClose,
}: Props) {
  const totalFee = (student.fees ?? []).reduce(
    (sum, fee) => sum + Number(fee.totalFee ?? 0),
    0
  );

  const paidAmount = (student.fees ?? []).reduce(
    (sum, fee) => sum + Number(fee.paidAmount ?? 0),
    0
  );

  const balance = Math.max(totalFee - paidAmount, 0);

  const attendance = student.attendance ?? [];

  const present = attendance.filter((item) =>
    ["P", "PRESENT", "Present"].includes(
      (item.status ?? "").toUpperCase()
    )
  ).length;

  const absent = attendance.filter((item) =>
    ["A", "ABSENT", "Absent"].includes(
      (item.status ?? "").toUpperCase()
    )
  ).length;

  const late = attendance.filter((item) =>
    ["L", "LATE", "Late"].includes(
      (item.status ?? "").toUpperCase()
    )
  ).length;

  const attendancePercentage =
    attendance.length === 0
      ? 0
      : Math.round((present / attendance.length) * 100);

  return (
    <main className="min-h-screen bg-[#020817]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Student Profile
            </h1>

            <p className="mt-2 text-slate-400">
              Complete student information
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {onClose ? (
              <button
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:bg-slate-900"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            ) : (
              <Link
                href="/students"
                className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:bg-slate-900"
              >
                <ArrowLeft size={18} />
                Back
              </Link>
            )}

            <button
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              <Pencil size={18} />
              Edit
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:bg-slate-900"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-emerald-400 transition hover:bg-emerald-500/20"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div>
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-36 w-36 rounded-full border-4 border-blue-500 object-cover"
                />
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
                  {student.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-5xl font-bold text-white">
                {student.name}
              </h2>

              <p className="mt-3 text-xl text-slate-300">
                {student.className}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-300">
                  Admission #{student.admissionNo}
                </span>

                <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
                  {student.status ?? "Active"}
                </span>

                <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300">
                  Roll No {student.rollNumber}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="mt-8">
          <ProfileStats
            totalFee={totalFee}
            paidAmount={paidAmount}
            balance={balance}
            attendancePercentage={attendancePercentage}
          />
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <PersonalInformation student={student} />

          <FeeOverview
            student={student}
            totalFee={totalFee}
            paidAmount={paidAmount}
            balance={balance}
          />
        </div>

        <div className="mt-8">
          <AttendanceHistory
            student={student}
            present={present}
            absent={absent}
            late={late}
          />
        </div>
      </div>
    </main>
  );
}