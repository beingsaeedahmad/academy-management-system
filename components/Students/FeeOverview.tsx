"use client";

import {
  Wallet,
  CreditCard,
  CircleDollarSign,
  CheckCircle2,
  CalendarDays,
  ArrowUpRight,
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
      : Math.min(
          Math.round((paidAmount / totalFee) * 100),
          100
        );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

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
      <div className="absolute inset-x-0 top-0 h-px bg-cyan-500/70" />

      {/* Header */}
      <div className="relative mb-7 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-400
              ring-1
              ring-cyan-500/20
            "
          >
            <Wallet size={20} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Fee Overview
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Live payment information
            </p>
          </div>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-800
            bg-slate-950/60
            text-slate-500
          "
        >
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Payment Progress */}
      <div
        className="
          mb-6
          rounded-xl
          border
          border-slate-800
          bg-slate-950/40
          p-4
        "
      >
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Payment Progress
            </p>

            <p className="mt-1 text-sm text-slate-300">
              {formatCurrency(paidAmount)} of{" "}
              {formatCurrency(totalFee)}
            </p>
          </div>

          <span className="text-sm font-bold text-cyan-400">
            {percentage}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              shadow-lg
              shadow-cyan-500/20
              transition-all
              duration-700
            "
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      {/* Fee Summary */}
      <div className="grid gap-3 sm:grid-cols-3">
        <FeeCard
          title="Total Fee"
          value={formatCurrency(totalFee)}
          icon={<CircleDollarSign size={19} />}
          color="blue"
        />

        <FeeCard
          title="Paid Amount"
          value={formatCurrency(paidAmount)}
          icon={<CheckCircle2 size={19} />}
          color="green"
        />

        <FeeCard
          title="Balance"
          value={formatCurrency(balance)}
          icon={<CreditCard size={19} />}
          color="red"
        />
      </div>

      {/* Recent Records */}
      <div className="mt-7">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">
              Recent Fee Records
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Latest payment activity
            </p>
          </div>

          <CalendarDays
            size={18}
            className="text-slate-600"
          />
        </div>

        <div className="space-y-3">
          {student.fees?.length ? (
            student.fees.slice(0, 5).map((fee) => (
              <div
                key={fee.id}
                className="
                  group
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-950/40
                  p-4
                  transition-all
                  duration-300
                  hover:border-slate-700
                  hover:bg-slate-950/70
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-800/80
                        text-slate-400
                        transition
                        group-hover:text-cyan-400
                      "
                    >
                      <Wallet size={17} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-white">
                        {fee.month} {fee.year}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        Paid:{" "}
                        <span className="text-slate-400">
                          {formatCurrency(
                            Number(fee.paidAmount)
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={fee.status} />
                </div>
              </div>
            ))
          ) : (
            <div
              className="
                rounded-xl
                border
                border-dashed
                border-slate-700
                bg-slate-950/30
                px-6
                py-10
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  mb-3
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-800
                  text-slate-500
                "
              >
                <Wallet size={18} />
              </div>

              <p className="text-sm text-slate-400">
                No fee records available.
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Payment history will appear here.
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
    blue: {
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      accent: "bg-blue-500",
    },

    green: {
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      accent: "bg-emerald-500",
    },

    red: {
      border: "border-rose-500/20",
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
      accent: "bg-rose-500",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-xl
        border
        ${theme.border}
        bg-slate-950/40
        p-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-slate-950/70
      `}
    >
      {/* Accent */}
      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-px
          ${theme.accent}
          opacity-60
        `}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 truncate text-lg font-bold text-white">
            {value}
          </h3>
        </div>

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            ${theme.iconBg}
            ${theme.iconColor}
            ring-1
            ring-white/5
            transition
            duration-300
            group-hover:scale-105
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles =
    status === "Paid"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      : status === "Pending"
      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
      : "border-rose-500/20 bg-rose-500/10 text-rose-400";

  return (
    <span
      className={`
        shrink-0
        rounded-full
        border
        px-2.5
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-wide
        ${styles}
      `}
    >
      {status}
    </span>
  );
}