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

import type { ResultRow } from "./ResultsTable";

interface EditResultModalProps {
  open: boolean;
  result: ResultRow | null;
  onClose: () => void;
  onSubmit?: (data: EditResultFormData) => Promise<void> | void;
}

export interface EditResultFormData {
  id: string;
  exam: string;
  session: string;
  totalMarks: number;
  obtainedMarks: number;
  remarks: string;
  status: "Published" | "Pending" | "Draft";
}

interface FormState {
  exam: string;
  session: string;
  totalMarks: number;
  obtainedMarks: number;
  remarks: string;
  status: "Published" | "Pending" | "Draft";
}

const emptyForm: FormState = {
  exam: "",
  session: "2026",
  totalMarks: 100,
  obtainedMarks: 0,
  remarks: "",
  status: "Draft",
};

export default function EditResultModal({
  open,
  result,
  onClose,
  onSubmit,
}: EditResultModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !result) {
      return;
    }

    setForm({
      exam: result.exam,
      session: "2026",
      totalMarks: result.totalMarks,
      obtainedMarks: result.obtainedMarks,
      remarks: "",
      status: result.status,
    });

    setSaving(false);
  }, [open, result]);

  if (!open || !result) {
    return null;
  }

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!result) {
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
        id: result.id,
        exam: form.exam,
        session: form.session,
        totalMarks: Number(form.totalMarks),
        obtainedMarks: Number(form.obtainedMarks),
        remarks: form.remarks,
        status: form.status,
      });

      onClose();
    } catch (error) {
      console.error("Failed to update result:", error);
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
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
              <Award
                size={21}
                className="text-amber-400"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Edit Student Result
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Update academic performance details
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

        {/* Student Information */}
        <div className="border-b border-slate-800/80 px-6 py-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
              <GraduationCap
                size={19}
                className="text-blue-400"
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-200">
                {result.studentName}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[11px] text-slate-600">
                  Roll No. {result.rollNumber}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-700" />

                <span className="text-[11px] text-slate-600">
                  {result.className}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-700" />

                <span className="text-[11px] text-slate-600">
                  {result.subject}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto"
        >
          <div className="space-y-6 px-6 py-6">
            {/* Exam & Session */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Exam */}
              <div>
                <label
                  htmlFor="edit-result-exam"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <FileText size={14} />
                  Examination
                </label>

                <select
                  id="edit-result-exam"
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
                    focus:border-amber-500/40
                    focus:ring-2
                    focus:ring-amber-500/10
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
                  htmlFor="edit-result-session"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <CalendarDays size={14} />
                  Academic Session
                </label>

                <select
                  id="edit-result-session"
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
                    focus:border-amber-500/40
                    focus:ring-2
                    focus:ring-amber-500/10
                  "
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            {/* Subject Info */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10">
                <BookOpen
                  size={17}
                  className="text-sky-400"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p className="text-xs text-slate-600">
                  Subject
                </p>

                <p className="mt-0.5 text-sm font-medium text-slate-300">
                  {result.subject}
                </p>
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
                    Update total and obtained marks
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5">
                  <span className="text-xs font-semibold text-amber-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Total Marks */}
                <div>
                  <label
                    htmlFor="edit-result-total-marks"
                    className="mb-2 block text-xs font-medium text-slate-500"
                  >
                    Total Marks
                  </label>

                  <input
                    id="edit-result-total-marks"
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
                      focus:border-amber-500/40
                      focus:ring-2
                      focus:ring-amber-500/10
                    "
                  />
                </div>

                {/* Obtained Marks */}
                <div>
                  <label
                    htmlFor="edit-result-obtained-marks"
                    className="mb-2 block text-xs font-medium text-slate-500"
                  >
                    Obtained Marks
                  </label>

                  <input
                    id="edit-result-obtained-marks"
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
                      focus:border-amber-500/40
                      focus:ring-2
                      focus:ring-amber-500/10
                    "
                  />
                </div>
              </div>
            </div>

            {/* Performance Preview */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Performance
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-300">
                    {form.obtainedMarks} / {form.totalMarks} marks
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-600">
                    Percentage
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      Math.max(percentage, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label
                htmlFor="edit-result-remarks"
                className="mb-2 block text-xs font-medium text-slate-400"
              >
                Remarks
              </label>

              <textarea
                id="edit-result-remarks"
                value={form.remarks}
                onChange={(event) =>
                  updateField("remarks", event.target.value)
                }
                rows={3}
                placeholder="Add optional remarks..."
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
                  focus:border-amber-500/40
                  focus:ring-2
                  focus:ring-amber-500/10
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
                    Update the publication status.
                  </p>
                </div>

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as
                        | "Published"
                        | "Pending"
                        | "Draft"
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
                    focus:border-amber-500/40
                  "
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Published">Published</option>
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
                border border-amber-500/30
                bg-amber-600
                px-6
                text-sm font-semibold text-white
                shadow-lg shadow-amber-500/10
                transition-all
                hover:bg-amber-500
                hover:shadow-amber-500/20
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
                  Updating...
                </>
              ) : (
                <>
                  <Award size={16} />
                  Update Result
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}