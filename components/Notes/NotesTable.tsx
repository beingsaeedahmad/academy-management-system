"use client";

import NotesRow from "./NotesRow";
import { Note } from "./notesTypes";

interface NotesTableProps {
  notes: Note[];

  onDelete?: (id: string) => void;

  onEdit?: (id: string) => void;

  onDownload?: (
    url: string,
    fileName: string
  ) => void;
}

export default function NotesTable({
  notes,
  onDelete,
  onEdit,
  onDownload,
}: NotesTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                File
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Title
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Subject
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Class
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Category
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Uploaded By
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Date
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Downloads
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Status
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-300">
                Actions
              </th>

            </tr>
          </thead>


          <tbody>

            {notes.length > 0 ? (

              notes.map((note) => (

                <NotesRow
                  key={note.id}
                  note={note}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onDownload={onDownload}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={10}
                  className="px-5 py-12 text-center text-slate-400"
                >
                  No notes found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}