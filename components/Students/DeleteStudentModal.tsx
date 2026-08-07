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

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {

      if (
        e.key === "Escape" &&
        !loading
      ) {
        onClose();
      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, [
    open,
    loading,
    onClose,
  ]);

  if (!open) return null;

  return (

    <div
      onClick={() => {
        if (!loading) onClose();
      }}
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-5
      "
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-slate-900
          shadow-[0_30px_100px_rgba(0,0,0,.60)]
        "
      >

        {/* top glow */}

        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

        {/* close */}

        <button
          disabled={loading}
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            rounded-xl
            p-2
            text-slate-400
            transition
            hover:bg-slate-800
            hover:text-white
          "
        >
          <X size={18} />
        </button>

        <div className="p-8">

          {/* icon */}

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-red-500/10
              ring-8
              ring-red-500/5
            "
          >
            <AlertTriangle
              size={38}
              className="text-red-500"
            />
          </div>

          {/* title */}

          <h2
            className="
              mt-6
              text-center
              text-3xl
              font-bold
              text-white
            "
          >
            Delete Student
          </h2>

          <p
            className="
              mt-3
              text-center
              leading-7
              text-slate-400
            "
          >
            Are you sure you want to permanently
            delete this student?
          </p>

          {/* student card */}

          <div
            className="
              mt-8
              rounded-2xl
              border
              border-slate-700
              bg-slate-800/60
              p-5
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600/20
                "
              >
                <User
                  size={24}
                  className="text-blue-400"
                />
              </div>

              <div>

                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Student
                </p>

                <h3 className="text-xl font-semibold text-white">
                  {studentName}
                </h3>

              </div>

            </div>

            <div className="mt-6 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Admission No
                </span>

                <span className="font-medium text-white">
                  {admissionNo || "N/A"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Roll No
                </span>

                <span className="font-medium text-white">
                  {rollNumber || "N/A"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Class
                </span>

                <span className="font-medium text-white">
                  {className || "N/A"}
                </span>
              </div>

            </div>

          </div>
       

          {/* Buttons */}

          <div className="mt-8 flex gap-4">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                h-12
                flex-1
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                font-medium
                text-white
                transition-all
                duration-200
                hover:border-slate-600
                hover:bg-slate-700
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
    h-12
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-rose-500/20
    bg-rose-500/10
    font-medium
    text-rose-400
    transition-all
    duration-300
    hover:bg-rose-500/20
    hover:text-rose-300
    hover:border-rose-400/30
    active:scale-[0.98]
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  {loading ? (
    <>
      <Loader2
        size={18}
        className="animate-spin"
      />
      Deleting...
    </>
  ) : (
    <>
      <Trash2 size={18} />
      Delete Student
    </>
  )}
</button>

          </div>
          </div>

</div>

</div>

);

}