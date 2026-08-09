"use client";

import { FileBarChart } from "lucide-react";

import { ReportTableRow } from "./reportsTypes";

interface Props {
  rows: ReportTableRow[];
}

export default function ReportTable({
  rows,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
          <FileBarChart
            size={18}
            className="text-blue-400"
          />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Recent Admissions
          </h3>

          <p className="text-xs text-slate-500">
            Latest students registered in the academy
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Student
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Class
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Admission Date
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-800/70 last:border-0 hover:bg-slate-800/30"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-200">
                    {row.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {row.className}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        row.status.toLowerCase() ===
                        "active"
                          ? "rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
                          : "rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-400"
                      }
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right text-sm text-slate-300">
                    {row.value}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <FileBarChart
                      size={28}
                      className="mb-3 text-slate-700"
                    />

                    <p className="text-sm font-medium text-slate-400">
                      No admission data available
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Recent student admissions will appear
                      here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}