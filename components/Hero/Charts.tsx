"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

import Card from "../UI/Card";
import {
  getMonthlyChartData,
  type MonthlyChartPoint,
} from "@/actions/dashboardActions";
import { TrendingUp, Wallet } from "lucide-react";

function ChartTooltip({
  active,
  payload,
  label,
  valuePrefix = "",
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  valuePrefix?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">
        {valuePrefix}
        {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-[280px] animate-pulse items-end gap-3 px-4 pb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex-1 rounded-t-lg bg-slate-800"
          style={{ height: `${40 + index * 12}%` }}
        />
      ))}
    </div>
  );
}

export default function Charts() {
  const [data, setData] = useState<MonthlyChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCharts() {
      try {
        const chartData = await getMonthlyChartData();
        setData(chartData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCharts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <Card
        hover={false}
        title="Student Admissions"
        subtitle="New enrollments over the last 6 months"
        icon={<TrendingUp size={20} />}
      >
        {loading ? (
          <ChartSkeleton />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="admissionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#admissionsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card
        hover={false}
        title="Fee Collection"
        subtitle="Amount collected over the last 6 months"
        icon={<Wallet size={20} />}
      >
        {loading ? (
          <ChartSkeleton />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) =>
                  value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)
                }
              />
              <Tooltip content={<ChartTooltip valuePrefix="Rs. " />} />
              <Bar
                dataKey="fees"
                fill="#06b6d4"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}
