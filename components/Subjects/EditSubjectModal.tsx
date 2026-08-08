"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  X,
  Loader2,
} from "lucide-react";

import { Subject } from "@/types";
import { updateSubject } from "@/actions/subjectActions";

interface Props {
  open: boolean;
  subject: Subject | null;
  onClose: () => void;
  onUpdated: () => void | Promise<void>;
}

export default function EditSubjectModal({
  open,
  subject,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    chapter: "",
    className: "",
    teacherName: "",
    status: "Active",
  });

  useEffect(() => {
    if (subject) {
      setForm({
        subject: subject.name ?? "",
        chapter: subject.chapter ?? "",
        className: subject.className ?? "",
        teacherName: subject.teacherName ?? "",
        status: subject.status ?? "Active",
      });
    }
  }, [subject]);

  if (!open || !subject) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.subject.trim()) {
      alert("Please enter subject name.");
      return;
    }

    if (!form.chapter.trim()) {
      alert("Please enter chapter name.");
      return;
    }

    if (!form.className.trim()) {
      alert("Please enter class.");
      return;
    }

    if (!form.teacherName.trim()) {
      alert("Please enter teacher name.");
      return;
    }

    try {
      setLoading(true);

      await updateSubject(subject.id, {
        subject: form.subject.trim(),
        chapter: form.chapter.trim(),
        className: form.className.trim(),
        teacherName: form.teacherName.trim(),
        status: form.status,
      });

      await onUpdated();

      onClose();
    } catch (error) {
      console.error(
        "UPDATE SUBJECT ERROR:",
        error
      );

      alert("Failed to update subject.");
    } finally {
      setLoading(false);
    }
  };

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
          max-w-lg
          overflow-hidden
          rounded-3xl
          border
          border-slate-700
          bg-slate-900
          shadow-2xl
        "
      >
        <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

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
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-600/10
                text-blue-400
              "
            >
              <BookOpen size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Edit Subject
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update subject information
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics"
                autoComplete="off"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Chapter
              </label>

              <input
                type="text"
                name="chapter"
                value={form.chapter}
                onChange={handleChange}
                placeholder="e.g. Chapter 01 - Algebra"
                autoComplete="off"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Class
              </label>

              <input
                type="text"
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="e.g. Class 9"
                autoComplete="off"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Teacher Name
              </label>

              <input
                type="text"
                name="teacherName"
                value={form.teacherName}
                onChange={handleChange}
                placeholder="e.g. Ahmad Sir"
                autoComplete="off"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition
                  focus:border-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>

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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
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
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}