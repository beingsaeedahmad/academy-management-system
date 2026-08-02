"use client";

import { X, Phone, User, School, Calendar, Wallet, CircleCheckBig, CircleX, Clock3 } from "lucide-react";
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

  const present = (student.attendance ?? []).filter(
    (entry) => ["P", "PRESENT", "Present"].includes((entry.status ?? "").toUpperCase())
  ).length;

  const absent = (student.attendance ?? []).filter(
    (entry) => ["A", "ABSENT", "Absent"].includes((entry.status ?? "").toUpperCase())
  ).length;

  const late = (student.attendance ?? []).filter(
    (entry) => ["L", "LATE", "Late"].includes((entry.status ?? "").toUpperCase())
  ).length;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (value: Date | string | null | undefined) => {
    if (!value) return "N/A";

    const dateValue = typeof value === "string" ? new Date(value) : value;

    return dateValue.toLocaleDateString();
  };

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
              value={formatDate(student.admissionDate)}
            />

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-blue-400">
              <Wallet size={18} />
              <h3 className="font-semibold text-white">Fee Overview</h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoMini title="Total Fee" value={formatCurrency(totalFee)} />
              <InfoMini title="Paid" value={formatCurrency(paidAmount)} />
              <InfoMini title="Balance" value={formatCurrency(balance)} />
              <InfoMini title="Status" value={student.fees?.[0]?.status ?? "Pending"} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-blue-400">
              <Calendar size={18} />
              <h3 className="font-semibold text-white">Attendance Summary</h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <InfoMini title="Present" value={`${present}`} icon={<CircleCheckBig size={16} />} />
              <InfoMini title="Absent" value={`${absent}`} icon={<CircleX size={16} />} />
              <InfoMini title="Late" value={`${late}`} icon={<Clock3 size={16} />} />
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {student.attendance?.length ?? 0} attendance records available
            </p>
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
  value: string | number | null | undefined;
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

function InfoMini({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-base font-semibold text-white">{value}</p>
    </div>
  );
}