"use client";

import {
  FileText,
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
      icon: FileText,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/15",
    },
    {
      title: "Downloads",
      value: totalDownloads,
      icon: Download,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/15",
    },
    {
      title: "Published",
      value: publishedNotes,
      icon: Eye,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/15",
    },
    {
      title: "Hidden",
      value: hiddenNotes,
      icon: EyeOff,
      iconColor: "text-red-400",
      iconBg: "bg-red-500/15",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:border-blue-500/40 hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon
                  className={`h-7 w-7 ${card.iconColor}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}