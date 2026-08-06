"use client";

import { Trash2, X } from "lucide-react";
import { deleteNote } from "@/actions/noteActions";

interface DeleteNoteDialogProps {
  open: boolean;
  noteId: string | null;
  noteTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteNoteDialog({
  open,
  noteId,
  noteTitle,
  onClose,
  onSuccess,
}: DeleteNoteDialogProps) {
  if (!open || !noteId) return null;

  async function handleDelete() {
    if (!noteId) return;
  
    try {
      await deleteNote(noteId);
  
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-500/20 p-3">
              <Trash2
                size={22}
                className="text-red-500"
              />
            </div>

            <h2 className="text-xl font-bold text-white">
              Delete Note
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >
            <X size={20} />
          </button>

        </div>

        <p className="text-slate-300">
          Are you sure you want to delete
        </p>

        <p className="mt-2 font-semibold text-white">
          {noteTitle}
        </p>

        <p className="mt-3 text-sm text-red-400">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}