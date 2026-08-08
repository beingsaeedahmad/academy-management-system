"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  X,
  GraduationCap,
  FileText,
} from "lucide-react";

import {
  getSubjects,
  deleteSubject,
} from "@/actions/subjectActions";

import AddSubjectModal from "./AddSubjectModal";
import EditSubjectModal from "./EditSubjectModal";
import DeleteSubjectModal from "./DeleteSubjectModal";
import SubjectsTable from "./SubjectsTable";
import { Subject } from "./subjectTypes";

export default function SubjectsPage() {
  // =========================================================
  // STATE
  // =========================================================

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // =========================================================
  // LOAD SUBJECTS
  // =========================================================

  const loadSubjects = async () => {
    try {
      setLoading(true);

      const data = await getSubjects();

      setSubjects(data as Subject[]);
    } catch (error) {
      console.error("LOAD SUBJECTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // =========================================================
  // CLASS LIST
  // =========================================================

  const classes = useMemo(() => {
    return Array.from(
      new Set(
        subjects
          .map((subject) => subject.className)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [subjects]);

  // =========================================================
  // FILTER SUBJECTS
  // =========================================================

  const filteredSubjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return subjects.filter((subject) => {
      const matchesSearch =
        !query ||
        subject.name.toLowerCase().includes(query) ||
        subject.code.toLowerCase().includes(query) ||
        subject.chapter.toLowerCase().includes(query) ||
        subject.className.toLowerCase().includes(query) ||
        (subject.teacherName ?? "")
          .toLowerCase()
          .includes(query);

      const matchesClass =
        !classFilter ||
        subject.className === classFilter;

      return matchesSearch && matchesClass;
    });
  }, [subjects, search, classFilter]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalSubjects = subjects.length;

  const totalClasses = new Set(
    subjects.map((subject) => subject.className)
  ).size;

  const totalFiles = subjects.filter(
    (subject) => Boolean(subject.fileUrl)
  ).length;

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setEditOpen(true);
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = (subject: Subject) => {
    setSelectedSubject(subject);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedSubject) return;

    try {
      setDeleteLoading(true);

      await deleteSubject(selectedSubject.id);

      setDeleteOpen(false);
      setSelectedSubject(null);

      await loadSubjects();
    } catch (error) {
      console.error("DELETE SUBJECT ERROR:", error);

      alert("Failed to delete subject.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setClassFilter("");
  };

  const hasFilters =
    search.trim() !== "" || classFilter !== "";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen w-full bg-[#020817] px-5 py-6 text-white sm:px-6 lg:px-8">
      <div className="w-full">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT */}

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-600/10
                text-blue-400
                ring-1
                ring-blue-500/20
              "
            >
              <BookOpen size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Subjects
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage subjects, chapters and study files
              </p>
            </div>
          </div>

          {/* ADD BUTTON */}

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              self-start
              rounded-xl
              bg-blue-600
              px-5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-500
              active:scale-[0.98]
              sm:self-auto
            "
          >
            <Plus size={18} />
            Add Subject
          </button>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* TOTAL SUBJECTS */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-blue-500
              bg-[#0f172a]
              p-5
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              hover:shadow-blue-500/10
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total Subjects
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {totalSubjects}
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600/15
                  text-blue-400
                  ring-1
                  ring-blue-500/10
                "
              >
                <BookOpen size={24} strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* CLASSES */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-emerald-500/40
              bg-[#0f172a]
              p-5
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-emerald-500
              hover:shadow-lg
              hover:shadow-emerald-500/10
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Classes
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {totalClasses}
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-500/10
                  text-emerald-400
                  ring-1
                  ring-emerald-500/10
                "
              >
                <GraduationCap
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* FILES */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-violet-500/40
              bg-[#0f172a]
              p-5
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-violet-500
              hover:shadow-lg
              hover:shadow-violet-500/10
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Files Uploaded
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {totalFiles}
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-500/10
                  text-violet-400
                  ring-1
                  ring-violet-500/10
                "
              >
                <FileText
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SEARCH / FILTER
        ===================================================== */}

        <div
          className="
            mt-7
            w-full
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/60
            p-3
            sm:p-4
          "
        >
          <div className="flex w-full flex-col gap-3 lg:flex-row">
            {/* SEARCH */}

            <div className="relative min-w-0 flex-1">
              <Search
                size={19}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search subject, chapter, class or teacher..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#020817]
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* CLASS FILTER */}

            <select
              value={classFilter}
              onChange={(e) =>
                setClassFilter(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-700
                bg-[#020817]
                px-4
                text-sm
                text-white
                outline-none
                transition
                focus:border-blue-500
                lg:w-44
                lg:shrink-0
              "
            >
              <option value="">
                All Classes
              </option>

              {classes.map((className) => (
                <option
                  key={className}
                  value={className}
                >
                  {className}
                </option>
              ))}
            </select>

            {/* CLEAR */}

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  inline-flex
                  h-11
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-700
                  px-4
                  text-sm
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            SUBJECTS TABLE
        ===================================================== */}

        <div className="mt-5 w-full min-w-0">
          <SubjectsTable
            subjects={filteredSubjects}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

      </div>

      {/* =====================================================
          ADD SUBJECT MODAL
      ===================================================== */}

      <AddSubjectModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={async () => {
          await loadSubjects();
          setAddOpen(false);
        }}
      />

      {/* =====================================================
          EDIT SUBJECT MODAL
      ===================================================== */}

      <EditSubjectModal
        open={editOpen}
        subject={selectedSubject}
        onClose={() => {
          setEditOpen(false);
          setSelectedSubject(null);
        }}
        onUpdated={async () => {
          await loadSubjects();

          setEditOpen(false);
          setSelectedSubject(null);
        }}
      />

      {/* =====================================================
          DELETE SUBJECT MODAL
      ===================================================== */}

      <DeleteSubjectModal
        open={deleteOpen}
        loading={deleteLoading}
        subject={selectedSubject}
        onClose={() => {
          if (deleteLoading) return;

          setDeleteOpen(false);
          setSelectedSubject(null);
        }}
        onConfirm={confirmDelete}
      />
    </main>
  );
}