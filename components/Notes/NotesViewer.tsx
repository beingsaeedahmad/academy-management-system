"use client";

import { X, Download, FileText, Calendar, User, BookOpen } from "lucide-react";
import { Note } from "./notesTypes";

interface NotesViewerProps {
  note: Note | null;
  open: boolean;
  onClose: () => void;
}

export default function NotesViewer({
  note,
  open,
  onClose,
}: NotesViewerProps) {
  if (!open || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {note.title}
            </h2>

            <p className="mt-1 text-slate-400">
              Note Preview
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <div className="flex h-[500px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950">

              <div className="text-center">

                <FileText
                  className="mx-auto mb-4 text-blue-500"
                  size={70}
                />

                <h3 className="text-xl font-semibold text-white">
                  {note.fileName}
                </h3>

                <p className="mt-2 text-slate-400">
                  Preview will appear here after file upload is implemented.
                </p>

              </div>

            </div>

          </div>

          <div className="space-y-5">

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

              <h3 className="mb-4 text-lg font-semibold text-white">
                Details
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <BookOpen className="text-blue-400" size={18} />

                  <div>
                    <p className="text-xs text-slate-500">
                      Subject
                    </p>

                    <p className="text-white">
                      {note.subject}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <User className="text-green-400" size={18} />

                  <div>
                    <p className="text-xs text-slate-500">
                      Uploaded By
                    </p>

                    <p className="text-white">
                      {note.uploadedBy}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Calendar className="text-orange-400" size={18} />

                  <div>
                    <p className="text-xs text-slate-500">
                      Uploaded
                    </p>

                    <p className="text-white">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                <div>

                  <p className="mb-1 text-xs text-slate-500">
                    Class
                  </p>

                  <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-blue-400">
                    {note.className}
                  </span>

                </div>

                <div>

                  <p className="mb-1 text-xs text-slate-500">
                    Downloads
                  </p>

                  <p className="text-white">
                    {note.downloads}
                  </p>

                </div>

                <div>

                  <p className="mb-1 text-xs text-slate-500">
                    Description
                  </p>

                  <p className="text-slate-300">
                    {note.description}
                  </p>

                </div>

              </div>

            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              <Download size={18} />

              Download Note

            </button>

          </div>

        </div>

      </div>
    </div>
  );
}