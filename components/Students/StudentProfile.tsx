"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Printer,
  User,
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
  const fees = student.fees ?? [];
  const attendance = student.attendance ?? [];

  const totalFee = fees.reduce(
    (sum, fee) => sum + Number(fee.totalFee ?? 0),
    0
  );

  const paidAmount = fees.reduce(
    (sum, fee) => sum + Number(fee.paidAmount ?? 0),
    0
  );

  const balance = Math.max(totalFee - paidAmount, 0);

  const present = attendance.filter(
    (item) => item.status?.toUpperCase() === "P"
  ).length;

  const absent = attendance.filter(
    (item) => item.status?.toUpperCase() === "A"
  ).length;

  const late = attendance.filter(
    (item) => item.status?.toUpperCase() === "L"
  ).length;

  const attendancePercentage =
    attendance.length > 0
      ? Math.round((present / attendance.length) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Student Profile
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              {student.name}
            </p>
          </div>

          <div className="flex gap-2">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-700
                  px-4
                  py-2
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-slate-900
                "
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : (
              <Link
                href="/students"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-700
                  px-4
                  py-2
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-slate-900
                "
              >
                <ArrowLeft size={16} />
                Back
              </Link>
            )}

            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700
              "
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="
                hidden
                items-center
                gap-2
                rounded-lg
                border
                border-slate-700
                px-4
                py-2
                text-sm
                text-slate-300
                transition
                hover:bg-slate-900
                sm:flex
              "
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>

        {/* Student */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-5">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="
                  h-24
                  w-24
                  rounded-xl
                  border
                  border-slate-700
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-24
                  w-24
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600/10
                  text-blue-400
                "
              >
                <User size={36} />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-white">
                {student.name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {student.className}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  Admission: {student.admissionNo}
                </span>

                <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  Roll: {student.rollNumber}
                </span>

                <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  {student.status ?? "Active"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats */}
        <div className="mt-6">
          <ProfileStats
            totalFee={totalFee}
            paidAmount={paidAmount}
            balance={balance}
            attendancePercentage={attendancePercentage}
          />
        </div>

        {/* Student Information + Fees */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <PersonalInformation student={student} />

          <FeeOverview
            student={student}
            totalFee={totalFee}
            paidAmount={paidAmount}
            balance={balance}
          />
        </div>

        {/* Attendance */}
        <div className="mt-6">
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