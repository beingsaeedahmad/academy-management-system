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
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Fee"
        value={formatCurrency(totalFee)}
        icon={<Wallet size={24} />}
        color="blue"
      />

      <StatCard
        title="Paid Fee"
        value={formatCurrency(paidAmount)}
        icon={<CreditCard size={24} />}
        color="green"
      />

      <StatCard
        title="Balance"
        value={formatCurrency(balance)}
        icon={<TrendingUp size={24} />}
        color="red"
      />

      <StatCard
        title="Attendance"
        value={`${attendancePercentage}%`}
        icon={<CalendarCheck2 size={24} />}
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
      border: "border-blue-500/30",
      accent: "bg-blue-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      glow: "group-hover:shadow-blue-500/10",
    },

    green: {
      border: "border-emerald-500/30",
      accent: "bg-emerald-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      glow: "group-hover:shadow-emerald-500/10",
    },

    red: {
      border: "border-rose-500/30",
      accent: "bg-rose-500",
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
      glow: "group-hover:shadow-rose-500/10",
    },

    yellow: {
      border: "border-amber-500/30",
      accent: "bg-amber-500",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      glow: "group-hover:shadow-amber-500/10",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        ${theme.border}
        bg-slate-900/90
        p-6
        text-left
        shadow-lg
        shadow-black/20
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        ${theme.glow}
      `}
    >
      {/* Top Accent */}
      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-px
          ${theme.accent}
          opacity-80
        `}
      />

      {/* Subtle Glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          ${theme.iconBg}
          opacity-40
          blur-2xl
          transition-opacity
          duration-300
          group-hover:opacity-70
        `}
      />

      <div className="relative flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 truncate text-3xl font-bold tracking-tight text-white">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${theme.iconBg}
            ${theme.iconColor}
            ring-1
            ring-white/5
            transition-all
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