"use client";

import {
  Wallet,
  CreditCard,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";

import { Student } from "@/types";

interface Props {
  student: Student;
  totalFee: number;
  paidAmount: number;
  balance: number;
}

export default function FeeOverview({
  student,
  totalFee,
  paidAmount,
  balance,
}: Props) {
  const percentage =
    totalFee === 0
      ? 0
      : Math.round((paidAmount / totalFee) * 100);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur-xl">

      {/* Heading */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Fee Overview
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Live fee information from database
          </p>

        </div>

        <Wallet
          className="text-blue-400"
          size={28}
        />

      </div>

      {/* Progress */}

      <div className="mb-8">

        <div className="mb-3 flex justify-between text-sm">

          <span className="text-slate-400">
            Payment Progress
          </span>

          <span className="font-semibold text-white">
            {percentage}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-4">

        <FeeCard
          title="Total Fee"
          value={formatCurrency(totalFee)}
          icon={<CircleDollarSign size={20} />}
          color="blue"
        />

        <FeeCard
          title="Paid Amount"
          value={formatCurrency(paidAmount)}
          icon={<CheckCircle2 size={20} />}
          color="green"
        />

        <FeeCard
          title="Remaining Balance"
          value={formatCurrency(balance)}
          icon={<CreditCard size={20} />}
          color="red"
        />

      </div>

      {/* Recent Fee Records */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold text-white">
          Recent Fee Records
        </h3>

        <div className="space-y-4">

          {student.fees?.length ? (
            student.fees.slice(0, 5).map((fee) => (
              <div
                key={fee.id}
                className="rounded-2xl border border-slate-800 bg-[#0F172A]/70 p-4"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="font-semibold text-white">
                      {fee.month} {fee.year}
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Paid: {formatCurrency(Number(fee.paidAmount))}
                    </p>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      fee.status === "Paid"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : fee.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {fee.status}
                  </span>

                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">

              <p className="text-slate-400">
                No fee records available.
              </p>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

interface FeeCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red";
}

function FeeCard({
  title,
  value,
  icon,
  color,
}: FeeCardProps) {
  const colors = {
    blue: "text-blue-400 bg-blue-500/10",
    green: "text-emerald-400 bg-emerald-500/10",
    red: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0F172A]/70 p-4">

      <div>

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <h3 className="mt-1 text-xl font-bold text-white">
          {value}
        </h3>

      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
      >
        {icon}
      </div>

    </div>
  );
}