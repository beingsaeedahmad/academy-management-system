"use client";

import { useEffect } from "react";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  User,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  loading: boolean;
  studentName: string;
  admissionNo?: string;
  rollNumber?: string;
  className?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteStudentModal({
  open,
  loading,
  studentName,
  admissionNo,
  rollNumber,
  className,
  onClose,
  onConfirm,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            bg-slate-900/80
            px-6
            py-5
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-red-400
              "
            >
              <Trash2 size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Delete Student
              </h2>

              <p className="mt-0.5 text-sm text-slate-400">
                Remove this student permanently
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Warning */}
          <div
            className="
              flex
              gap-3
              rounded-xl
              border
              border-red-500/20
              bg-red-500/5
              p-4
            "
          >
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div>
              <p className="text-sm font-medium text-red-300">
                This action cannot be undone.
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                The student and related records will be
                permanently removed.
              </p>
            </div>
          </div>

          {/* Student */}
          <div
            className="
              mt-5
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-600/10
                  text-blue-400
                "
              >
                <User size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-500">
                  Student
                </p>

                <h3 className="truncate text-base font-semibold text-white">
                  {studentName}
                </h3>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">
              <div>
                <p className="text-xs text-slate-500">
                  Admission
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-200">
                  {admissionNo || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Roll No
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-200">
                  {rollNumber || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Class
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-200">
                  {className || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-800
            bg-slate-900/50
            px-6
            py-4
            sm:flex-row
            sm:justify-end
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-2.5
              text-sm
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
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-red-600/10
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
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
                Delete Student
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}