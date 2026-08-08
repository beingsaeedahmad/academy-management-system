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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
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
          max-w-[672px]
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          shadow-2xl
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            bg-slate-900/70
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
                bg-red-600/15
                text-red-400
              "
            >
              <Trash2 size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Delete Student
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Remove student information
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
            <X size={21} />
          </button>
        </div>

        {/* Student Identification */}
        <div
          className="
            mx-6
            mt-4
            rounded-xl
            border
            border-slate-800
            bg-slate-900/30
            px-4
            py-4
          "
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Admission No
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                {admissionNo || "—"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Roll No
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                {rollNumber || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Student Information */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <User
                  size={16}
                  className="text-blue-400"
                />

                <label className="text-sm text-slate-300">
                  Student Name
                </label>
              </div>

              <div
                className="
                  flex
                  h-[46px]
                  items-center
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  text-sm
                  text-white
                "
              >
                {studentName}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <User
                  size={16}
                  className="text-blue-400"
                />

                <label className="text-sm text-slate-300">
                  Class
                </label>
              </div>

              <div
                className="
                  flex
                  h-[46px]
                  items-center
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  text-sm
                  text-white
                "
              >
                {className || "—"}
              </div>
            </div>
          </div>

          {/* Warning */}
          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-500/20
              bg-red-500/[0.05]
              p-5
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-500/10
                  text-red-400
                "
              >
                <AlertTriangle size={20} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-red-300">
                  Delete this student?
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  This action cannot be undone. The student
                  profile and all related records will be
                  permanently deleted.
                </p>
              </div>
            </div>
          </div>

          {/* Records */}
          <div className="mt-5">
            <p className="mb-3 text-xs uppercase tracking-wide text-slate-500">
              Records that will be deleted
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  px-3
                  py-3
                  text-center
                "
              >
                <p className="text-sm font-medium text-slate-300">
                  Profile
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  px-3
                  py-3
                  text-center
                "
              >
                <p className="text-sm font-medium text-slate-300">
                  Fees
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  px-3
                  py-3
                  text-center
                "
              >
                <p className="text-sm font-medium text-slate-300">
                  Attendance
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-slate-800
            bg-slate-900/60
            px-6
            py-4
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
              py-3
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
    min-w-[155px]
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-red-500/20
    bg-red-500/10
    px-5
    py-3
    text-sm
    font-semibold
    text-red-400
    transition
    duration-200
    hover:border-red-500/30
    hover:bg-red-500/15
    hover:text-red-400
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
      Delete Student
    </>
  )}
</button>
        </div>
      </div>
    </div>
  );
}