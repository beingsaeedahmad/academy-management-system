"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  CircleCheck,
  Clock3,
  AlertCircle,
  LucideIcon,
} from "lucide-react";

import { getStudentStats } from "@/actions/studentActions";

type FilterType =
  | "all"
  | "paid"
  | "pending"
  | "defaulters";

interface FeeStats {
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  feeDefaulters: number;
}

interface CardItem {
  title: string;
  value: number;
  icon: LucideIcon;
  filterValue: FilterType;
  color: string;
  bg: string;
  accent: string;
  glow: string;
  subtitle: string;
  isCurrency?: boolean;
}

interface Props {
  filter?: FilterType;
  setFilter?: React.Dispatch<
    React.SetStateAction<FilterType>
  >;
}

export default function FeesSummaryCards({
  filter: externalFilter,
  setFilter: externalSetFilter,
}: Props) {
  const [stats, setStats] =
    useState<FeeStats>({
      totalFees: 0,
      paidFees: 0,
      pendingFees: 0,
      feeDefaulters: 0,
    });

  const [localFilter, setLocalFilter] =
    useState<FilterType>("all");

  const filter =
    externalFilter ?? localFilter;

  useEffect(() => {
    async function loadStats() {
      try {
        const data =
          await getStudentStats();

        setStats({
          totalFees:
            data.totalFees ?? 0,

          paidFees:
            data.paidFees ?? 0,

          pendingFees:
            data.pendingFees ?? 0,

          feeDefaulters:
            data.feeDefaulters ?? 0,
        });
      } catch (error) {
        console.error(
          "LOAD FEE STATS ERROR:",
          error
        );
      }
    }

    loadStats();
  }, []);

  const handleFilterChange = (
    nextFilter: FilterType
  ) => {
    const newFilter =
      filter === nextFilter
        ? "all"
        : nextFilter;

    if (
      typeof externalSetFilter ===
      "function"
    ) {
      externalSetFilter(newFilter);
    }

    setLocalFilter(newFilter);
  };

  const formatAmount = (
    value: number
  ) => `Rs. ${value.toLocaleString()}`;

  const cards: CardItem[] = [
    {
      title: "Total Fees",
      value: stats.totalFees,
      icon: Wallet,
      filterValue: "all",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      accent:
        "from-blue-500 to-cyan-500",
      glow:
        "group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
      subtitle: "Total fee amount",
      isCurrency: true,
    },

    {
      title: "Paid Fees",
      value: stats.paidFees,
      icon: CircleCheck,
      filterValue: "paid",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      accent:
        "from-emerald-500 to-teal-500",
      glow:
        "group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
      subtitle:
        "Successfully collected",
      isCurrency: true,
    },

    {
      title: "Pending Fees",
      value: stats.pendingFees,
      icon: Clock3,
      filterValue: "pending",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      accent:
        "from-amber-500 to-orange-500",
      glow:
        "group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
      subtitle:
        "Amount still pending",
      isCurrency: true,
    },

    {
      title: "Fee Defaulters",
      value: stats.feeDefaulters,
      icon: AlertCircle,
      filterValue: "defaulters",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      accent:
        "from-rose-500 to-orange-500",
      glow:
        "group-hover:shadow-[0_8px_32px_rgba(244,63,94,0.12)]",
      subtitle:
        "Students with pending fees",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const active =
          filter === card.filterValue;

        return (
          <button
            key={card.title}
            type="button"
            onClick={() =>
              handleFilterChange(
                card.filterValue
              )
            }
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-800/80
              bg-gradient-to-br
              from-slate-900/70
              via-slate-900/50
              to-slate-950/70
              p-5
              text-left
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-slate-700/80
              ${card.glow}
              ${
                active
                  ? "ring-2 ring-blue-500/60"
                  : ""
              }
            `}
          >
            {/* Top accent */}
            <div
              className={`
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                ${card.accent}
                opacity-70
              `}
            />

            {/* Ambient glow */}
            <div
              className={`
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-gradient-to-br
                ${card.accent}
                opacity-[0.035]
                blur-3xl
                transition-all
                duration-500
                group-hover:opacity-[0.10]
              `}
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {card.isCurrency
                      ? formatAmount(
                          card.value
                        )
                      : card.value.toLocaleString()}
                  </p>
                </div>

                <div
                  className={`
                    relative
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.04]
                    ${card.bg}
                    transition-all
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-xl
                      bg-gradient-to-br
                      ${card.accent}
                      opacity-0
                      blur-md
                      transition-opacity
                      duration-300
                      group-hover:opacity-20
                    `}
                  />

                  <Icon
                    size={20}
                    className={`relative z-10 ${card.color}`}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Progress accent */}
              <div className="mt-5">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                  <div
                    className={`
                      h-full
                      w-full
                      rounded-full
                      bg-gradient-to-r
                      ${card.accent}
                      opacity-70
                    `}
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${card.bg}
                  `}
                />

                <span className="truncate text-[11px] text-slate-600">
                  {card.subtitle}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}