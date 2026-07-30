"use client";

import { Search, RotateCcw, Plus } from "lucide-react";
import NotesButton from "./UI/NotesButton";

interface NotesToolbarProps {
  search: string;
  classNameFilter: string;
  subjectFilter: string;
  categoryFilter: string;

  onSearchChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onCategoryChange: (value: string) => void;

  onReset: () => void;
  onAddNote: () => void;

  classes?: string[];
  subjects?: string[];
  categories?: string[];
}

export default function NotesToolbar({
  search,
  classNameFilter,
  subjectFilter,
  categoryFilter,
  onSearchChange,
  onClassChange,
  onSubjectChange,
  onCategoryChange,
  onReset,
  onAddNote,
  classes = [],
  subjects = [],
  categories = [],
}: NotesToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="grid gap-4 lg:grid-cols-5">

        <div className="relative lg:col-span-2">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={classNameFilter}
          onChange={(e) => onClassChange(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        >
          <option value="">All Classes</option>

          {classes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        >
          <option value="">All Subjects</option>

          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="mt-5 flex flex-wrap gap-3">

        <NotesButton
          variant="primary"
          onClick={onAddNote}
        >
          <Plus size={18} className="mr-2" />
          Add Note
        </NotesButton>

        <NotesButton
          variant="secondary"
          onClick={onReset}
        >
          <RotateCcw size={18} className="mr-2" />
          Reset Filters
        </NotesButton>

      </div>
    </div>
  );
}