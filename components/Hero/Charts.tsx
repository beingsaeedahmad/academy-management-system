"use client";

import Card from "../UI/Card";

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

const admissionsData = [
  { month: "Jan", students: 35 },
  { month: "Feb", students: 52 },
  { month: "Mar", students: 48 },
  { month: "Apr", students: 70 },
  { month: "May", students: 81 },
  { month: "Jun", students: 96 },
];

const feesData = [
  { month: "Jan", amount: 320000 },
  { month: "Feb", amount: 360000 },
  { month: "Mar", amount: 410000 },
  { month: "Apr", amount: 455000 },
  { month: "May", amount: 510000 },
  { month: "Jun", amount: 590000 },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Student Admissions */}

      <Card
        title="Student Admissions"
        subtitle="Monthly Admission Analytics"
      >
        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={admissionsData}>

              <defs>

                <linearGradient
                  id="admissionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#1e293b"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
              />

              <Tooltip
                contentStyle={{
                  background: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "16px",
                }}
              />

              <Area
                type="monotone"
                dataKey="students"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#admissionGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>
      </Card>

      {/* Fee Collection */}

      <Card
        title="Fee Collection"
        subtitle="Monthly Revenue"
      >
        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={feesData}>

              <CartesianGrid
                stroke="#1e293b"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
              />

              <Tooltip
                formatter={(value) => [
                  `Rs. ${Number(value).toLocaleString()}`,
                  "Collection",
                ]}
                contentStyle={{
                  background: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "16px",
                }}
              />

              <Bar
                dataKey="amount"
                radius={[10, 10, 0, 0]}
                fill="#2563EB"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      </Card>

    </div>
  );
}