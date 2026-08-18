"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Plus,
  UserRound,
  X,
} from "lucide-react";

import {
  createResult,
  getResultStudents,
  getResultSubjects,
} from "@/actions/resultActions";

import type {
  ResultStudentOption,
  ResultSubjectOption,
} from "@/actions/resultActions";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

export interface AddResultFormData {
  studentId: string;
  subjectId: string;
  examName: string;

  totalMarks: string;
  obtainedMarks: string;

  examDate: string;
  remarks: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/* -------------------------------------------------------------------------- */
/* INITIAL STATE                                                              */
/* -------------------------------------------------------------------------- */

const initialForm: AddResultFormData = {
  studentId: "",
  subjectId: "",
  examName: "",

  totalMarks: "",
  obtainedMarks: "",

  examDate:
    new Date()
      .toISOString()
      .split("T")[0],

  remarks: "",
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function AddResultModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] =
    useState<AddResultFormData>(
      initialForm
    );

  const [students, setStudents] =
    useState<ResultStudentOption[]>(
      []
    );

  const [subjects, setSubjects] =
    useState<ResultSubjectOption[]>(
      []
    );

  const [loadingOptions, setLoadingOptions] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* ------------------------------------------------------------------------ */
  /* LOAD OPTIONS                                                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    async function loadOptions() {
      try {
        setLoadingOptions(true);
        setError("");
        setSuccess("");

        const [
          studentsData,
          subjectsData,
        ] = await Promise.all([
          getResultStudents(),
          getResultSubjects(),
        ]);

        if (cancelled) {
          return;
        }

        setStudents(
          Array.isArray(
            studentsData
          )
            ? studentsData
            : []
        );

        setSubjects(
          Array.isArray(
            subjectsData
          )
            ? subjectsData
            : []
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load result options:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load students and subjects."
        );
      } finally {
        if (!cancelled) {
          setLoadingOptions(false);
        }
      }
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [open]);

  /* ------------------------------------------------------------------------ */
  /* RESET                                                                     */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,

        examDate:
          new Date()
            .toISOString()
            .split("T")[0],
      });

      setError("");
      setSuccess("");
    }
  }, [open]);

  /* ------------------------------------------------------------------------ */
  /* SELECTED STUDENT                                                         */
  /* ------------------------------------------------------------------------ */

  const selectedStudent =
    useMemo(() => {
      return students.find(
        (student) =>
          student.id ===
          form.studentId
      );
    }, [
      students,
      form.studentId,
    ]);

  /* ------------------------------------------------------------------------ */
  /* SUBJECTS FOR SELECTED CLASS                                              */
  /* ------------------------------------------------------------------------ */

  const availableSubjects =
    useMemo(() => {
      if (!selectedStudent) {
        return subjects;
      }

      const classSubjects =
        subjects.filter(
          (subject) =>
            subject.className ===
            selectedStudent.className
        );

      /*
       * If no subject matches the student's class,
       * keep all active subjects available.
       */
      return classSubjects.length > 0
        ? classSubjects
        : subjects;
    }, [
      subjects,
      selectedStudent,
    ]);

  /* ------------------------------------------------------------------------ */
  /* UPDATE FIELD                                                             */
  /* ------------------------------------------------------------------------ */

  function updateField(
    key: keyof AddResultFormData,
    value: string
  ) {
    setForm(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );

    setError("");
    setSuccess("");
  }

  /* ------------------------------------------------------------------------ */
  /* STUDENT CHANGE                                                           */
  /* ------------------------------------------------------------------------ */

  function handleStudentChange(
    studentId: string
  ) {
    setForm(
      (previous) => ({
        ...previous,

        studentId,

        /*
         * Reset subject when student changes
         * because subject list can depend on class.
         */
        subjectId: "",
      })
    );

    setError("");
  }

  /* ------------------------------------------------------------------------ */
  /* VALIDATE                                                                 */
  /* ------------------------------------------------------------------------ */

  function validate(): string | null {
    if (!form.studentId) {
      return "Please select a student.";
    }

    if (!form.subjectId) {
      return "Please select a subject.";
    }

    if (!form.examName.trim()) {
      return "Please enter the exam name.";
    }

    const totalMarks =
      Number(
        form.totalMarks
      );

    const obtainedMarks =
      Number(
        form.obtainedMarks
      );

    if (
      !Number.isFinite(
        totalMarks
      ) ||
      totalMarks <= 0
    ) {
      return "Total marks must be greater than zero.";
    }

    if (
      !Number.isFinite(
        obtainedMarks
      ) ||
      obtainedMarks < 0
    ) {
      return "Obtained marks cannot be negative.";
    }

    if (
      obtainedMarks >
      totalMarks
    ) {
      return "Obtained marks cannot be greater than total marks.";
    }

    return null;
  }

  /* ------------------------------------------------------------------------ */
  /* SUBMIT                                                                   */
  /* ------------------------------------------------------------------------ */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validationError =
      validate();

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await createResult({
        studentId:
          form.studentId,

        subjectId:
          form.subjectId,

        examName:
          form.examName.trim(),

        totalMarks:
          Number(
            form.totalMarks
          ),

        obtainedMarks:
          Number(
            form.obtainedMarks
          ),

        examDate:
          form.examDate ||
          null,

        remarks:
          form.remarks.trim() ||
          undefined,
      });

      setSuccess(
        "Result added successfully."
      );

      /*
       * Give the success state a tiny moment
       * so the user can see confirmation.
       */
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 500);
    } catch (error) {
      console.error(
        "Failed to create result:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to save result."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* CLOSED                                                                   */
  /* ------------------------------------------------------------------------ */

  if (!open) {
    return null;
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!saving) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-[28px]
          border border-white/[0.08]
          bg-[#071121]
          shadow-[0_30px_100px_rgba(0,0,0,0.55)]
        "
      >
        {/* ------------------------------------------------------------------ */}
        {/* HEADER                                                             */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            flex items-center justify-between
            border-b border-white/[0.07]
            px-6 py-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-2xl
                border border-blue-500/20
                bg-blue-500/10
              "
            >
              <Plus
                size={20}
                className="text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Add Result
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Add a student's academic result
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-white/[0.05]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BODY                                                               */}
        {/* ------------------------------------------------------------------ */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto"
        >
          <div className="space-y-5 p-6">

            {/* ERROR */}
            {error && (
              <div
                className="
                  flex items-start gap-3
                  rounded-2xl
                  border border-red-500/20
                  bg-red-500/10
                  px-4 py-3
                "
              >
                <AlertCircle
                  size={17}
                  className="
                    mt-0.5
                    shrink-0
                    text-red-400
                  "
                />

                <p className="text-sm text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div
                className="
                  flex items-center gap-3
                  rounded-2xl
                  border border-emerald-500/20
                  bg-emerald-500/10
                  px-4 py-3
                "
              >
                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />

                <p className="text-sm text-emerald-300">
                  {success}
                </p>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* STUDENT                                                          */}
            {/* ---------------------------------------------------------------- */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs font-medium
                  text-slate-400
                "
              >
                Student
              </label>

              <div className="relative">
                <UserRound
                  size={16}
                  className="
                    pointer-events-none
                    absolute left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <select
                  value={
                    form.studentId
                  }
                  onChange={(event) =>
                    handleStudentChange(
                      event.target.value
                    )
                  }
                  disabled={
                    loadingOptions ||
                    saving
                  }
                  className="
                    h-12 w-full
                    appearance-none
                    rounded-xl
                    border border-white/[0.08]
                    bg-[#020817]
                    pl-10 pr-4
                    text-sm text-white
                    outline-none
                    transition
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <option value="">
                    {loadingOptions
                      ? "Loading students..."
                      : students.length ===
                        0
                      ? "No active students found"
                      : "Select Student"}
                  </option>

                  {students.map(
                    (student) => (
                      <option
                        key={
                          student.id
                        }
                        value={
                          student.id
                        }
                      >
                        {student.name} — Roll{" "}
                        {
                          student.rollNumber
                        } — Class{" "}
                        {
                          student.className
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              {selectedStudent && (
                <div
                  className="
                    mt-2
                    flex items-center gap-2
                    rounded-xl
                    border border-blue-500/10
                    bg-blue-500/5
                    px-3 py-2
                  "
                >
                  <GraduationCap
                    size={14}
                    className="text-blue-400"
                  />

                  <span className="text-xs text-slate-400">
                    {selectedStudent.name}
                  </span>

                  <span className="text-slate-700">
                    •
                  </span>

                  <span className="text-xs text-slate-500">
                    Class{" "}
                    {
                      selectedStudent.className
                    }
                  </span>
                </div>
              )}
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* SUBJECT                                                          */}
            {/* ---------------------------------------------------------------- */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs font-medium
                  text-slate-400
                "
              >
                Subject
              </label>

              <div className="relative">
                <BookOpen
                  size={16}
                  className="
                    pointer-events-none
                    absolute left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <select
                  value={
                    form.subjectId
                  }
                  onChange={(event) =>
                    updateField(
                      "subjectId",
                      event.target.value
                    )
                  }
                  disabled={
                    loadingOptions ||
                    saving
                  }
                  className="
                    h-12 w-full
                    appearance-none
                    rounded-xl
                    border border-white/[0.08]
                    bg-[#020817]
                    pl-10 pr-4
                    text-sm text-white
                    outline-none
                    transition
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <option value="">
                    {loadingOptions
                      ? "Loading subjects..."
                      : availableSubjects.length ===
                        0
                      ? "No active subjects found"
                      : "Select Subject"}
                  </option>

                  {availableSubjects.map(
                    (subject) => (
                      <option
                        key={
                          subject.id
                        }
                        value={
                          subject.id
                        }
                      >
                        {subject.name} (
                        {
                          subject.code
                        }
                        ) — Class{" "}
                        {
                          subject.className
                        }
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* EXAM                                                             */}
            {/* ---------------------------------------------------------------- */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs font-medium
                  text-slate-400
                "
              >
                Exam Name
              </label>

              <input
                value={
                  form.examName
                }
                onChange={(event) =>
                  updateField(
                    "examName",
                    event.target.value
                  )
                }
                disabled={saving}
                placeholder="e.g. Mid Term Examination"
                className="
                  h-12 w-full
                  rounded-xl
                  border border-white/[0.08]
                  bg-[#020817]
                  px-4
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-600
                  transition
                  focus:border-blue-500/40
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:opacity-60
                "
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* MARKS                                                            */}
            {/* ---------------------------------------------------------------- */}

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              "
            >
              <div>
                <label
                  className="
                    mb-2 block
                    text-xs font-medium
                    text-slate-400
                  "
                >
                  Total Marks
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    form.totalMarks
                  }
                  onChange={(event) =>
                    updateField(
                      "totalMarks",
                      event.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="100"
                  className="
                    h-12 w-full
                    rounded-xl
                    border border-white/[0.08]
                    bg-[#020817]
                    px-4
                    text-sm text-white
                    outline-none
                    placeholder:text-slate-600
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                    disabled:opacity-60
                  "
                />
              </div>

              <div>
                <label
                  className="
                    mb-2 block
                    text-xs font-medium
                    text-slate-400
                  "
                >
                  Obtained Marks
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.obtainedMarks
                  }
                  onChange={(event) =>
                    updateField(
                      "obtainedMarks",
                      event.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="85"
                  className="
                    h-12 w-full
                    rounded-xl
                    border border-white/[0.08]
                    bg-[#020817]
                    px-4
                    text-sm text-white
                    outline-none
                    placeholder:text-slate-600
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* DATE                                                             */}
            {/* ---------------------------------------------------------------- */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs font-medium
                  text-slate-400
                "
              >
                Exam Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="
                    pointer-events-none
                    absolute left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="date"
                  value={
                    form.examDate
                  }
                  onChange={(event) =>
                    updateField(
                      "examDate",
                      event.target.value
                    )
                  }
                  disabled={saving}
                  className="
                    h-12 w-full
                    rounded-xl
                    border border-white/[0.08]
                    bg-[#020817]
                    pl-10 pr-4
                    text-sm text-white
                    outline-none
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* REMARKS                                                          */}
            {/* ---------------------------------------------------------------- */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs font-medium
                  text-slate-400
                "
              >
                Remarks
                <span className="ml-1 text-slate-600">
                  (Optional)
                </span>
              </label>

              <textarea
                value={
                  form.remarks
                }
                onChange={(event) =>
                  updateField(
                    "remarks",
                    event.target.value
                  )
                }
                disabled={saving}
                rows={3}
                placeholder="Add any remarks..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-white/[0.08]
                  bg-[#020817]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-600
                  transition
                  focus:border-blue-500/40
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:opacity-60
                "
              />
            </div>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* FOOTER                                                            */}
          {/* ------------------------------------------------------------------ */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-3
              border-t border-white/[0.07]
              px-6 py-4
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                h-11
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.03]
                px-5
                text-sm font-medium
                text-slate-300
                transition
                hover:bg-white/[0.06]
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                loadingOptions
              }
              className="
                inline-flex
                h-11
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition
                hover:bg-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-50
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
                  <Plus size={16} />
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