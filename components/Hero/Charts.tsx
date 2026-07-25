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

   
    </div>
  );
}