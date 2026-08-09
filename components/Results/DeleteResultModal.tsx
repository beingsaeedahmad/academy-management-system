"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import type { ResultRow } from "./ResultsTable";

interface DeleteResultModalProps {
  open: boolean;
  result: ResultRow | null;
  onClose: () => void;
  onConfirm?: (result: ResultRow) => Promise<void> | void;
}

export default function DeleteResultModal({
  open,
  result,
  onClose,
  onConfirm,
}: DeleteResultModalProps) {
  const [deleting, setDeleting] = useState(false);

  if (!open || !result) {
    return null;
  }

  async function handleDelete() {
    if (!result) {
      return;
    }

    try {
      setDeleting(true);

      await onConfirm?.(result);

      onClose();
    } catch (error) {
      console.error("Failed to delete result:", error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-slate-800
          bg-[#0b1220]
          shadow-2xl
          shadow-black/50
        "
      >
        {/* Top Accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-500 via-orange-500 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10">
            <AlertTriangle
              size={23}
              className="text-red-400"
              strokeWidth={1.8}
            />
          </div>

          <button
            type="button"
            disabled={deleting}
            onClick={onClose}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              text-slate-500
              transition-all
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-5">
          <h2 className="text-lg font-semibold text-white">
            Delete Result
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Are you sure you want to delete this academic result?
            This action cannot be undone.
          </p>

          {/* Result Preview */}
          <div className="mt-5 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-200">
                  {result.studentName}
                </p>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[11px] text-slate-600">
                    Roll No. {result.rollNumber}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-slate-700" />

                  <span className="text-[11px] text-slate-600">
                    {result.className}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs text-slate-600">
                  {result.subject}
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-300">
                  {result.obtainedMarks}/{result.totalMarks}
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-4 flex gap-3 rounded-2xl border border-red-500/10 bg-red-500/[0.04] p-4">
            <AlertTriangle
              size={17}
              className="mt-0.5 shrink-0 text-red-400"
              strokeWidth={1.8}
            />

            <p className="text-xs leading-5 text-slate-500">
              Deleting this result will permanently remove the
              academic record from the system.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-800/80 bg-slate-950/30 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={deleting}
            onClick={onClose}
            className="
              h-11 rounded-xl
              border border-slate-800
              bg-slate-900/60
              px-5
              text-sm font-medium
              text-slate-400
              transition-all
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="
              inline-flex h-11
              items-center justify-center
              gap-2
              rounded-xl
              border border-red-500/20
              bg-red-600
              px-5
              text-sm font-semibold
              text-white
              shadow-lg
              shadow-red-500/10
              transition-all
              hover:bg-red-500
              hover:shadow-red-500/20
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {deleting ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Result
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}