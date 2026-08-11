"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Printer,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Hash,
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
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.08)]">
              <GraduationCap
                size={22}
                className="text-blue-400"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Student Profile
              </h1>

              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Student overview & academic information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">

            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/70
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-300
                  shadow-lg
                  shadow-black/10
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-slate-700
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back
              </button>
            ) : (
              <Link
                href="/students"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/70
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-300
                  shadow-lg
                  shadow-black/10
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-slate-700
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Back
              </Link>
            )}

            <button
              type="button"
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-500/30
                bg-blue-500/10
                px-4
                py-2.5
                text-sm
                font-medium
                text-blue-400
                shadow-lg
                shadow-blue-500/5
                transition-all
                duration-300
                hover:border-blue-400/50
                hover:bg-blue-500/15
                hover:text-blue-300
              "
            >
              <Pencil
                size={16}
                className="transition-transform duration-300 group-hover:rotate-[-8deg]"
              />
              Edit
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-slate-800
                bg-slate-900/70
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-300
                shadow-lg
                shadow-black/10
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-slate-700
                hover:bg-slate-800
                hover:text-white
                sm:flex
              "
            >
              <Printer size={16} />
              Print
            </button>

          </div>
        </div>

        {/* =========================================================
            PREMIUM STUDENT HERO
        ========================================================= */}
        <section
          className="
            relative
            mb-6
            overflow-hidden
            rounded-[28px]
            border
            border-slate-800/80
            bg-gradient-to-br
            from-slate-900
            via-slate-900/95
            to-[#07152d]
            p-6
            shadow-[0_20px_70px_rgba(0,0,0,0.25)]
            sm:p-8
          "
        >

          {/* Glow */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

          {/* Subtle grid */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.025]
              [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              [background-size:40px_40px]
            "
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            {/* Student identity */}
            <div className="flex min-w-0 items-center gap-5 sm:gap-6">

              {/* Avatar */}
              <div className="relative shrink-0">

                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="
                      h-24
                      w-24
                      rounded-2xl
                      border
                      border-blue-400/30
                      object-cover
                      shadow-[0_0_35px_rgba(59,130,246,0.12)]
                      sm:h-28
                      sm:w-28
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-blue-500/20
                      bg-gradient-to-br
                      from-blue-500/20
                      to-indigo-500/5
                      shadow-[0_0_35px_rgba(59,130,246,0.12)]
                      sm:h-28
                      sm:w-28
                    "
                  >
                    <User
                      size={42}
                      strokeWidth={1.5}
                      className="text-blue-400"
                    />
                  </div>
                )}

                {/* Active indicator */}
                <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#081225] bg-emerald-500">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

              </div>

              {/* Details */}
              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {student.name}
                  </h2>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    {student.status ?? "Active"}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <GraduationCap size={15} className="text-blue-400" />
                  {student.className}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-300">
                    <Hash size={13} />
                    Admission {student.admissionNo}
                  </span>

                  <span className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-300">
                    <Hash size={13} />
                    Roll {student.rollNumber}
                  </span>

                </div>

              </div>
            </div>

            {/* Contact card */}
            <div
              className="
                min-w-[230px]
                rounded-2xl
                border
                border-slate-800
                bg-slate-950/40
                p-4
                backdrop-blur-xl
              "
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Student Contact
              </p>

              <div className="space-y-3">

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                    <Phone size={14} className="text-blue-400" />
                  </div>

                  <span className="text-xs text-slate-400">
                    {student.phone || "No phone"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                    <MapPin size={14} className="text-violet-400" />
                  </div>

                  <span className="truncate text-xs text-slate-400">
                    {student.address || "No address"}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            LIVE STATS
        ========================================================= */}
        <div className="mb-6">
          <ProfileStats
            totalFee={totalFee}
            paidAmount={paidAmount}
            balance={balance}
            attendancePercentage={attendancePercentage}
          />
        </div>

        {/* =========================================================
            INFORMATION + FEES
        ========================================================= */}
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="overflow-hidden rounded-[24px] border border-slate-800/80 bg-slate-900/70 shadow-[0_15px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-slate-700">
            <PersonalInformation student={student} />
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-800/80 bg-slate-900/70 shadow-[0_15px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-slate-700">
            <FeeOverview
              student={student}
              totalFee={totalFee}
              paidAmount={paidAmount}
              balance={balance}
            />
          </div>

        </div>

        {/* =========================================================
            ATTENDANCE
        ========================================================= */}
        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-800/80 bg-slate-900/70 shadow-[0_15px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-slate-700">
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