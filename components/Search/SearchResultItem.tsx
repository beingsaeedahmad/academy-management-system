"use client";

import Link from "next/link";

import {
  GraduationCap,
  CalendarCheck2,
  Wallet,
  BookOpen,
  FileBarChart,
} from "lucide-react";

import { SearchResult } from "./searchTypes";

interface Props {
  result: SearchResult;
}

export default function SearchResultItem({
  result,
}: Props) {

  const getIcon = () => {

    switch (result.category) {

      case "Student":
        return GraduationCap;

      case "Attendance":
        return CalendarCheck2;

      case "Fees":
        return Wallet;

      case "Notes":
        return BookOpen;

      case "Reports":
        return FileBarChart;

      default:
        return GraduationCap;

    }

  };

  const Icon = getIcon();

  return (

    <Link
      href={result.href}
      className="
        flex
        items-center
        gap-4
        rounded-xl
        px-4
        py-3
        transition-all
        duration-200
        hover:bg-slate-800
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-blue-500/10
          text-blue-400
        "
      >

        <Icon size={20} />

      </div>

      <div className="flex-1">

        <h3
          className="
            text-sm
            font-semibold
            text-white
          "
        >
          {result.title}
        </h3>

        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          {result.subtitle}
        </p>

      </div>

      <span
        className="
          rounded-lg
          bg-slate-800
          px-2
          py-1
          text-xs
          text-slate-400
        "
      >
        {result.category}
      </span>

    </Link>

  );

}