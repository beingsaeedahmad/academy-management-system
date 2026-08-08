"use client";

import {
    AlertTriangle,
    Loader2,
    Trash2,
    X,
  } from "lucide-react";
  import { Subject } from "./subjectTypes";

interface Props {
  open: boolean;
  loading: boolean;
  subject: Subject | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}
export default function DeleteSubjectModal({
    open,
    loading,
    subject,
    onClose,
    onConfirm,
  }: Props) {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-md
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-slate-700
          bg-slate-900
          shadow-2xl
        "
      >
        {/* Top Warning Line */}

        <div className="h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            absolute
            right-5
            top-5
            rounded-xl
            p-2
            text-slate-400
            transition
            hover:bg-slate-800
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <X size={19} />
        </button>

        <div className="p-7">
          {/* Warning Icon */}

          <div className="flex justify-center">
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-red-500/10
                text-red-400
                ring-1
                ring-red-500/20
              "
            >
              <AlertTriangle size={30} />
            </div>
          </div>

          {/* Title */}

          <div className="mt-5 text-center">
            <h2 className="text-2xl font-bold text-white">
              Delete Subject
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Are you sure you want to delete this
              subject? This action cannot be undone.
            </p>
          </div>

          {/* Subject Information */}

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-slate-800
              bg-slate-950/70
              p-4
            "
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Subject
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
              {subject?.name}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Chapter
                </p>

                <p className="mt-1 text-sm text-slate-300">
                {subject?.chapter}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Class
                </p>

                <p className="mt-1 text-sm text-slate-300">
                {subject?.className}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                flex-1
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                py-3
                font-medium
                text-slate-300
                transition
                hover:bg-slate-700
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                py-3
                font-semibold
                text-red-400
                transition
                hover:border-red-500/40
                hover:bg-red-500/20
                hover:text-red-300
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={17} />
                  Delete Subject
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}