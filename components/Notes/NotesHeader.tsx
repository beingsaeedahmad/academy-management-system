"use client";

import {
  Search,
  Plus,
  Download,
  Printer,
} from "lucide-react";

interface NotesHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAddNote: () => void;
  onExport: () => void;
  onPrint: () => void;
}

export default function NotesHeader({
  search,
  onSearchChange,
  onAddNote,
  onExport,
  onPrint,
}: NotesHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Notes
          </h1>

          <p className="mt-2 text-slate-400">
            Manage academy notes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            <Download size={18} />
            Export
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={onAddNote}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Note
          </button>
        </div>
      </div>

      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search notes by title, subject or class..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
        />
      </div>
    </div>
  );
}