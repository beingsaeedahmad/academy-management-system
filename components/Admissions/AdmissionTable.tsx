"use client";

import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  CircleDollarSign,
} from "lucide-react";

import { getStudents } from "@/actions/studentActions";

interface Student {
  id: string;
  admissionNo: string;
  rollNumber: string;
  name: string;
  fatherName: string;
  className: string;
  phone: string;
  monthlyFees: number;
}

export default function AdmissionTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudents();

      setStudents(data);
    } catch (error) {
      console.error("LOAD STUDENTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();

    const handleStudentAdded = () => {
      loadStudents();
    };

    window.addEventListener(
      "student-added",
      handleStudentAdded
    );

    return () => {
      window.removeEventListener(
        "student-added",
        handleStudentAdded
      );
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800/80
        bg-[#071121]
        shadow-[0_25px_80px_rgba(0,0,0,0.28)]
      "
    >
      {/* Top gradient line */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-px
          w-2/3
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-blue-400/70
          to-transparent
        "
      />

      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-64
          w-64
          rounded-full
          bg-blue-500/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32
          h-64
          w-64
          rounded-full
          bg-cyan-500/[0.03]
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* ================= HEADER ================= */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-slate-800/70
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-6
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
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/10
              "
            >
              <GraduationCap
                size={20}
                className="text-blue-400"
              />
            </div>

            {/* Title */}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-white sm:text-base">
                  Recent Admissions
                </h2>

                <span
                  className="
                    hidden
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/5
                    px-2
                    py-0.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-emerald-400
                    sm:inline-flex
                  "
                >
                  Live
                </span>
              </div>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">
                Recently registered students
              </p>
            </div>
          </div>

          {/* Total */}

          <div
            className="
              flex
              w-fit
              items-center
              gap-2.5
              rounded-xl
              border
              border-slate-800/80
              bg-slate-950/40
              px-3
              py-2
            "
          >
            <Users
              size={14}
              className="text-blue-400"
            />

            <div>
              <p className="text-[8px] uppercase tracking-wider text-slate-600">
                Total Students
              </p>

              <p className="mt-0.5 text-xs font-bold text-white">
                {students.length.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            {/* Table Head */}

            <thead>
              <tr
                className="
                  border-b
                  border-slate-800/70
                  bg-slate-950/40
                "
              >
                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Admission
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Roll No
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Student
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Father
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Class
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Mobile
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-right
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-600
                  "
                >
                  Monthly Fee
                </th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16"
                  >
                    <div className="flex flex-col items-center justify-center">
                      {/* Loader */}

                      <div
                        className="
                          h-8
                          w-8
                          animate-spin
                          rounded-full
                          border-2
                          border-slate-700
                          border-t-blue-400
                        "
                      />

                      <p className="mt-4 text-xs font-medium text-slate-500">
                        Loading students...
                      </p>

                      <p className="mt-1 text-[9px] text-slate-700">
                        Please wait
                      </p>
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-slate-800
                          bg-slate-900
                        "
                      >
                        <Users
                          size={20}
                          className="text-slate-600"
                        />
                      </div>

                      <p className="mt-4 text-xs font-medium text-slate-500">
                        No admissions yet
                      </p>

                      <p className="mt-1 text-[9px] text-slate-700">
                        New students will appear here automatically
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr
                    key={student.id}
                    className="
                      group
                      border-b
                      border-slate-800/50
                      transition-all
                      duration-300
                      hover:bg-blue-500/[0.025]
                    "
                  >
                    {/* Admission */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-lg
                            bg-slate-900
                            text-[8px]
                            font-bold
                            text-slate-600
                          "
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="text-xs font-medium text-slate-300">
                          {student.admissionNo}
                        </span>
                      </div>
                    </td>

                    {/* Roll Number */}

                    <td className="px-5 py-4">
                      <span
                        className="
                          rounded-lg
                          border
                          border-slate-800
                          bg-slate-950/50
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-medium
                          text-slate-400
                        "
                      >
                        #{student.rollNumber}
                      </span>
                    </td>

                    {/* Student */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            text-[10px]
                            font-bold
                            text-blue-400
                            transition-all
                            duration-300
                            group-hover:border-blue-400/30
                            group-hover:bg-blue-500/15
                          "
                        >
                          {getInitials(student.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white">
                            {student.name}
                          </p>

                          <p className="mt-0.5 text-[9px] text-slate-600">
                            Student
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Father */}

                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-400">
                        {student.fatherName || "--"}
                      </span>
                    </td>

                    {/* Class */}

                    <td className="px-5 py-4">
                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-lg
                          border
                          border-violet-500/15
                          bg-violet-500/5
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-semibold
                          text-violet-400
                        "
                      >
                        {student.className || "--"}
                      </span>
                    </td>

                    {/* Mobile */}

                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-400">
                        {student.phone || "--"}
                      </span>
                    </td>

                    {/* Fee */}

                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-emerald-500/10
                          "
                        >
                          <CircleDollarSign
                            size={14}
                            className="text-emerald-400"
                          />
                        </div>

                        <span className="text-xs font-semibold text-emerald-400">
                          Rs.{" "}
                          {student.monthlyFees.toLocaleString(
                            "en-PK"
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}

        {!loading && students.length > 0 && (
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-800/60
              px-5
              py-4
              sm:px-6
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[9px] text-slate-600">
                Student records
              </span>
            </div>

            <span className="text-[9px] font-medium text-slate-500">
              {students.length}{" "}
              {students.length === 1
                ? "student"
                : "students"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}