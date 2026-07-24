"use client";

import {
  Search,
  GraduationCap,
  Plus,
  RefreshCw,
  Download,
} from "lucide-react";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  selectedClass: string;

  setSelectedClass: (
    value: string
  ) => void;
}

export default function FeesToolbar({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
}: Props) {
  return (
    <div
      className="
        mb-6
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-[#0F172A]
        to-[#111827]
        p-5
        shadow-2xl
      "
    >

    </div>
  );
}