"use client";

import {
  Wallet,
  CreditCard,
  TrendingUp,
  CalendarCheck2,
} from "lucide-react";

interface Props {
  totalFee: number;
  paidAmount: number;
  balance: number;
  attendancePercentage: number;
}

export default function ProfileStats({
  totalFee,
  paidAmount,
  balance,
  attendancePercentage,
}: Props) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {/* Total Fee */}

      <StatCard
        title="Total Fee"
        value={formatCurrency(totalFee)}
        icon={
          <Wallet
            className="text-blue-400"
            size={26}
          />
        }
        color="blue"
      />

      {/* Paid */}

      <StatCard
        title="Paid Fee"
        value={formatCurrency(paidAmount)}
        icon={
          <CreditCard
            className="text-emerald-400"
            size={26}
          />
        }
        color="green"
      />

      {/* Balance */}

      <StatCard
        title="Balance"
        value={formatCurrency(balance)}
        icon={
          <TrendingUp
            className="text-red-400"
            size={26}
          />
        }
        color="red"
      />

      {/* Attendance */}

      <StatCard
        title="Attendance"
        value={`${attendancePercentage}%`}
        icon={
          <CalendarCheck2
            className="text-yellow-400"
            size={26}
          />
        }
        color="yellow"
      />

    </section>
  );
}

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "yellow";
}

function StatCard({
  title,
  value,
  icon,
  color,
}: CardProps) {
  const colors = {
    blue: {
      border: "border-blue-500/20",
      bg: "from-blue-600/20 to-blue-900/10",
    },

    green: {
      border: "border-emerald-500/20",
      bg: "from-emerald-600/20 to-emerald-900/10",
    },

    red: {
      border: "border-red-500/20",
      bg: "from-red-600/20 to-red-900/10",
    },

    yellow: {
      border: "border-yellow-500/20",
      bg: "from-yellow-600/20 to-yellow-900/10",
    },
  };

  return (
    <div
      className={`
        group
        rounded-3xl
        border
        ${colors[color].border}
        bg-gradient-to-br
        ${colors[color].bg}
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      `}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-slate-900/70
            transition
            group-hover:scale-110
          "
        >
          {icon}
        </div>

      </div>

    </div>
  );
}