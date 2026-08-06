"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Download,
  FileText,
} from "lucide-react";

import { Note } from "./notesTypes";

interface NotesTableProps {
  notes: Note[];
  onView: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onDownload: (note: Note) => void;
}

export default function NotesTable({
  notes,
  onView,
  onEdit,
  onDelete,
  onDownload,
}: NotesTableProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
        <FileText
          size={60}
          className="mx-auto mb-4 text-slate-600"
        />

        <h2 className="text-xl font-semibold text-white">
          No Notes Found
        </h2>

        <p className="mt-2 text-slate-400">
          Upload your first note to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-950">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Class
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Uploaded By
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Downloads
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
          {notes.map((note) => (

<tr
  key={note.id}
  className="border-t border-slate-800 transition hover:bg-slate-800/40"
>

  <td className="px-6 py-4">

    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">

        <FileText
          size={22}
          className="text-blue-400"
        />

      </div>

      <div>

        <p className="font-semibold text-white">
          {note.title}
        </p>

        <p className="text-xs text-slate-400">
          {note.fileName}
        </p>

      </div>

    </div>

  </td>

  <td className="px-6 py-4 text-slate-300">
    {note.subject}
  </td>

  <td className="px-6 py-4 text-slate-300">
    {note.className}
  </td>

  <td className="px-6 py-4 text-slate-300">
    {note.uploadedBy}
  </td>

  <td className="px-6 py-4 text-center">

    <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">

      {note.downloads}

    </span>

  </td>

  <td className="px-6 py-4 text-center">

    {note.isPublished ? (

      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
        Published
      </span>

    ) : (

      <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
        Hidden
      </span>

    )}

  </td>

  <td className="px-6 py-4">

    <div className="flex items-center justify-center gap-2">
    <button
                      onClick={() => onView(note)}
                      className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(note)}
                      className="rounded-lg bg-amber-500/10 p-2 text-amber-400 transition hover:bg-amber-500 hover:text-white"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDownload(note)}
                      className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(note)}
                      className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))},
                      </tbody>

</table>

</div>

</div>

);
}
       