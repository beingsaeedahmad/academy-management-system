"use client";

import {
  Wallet,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import {
  FeesReportData,
} from "./reportsTypes";

import {
  formatCurrency,
  formatPercentage,
} from "./reportsUtils";

interface Props {
  data: FeesReportData;
}

export default function FeesReport({
  data,
}: Props) {
  const items = [
    {
      label: "Total Fees",
      value: formatCurrency(data.totalFees),
      icon: Wallet,
      className: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Collected",
      value: formatCurrency(data.collected),
      icon: CheckCircle2,
      className: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Pending",
      value: formatCurrency(data.pending),
      icon: Clock3,
      className: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Overdue",
      value: formatCurrency(data.overdue),
      icon: AlertTriangle,
      className: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Fees Report
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Financial collection summary
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">
            Collection Rate
          </p>

          <p className="mt-1 text-2xl font-bold text-cyan-400">
            {formatPercentage(data.collectionRate)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
            >
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}
              >
                <Icon size={17} className={item.className} />
              </div>

              <p className="text-xs text-slate-500">
                {item.label}
              </p>

              <p className="mt-1 text-lg font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}