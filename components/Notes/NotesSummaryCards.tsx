"use client";

import {
  FileText,
  Download,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { NotesSummary } from "./notesTypes";

interface Props {
  summary: NotesSummary;
}

export default function NotesSummaryCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Total Notes",
      value: summary.totalNotes,
      icon: FileText,
      color:
        "from-blue-500/20 to-blue-900/20 border-blue-500/30",
      iconBg: "bg-blue-500",
    },

    {
      title: "Downloads",
      value: summary.totalDownloads,
      icon: Download,
      color:
        "from-green-500/20 to-green-900/20 border-green-500/30",
      iconBg: "bg-green-500",
    },

    {
      title: "Classes",
      value: summary.totalClasses,
      icon: GraduationCap,
      color:
        "from-purple-500/20 to-purple-900/20 border-purple-500/30",
      iconBg: "bg-purple-500",
    },

    {
      title: "Subjects",
      value: summary.totalSubjects,
      icon: BookOpen,
      color:
        "from-orange-500/20 to-orange-900/20 border-orange-500/30",
      iconBg: "bg-orange-500",
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      gap-5
      sm:grid-cols-2
      xl:grid-cols-4
    "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
            rounded-3xl
            border
            ${card.color}
            bg-gradient-to-br
            p-6
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-blue-500/20
          `}
          >
            <div className="flex items-center justify-between">
              <div>

                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {card.value}
                </h2>

              </div>

              <div
                className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${card.iconBg}
                shadow-lg
              `}
              >
                <Icon
                  size={28}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}