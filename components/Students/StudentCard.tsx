"use client";

import {
  Users,
  UserCheck,
  UserPlus,
  Wallet,
} from "lucide-react";

const cards = [
  {
    title: "Total Students",
    value: "0",
    icon: Users,
  },
  {
    title: "Active Students",
    value: "0",
    icon: UserCheck,
  },
  {
    title: "New Admissions",
    value: "0",
    icon: UserPlus,
  },
  {
    title: "Fee Defaulters",
    value: "0",
    icon: Wallet,
  },
];

export default function StudentCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-6
              transition
              hover:border-blue-500
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-600/20 p-3">
                <Icon
                  size={28}
                  className="text-blue-500"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}