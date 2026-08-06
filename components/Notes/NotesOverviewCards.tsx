"use client";

import {
  BookOpen,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

interface NotesOverviewCardsProps {
  totalNotes: number;
  totalDownloads: number;
  publishedNotes: number;
  hiddenNotes: number;
}

export default function NotesOverviewCards({
  totalNotes,
  totalDownloads,
  publishedNotes,
  hiddenNotes,
}: NotesOverviewCardsProps) {
  const cards = [
    {
      title: "Total Notes",
      value: totalNotes,
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      title: "Downloads",
      value: totalDownloads,
      icon: Download,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "Published",
      value: publishedNotes,
      icon: Eye,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
    },
    {
      title: "Hidden",
      value: hiddenNotes,
      icon: EyeOff,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border ${card.border} bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div
              className={`absolute inset-0 opacity-10 blur-3xl ${card.bg}`}
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl p-4 ${card.bg}`}
              >
                <Icon
                  size={28}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}