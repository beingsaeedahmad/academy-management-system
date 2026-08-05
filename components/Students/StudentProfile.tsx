"use client";

import {
  X,
  Phone,
  User,
  School,
  Calendar,
  Wallet,
  CircleCheckBig,
  CircleX,
  Clock3,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

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

  const totalFee = (student.fees ?? []).reduce(
    (sum, fee) => sum + Number(fee.totalFee ?? 0),
    0
  );

  const paidAmount = (student.fees ?? []).reduce(
    (sum, fee) => sum + Number(fee.paidAmount ?? 0),
    0
  );

  const balance = Math.max(totalFee - paidAmount, 0);

  const present = (student.attendance ?? []).filter((a) =>
    ["P", "PRESENT", "Present"].includes((a.status ?? "").toUpperCase())
  ).length;

  const absent = (student.attendance ?? []).filter((a) =>
    ["A", "ABSENT", "Absent"].includes((a.status ?? "").toUpperCase())
  ).length;

  const late = (student.attendance ?? []).filter((a) =>
    ["L", "LATE", "Late"].includes((a.status ?? "").toUpperCase())
  ).length;

  const attendanceTotal = student.attendance?.length ?? 0;

  const attendancePercentage =
    attendanceTotal === 0
      ? 0
      : Math.round((present / attendanceTotal) * 100);

  const feePercentage =
    totalFee === 0
      ? 0
      : Math.min(100, Math.round((paidAmount / totalFee) * 100));

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

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
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300"
      />

      {/* Drawer */}

      <aside
        className="
        fixed
        right-0
        top-0
        z-50
        h-screen
        w-full
        max-w-[470px]
        overflow-y-auto
        border-l
        border-white/10
        bg-[#020817]
        shadow-[0_0_60px_rgba(0,0,0,.45)]
      "
      >
        {/* Header */}

        <div className="sticky top-0 z-30 border-b border-white/10 bg-[#020817]/90 px-6 py-5 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold tracking-tight text-white">
                Student Profile
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                View complete student information
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-slate-900
                text-slate-400
                transition-all
                duration-300
                hover:border-red-500/40
                hover:bg-red-500/10
                hover:text-red-400
              "
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* Content */}

        <div className="space-y-6 p-6">

          {/* Hero */}

          <div
            className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-blue-500/20
            bg-gradient-to-br
            from-blue-600/20
            via-slate-900
            to-slate-950
            p-7
          "
          >
            {/* Glow */}

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative flex flex-col items-center">

              {student.photo ? (

                <img
                  src={student.photo}
                  alt={student.name}
                  className="
                    h-32
                    w-32
                    rounded-full
                    border-4
                    border-white/20
                    object-cover
                    shadow-2xl
                  "
                />

              ) : (

                <div
                  className="
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    text-5xl
                    font-bold
                    text-white
                    shadow-[0_0_40px_rgba(37,99,235,.45)]
                  "
                >
                  {student.name.charAt(0)}
                </div>

              )}

              <h3 className="mt-5 text-3xl font-bold text-white">
                {student.name}
              </h3>

              <p className="mt-1 text-slate-300">
                {student.className}
              </p>
                            {/* Status */}

                            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

<span
  className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-emerald-500/30
    bg-emerald-500/10
    px-4
    py-2
    text-sm
    font-medium
    text-emerald-400
  "
>
  <BadgeCheck size={16} />
  {student.status ?? "Active"}
</span>

<span
  className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-blue-500/30
    bg-blue-500/10
    px-4
    py-2
    text-sm
    font-medium
    text-blue-400
  "
>
  <GraduationCap size={16} />
  {student.className}
</span>

</div>

</div>
</div>

{/* Statistics */}

<div className="grid grid-cols-2 gap-4">

<StatCard
title="Total Fee"
value={formatCurrency(totalFee)}
color="blue"
icon={<Wallet size={20} />}
/>

<StatCard
title="Paid Fee"
value={formatCurrency(paidAmount)}
color="emerald"
icon={<CircleCheckBig size={20} />}
/>

<StatCard
title="Balance"
value={formatCurrency(balance)}
color="red"
icon={<CircleX size={20} />}
/>

<StatCard
title="Attendance"
value={`${attendancePercentage}%`}
color="amber"
icon={<Calendar size={20} />}
/>

</div>

{/* Personal Information */}

<section
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
"
>

<h3 className="mb-6 text-lg font-semibold text-white">
Personal Information
</h3>

<div className="space-y-5">

<InfoRow
icon={<User size={18} />}
title="Student Name"
value={student.name}
/>

<InfoRow
icon={<School size={18} />}
title="Father Name"
value={student.fatherName}
/>

<InfoRow
icon={<Phone size={18} />}
title="Phone Number"
value={student.phone}
/>

<InfoRow
icon={<User size={18} />}
title="Admission No"
value={student.admissionNo}
/>

<InfoRow
icon={<User size={18} />}
title="Roll Number"
value={student.rollNumber}
/>

<InfoRow
icon={<Calendar size={18} />}
title="Admission Date"
value={formatDate(student.admissionDate)}
/>

</div>

</section>

{/* Attendance */}

<section
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
"
>

<div className="mb-5 flex items-center justify-between">

<h3 className="text-lg font-semibold text-white">
Attendance Overview
</h3>

<span className="text-sm text-slate-400">
{attendancePercentage}% Present
</span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-slate-800">

<div
style={{
  width: `${attendancePercentage}%`,
}}
className="
  h-full
  rounded-full
  bg-gradient-to-r
  from-blue-500
  to-cyan-400
  transition-all
  duration-700
"
/>

</div>

<div className="mt-6 grid grid-cols-3 gap-3">

<MiniStat
icon={<CircleCheckBig size={17} />}
title="Present"
value={present}
color="emerald"
/>

<MiniStat
icon={<CircleX size={17} />}
title="Absent"
value={absent}
color="red"
/>

<MiniStat
icon={<Clock3 size={17} />}
title="Late"
value={late}
color="amber"
/>

</div>

</section>

{/* Fee Progress */}

<section
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
backdrop-blur-xl
"
>

<div className="mb-5 flex items-center justify-between">

<h3 className="text-lg font-semibold text-white">
Fee Progress
</h3>

<span className="text-sm text-slate-400">
{feePercentage}% Paid
</span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-slate-800">

<div
style={{
  width: `${feePercentage}%`,
}}
className="
  h-full
  rounded-full
  bg-gradient-to-r
  from-emerald-500
  to-green-400
  transition-all
  duration-700
"
/>

</div>

<div className="mt-6 grid grid-cols-3 gap-3">

<MiniMoney
title="Total"
value={formatCurrency(totalFee)}
/>

<MiniMoney
title="Paid"
value={formatCurrency(paidAmount)}
/>

<MiniMoney
title="Balance"
value={formatCurrency(balance)}
/>

</div>

</section>
          {/* Bottom Space */}
          <div className="h-24" />

        </div>

        {/* Sticky Footer */}

        <div
          className="
            sticky
            bottom-0
            border-t
            border-white/10
            bg-[#020817]/95
            backdrop-blur-xl
            p-5
          "
        >
          <div className="grid grid-cols-3 gap-3">

            <button
              className="
                rounded-xl
                bg-blue-600
                px-4
                py-3
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-blue-700
                hover:shadow-lg
                hover:shadow-blue-600/30
              "
            >
              Edit
            </button>

            <button
              onClick={() => window.print()}
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                px-4
                py-3
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-slate-800
              "
            >
              Print
            </button>

            <button
              className="
                rounded-xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-4
                py-3
                font-medium
                text-emerald-400
                transition-all
                duration-300
                hover:bg-emerald-500/20
              "
            >
              Download
            </button>

          </div>
        </div>

      </aside>

    </>
  );
}

/* ============================================================
   Reusable Components
============================================================ */

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "emerald" | "red" | "amber";
}

function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {

  const colors = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
    },
  };

  return (
    <div
      className={`
        rounded-2xl
        border
        ${colors[color].border}
        ${colors[color].bg}
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
      `}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            {value}
          </h3>

        </div>

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${colors[color].bg}
            ${colors[color].text}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex items-start gap-4">

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-blue-500/10
          text-blue-400
        "
      >
        {icon}
      </div>

      <div className="flex-1 border-b border-white/5 pb-4">

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <h4 className="mt-1 text-base font-medium text-white">
          {value || "N/A"}
        </h4>

      </div>

    </div>
  );
}

function MiniStat({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: "emerald" | "red" | "amber";
}) {

  const text =
    color === "emerald"
      ? "text-emerald-400"
      : color === "red"
      ? "text-red-400"
      : "text-amber-400";

  return (
    <div className="rounded-2xl bg-slate-900 p-4 text-center">

      <div className={`${text} flex justify-center`}>
        {icon}
      </div>

      <p className="mt-2 text-sm text-slate-400">
        {title}
      </p>

      <h4 className="mt-1 text-2xl font-bold text-white">
        {value}
      </h4>

    </div>
  );
}

function MiniMoney({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-900 p-4">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h4 className="mt-2 text-lg font-bold text-white">
        {value}
      </h4>

    </div>
  );
}