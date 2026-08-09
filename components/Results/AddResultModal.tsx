"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Loader2,
  X,
} from "lucide-react";

interface AddResultModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: AddResultFormData) => Promise<void> | void;
}

export interface AddResultFormData {
  studentId: string;
  subjectId: string;
  exam: string;
  session: string;
  totalMarks: number;
  obtainedMarks: number;
  remarks: string;
  status: "Published" | "Draft";
}

const initialForm: AddResultFormData = {
  studentId: "",
  subjectId: "",
  exam: "",
  session: "2026",
  totalMarks: 100,
  obtainedMarks: 0,
  remarks: "",
  status: "Draft",
};

export default function AddResultModal({
  open,
  onClose,
  onSubmit,
}: AddResultModalProps) {
  const [form, setForm] = useState<AddResultFormData>(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setSaving(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function updateField<K extends keyof AddResultFormData>(
    field: K,
    value: AddResultFormData[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.studentId) {
      return;
    }

    if (!form.subjectId) {
      return;
    }

    if (!form.exam) {
      return;
    }

    if (form.totalMarks <= 0) {
      return;
    }

    if (
      form.obtainedMarks < 0 ||
      form.obtainedMarks > form.totalMarks
    ) {
      return;
    }

    try {
      setSaving(true);

      await onSubmit?.({
        ...form,
        totalMarks: Number(form.totalMarks),
        obtainedMarks: Number(form.obtainedMarks),
      });

      onClose();
    } catch (error) {
      console.error("Failed to save result:", error);
    } finally {
      setSaving(false);
    }
  }

  const percentage =
    form.totalMarks > 0
      ? (form.obtainedMarks / form.totalMarks) * 100
      : 0;

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
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          flex max-h-[90vh]
          w-full max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          border border-slate-800
          bg-[#0b1220]
          shadow-2xl
          shadow-black/40
        "
      >
        {/* Top Accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <Award
                size={21}
                className="text-blue-400"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Add Student Result
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Enter academic performance details
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={saving}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto"
        >
          <div className="space-y-6 px-6 py-6">
            {/* Student & Subject */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Student */}
              <div>
                <label
                  htmlFor="result-student"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <GraduationCap size={14} />
                  Student
                </label>

                <select
                  id="result-student"
                  value={form.studentId}
                  onChange={(event) =>
                    updateField("studentId", event.target.value)
                  }
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-800
                    bg-slate-950/60
                    px-3
                    text-sm text-slate-300
                    outline-none
                    transition
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                  "
                >
                  <option value="">Select student</option>

                  <option value="student-placeholder">
                    Select from registered students
                  </option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="result-subject"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <BookOpen size={14} />
                  Subject
                </label>

                <select
                  id="result-subject"
                  value={form.subjectId}
                  onChange={(event) =>
                    updateField("subjectId", event.target.value)
                  }
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-800
                    bg-slate-950/60
                    px-3
                    text-sm text-slate-300
                    outline-none
                    transition
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                  "
                >
                  <option value="">Select subject</option>

                  <option value="subject-placeholder">
                    Select from academy subjects
                  </option>
                </select>
              </div>
            </div>

            {/* Exam & Session */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Exam */}
              <div>
                <label
                  htmlFor="result-exam"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <FileText size={14} />
                  Examination
                </label>

                <select
                  id="result-exam"
                  value={form.exam}
                  onChange={(event) =>
                    updateField("exam", event.target.value)
                  }
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-800
                    bg-slate-950/60
                    px-3
                    text-sm text-slate-300
                    outline-none
                    transition
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                  "
                >
                  <option value="">Select examination</option>
                  <option value="Monthly Test">Monthly Test</option>
                  <option value="Mid Term">Mid Term</option>
                  <option value="Final Exam">Final Exam</option>
                  <option value="Class Test">Class Test</option>
                </select>
              </div>

              {/* Session */}
              <div>
                <label
                  htmlFor="result-session"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <CalendarDays size={14} />
                  Academic Session
                </label>

                <select
                  id="result-session"
                  value={form.session}
                  onChange={(event) =>
                    updateField("session", event.target.value)
                  }
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-800
                    bg-slate-950/60
                    px-3
                    text-sm text-slate-300
                    outline-none
                    transition
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                  "
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            {/* Marks */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Marks
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Enter total and obtained marks
                  </p>
                </div>

                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                  <span className="text-xs font-semibold text-blue-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Total */}
                <div>
                  <label
                    htmlFor="result-total-marks"
                    className="mb-2 block text-xs font-medium text-slate-500"
                  >
                    Total Marks
                  </label>

                  <input
                    id="result-total-marks"
                    type="number"
                    min={1}
                    value={form.totalMarks}
                    onChange={(event) =>
                      updateField(
                        "totalMarks",
                        Number(event.target.value)
                      )
                    }
                    required
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-800
                      bg-slate-950/60
                      px-3
                      text-sm text-white
                      outline-none
                      transition
                      focus:border-blue-500/40
                      focus:ring-2
                      focus:ring-blue-500/10
                    "
                  />
                </div>

                {/* Obtained */}
                <div>
                  <label
                    htmlFor="result-obtained-marks"
                    className="mb-2 block text-xs font-medium text-slate-500"
                  >
                    Obtained Marks
                  </label>

                  <input
                    id="result-obtained-marks"
                    type="number"
                    min={0}
                    max={form.totalMarks}
                    value={form.obtainedMarks}
                    onChange={(event) =>
                      updateField(
                        "obtainedMarks",
                        Number(event.target.value)
                      )
                    }
                    required
                    className="
                      h-11 w-full
                      rounded-xl
                      border border-slate-800
                      bg-slate-950/60
                      px-3
                      text-sm text-white
                      outline-none
                      transition
                      focus:border-blue-500/40
                      focus:ring-2
                      focus:ring-blue-500/10
                    "
                  />
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label
                htmlFor="result-remarks"
                className="mb-2 block text-xs font-medium text-slate-400"
              >
                Remarks
              </label>

              <textarea
                id="result-remarks"
                value={form.remarks}
                onChange={(event) =>
                  updateField("remarks", event.target.value)
                }
                rows={3}
                placeholder="Optional remarks about the student's performance..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-slate-800
                  bg-slate-950/60
                  px-3 py-3
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-600
                  transition
                  focus:border-blue-500/40
                  focus:ring-2
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Result Status
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Choose whether this result is ready to publish.
                  </p>
                </div>

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as "Published" | "Draft"
                    )
                  }
                  className="
                    h-10
                    rounded-xl
                    border border-slate-800
                    bg-slate-900
                    px-3
                    text-sm text-slate-300
                    outline-none
                    focus:border-blue-500/40
                  "
                >
                  <option value="Draft">Save as Draft</option>
                  <option value="Published">Publish Result</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-800/80 bg-slate-950/30 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="
                h-11 rounded-xl
                border border-slate-800
                bg-slate-900/60
                px-5
                text-sm font-medium text-slate-400
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
              type="submit"
              disabled={saving}
              className="
                inline-flex h-11
                items-center justify-center
                gap-2
                rounded-xl
                border border-blue-500/30
                bg-blue-600
                px-6
                text-sm font-semibold text-white
                shadow-lg shadow-blue-500/10
                transition-all
                hover:bg-blue-500
                hover:shadow-blue-500/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Award size={16} />
                  Save Result
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}