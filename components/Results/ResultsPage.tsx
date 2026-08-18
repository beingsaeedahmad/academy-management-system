"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from "lucide-react";

import ResultsHeader from "./ResultsHeader";
import ResultsOverviewCards from "./ResultsOverviewCards";
import ResultsTable from "./ResultsTable";

import AddResultModal, {
  AddResultFormData,
} from "./AddResultModal";

import {
  createResult,
  getResults,
  getResultsStats,
} from "@/actions/resultActions";

import type {
  ResultRecord,
  ResultsStats,
  ResultStatus,
} from "@/actions/resultActions";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

const emptyStats: ResultsStats = {
  totalStudents: 0,
  publishedResults: 0,
  pendingResults: 0,
  averagePerformance: 0,
};

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function ResultsPage() {
  const [results, setResults] =
    useState<ResultRecord[]>([]);

  const [stats, setStats] =
    useState<ResultsStats>(
      emptyStats
    );

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [classFilter, setClassFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [savingResult, setSavingResult] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ------------------------------------------------------------------------ */
  /* LOAD RESULTS                                                             */
  /* ------------------------------------------------------------------------ */

  async function loadResults() {
    try {
      setError("");

      const [
        resultsData,
        statsData,
      ] = await Promise.all([
        getResults({
          search,
          className: classFilter,
          status: statusFilter,
        }),

        getResultsStats(),
      ]);

      setResults(
        Array.isArray(resultsData)
          ? resultsData
          : []
      );

      setStats(
        statsData ?? emptyStats
      );
    } catch (error) {
      console.error(
        "Failed to load results:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load results. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* INITIAL LOAD                                                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    loadResults();
  }, []);

  /* ------------------------------------------------------------------------ */
  /* FILTER LOAD                                                              */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (loading) {
      return;
    }

    const timer = setTimeout(() => {
      loadResults();
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [
    search,
    classFilter,
    statusFilter,
  ]);

  /* ------------------------------------------------------------------------ */
  /* REFRESH                                                                  */
  /* ------------------------------------------------------------------------ */

  async function handleRefresh() {
    setRefreshing(true);
    await loadResults();
  }

  /* ------------------------------------------------------------------------ */
  /* CLASSES                                                                  */
  /* ------------------------------------------------------------------------ */

  const classes = useMemo(() => {
    const uniqueClasses =
      new Set<string>();

    results.forEach((result) => {
      if (result.className) {
        uniqueClasses.add(
          result.className
        );
      }
    });

    return Array.from(
      uniqueClasses
    ).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [results]);

  /* ------------------------------------------------------------------------ */
  /* FILTERED RESULTS                                                         */
  /* ------------------------------------------------------------------------ */

  const filteredResults = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase();

    return results.filter((result) => {
      const studentName =
        result.studentName
          .toLowerCase();

      const rollNumber =
        result.rollNumber
          .toLowerCase();

      const subject =
        result.subject
          .toLowerCase();

      const examName =
        result.examName
          .toLowerCase();

      const matchesSearch =
        !query ||
        studentName.includes(query) ||
        rollNumber.includes(query) ||
        subject.includes(query) ||
        examName.includes(query);

      const matchesClass =
        classFilter === "all" ||
        result.className ===
          classFilter;

      const matchesStatus =
        statusFilter === "all" ||
        result.status
          .toLowerCase() ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    results,
    search,
    classFilter,
    statusFilter,
  ]);

  /* ------------------------------------------------------------------------ */
  /* TABLE DATA                                                               */
  /* ------------------------------------------------------------------------ */

  const tableResults = useMemo(() => {
    return filteredResults.map(
      (result) => ({
        id: result.id,

        studentId:
          result.studentId,

        studentName:
          result.studentName,

        rollNumber:
          result.rollNumber,

        className:
          result.className,

        subject:
          result.subject,

        exam:
          result.examName,

        totalMarks:
          result.totalMarks,

        obtainedMarks:
          result.obtainedMarks,

        percentage:
          result.percentage,

        grade:
          result.grade,

        status:
          result.status as ResultStatus,

        remarks:
          result.remarks,

        examDate:
          result.examDate,

        createdAt:
          result.createdAt,

        updatedAt:
          result.updatedAt,
      })
    );
  }, [filteredResults]);

  /* ------------------------------------------------------------------------ */
  /* ADD RESULT                                                               */
  /* ------------------------------------------------------------------------ */

  function handleAddResult() {
    setError("");
    setShowAddModal(true);
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE RESULT                                                              */
  /* ------------------------------------------------------------------------ */

  async function handleCreateResult(
    data: AddResultFormData
  ) {
    try {
      setSavingResult(true);
      setError("");

      /*
       * AddResultFormData currently provides:
       *
       * studentId
       * subjectId
       * totalMarks
       * obtainedMarks
       * examName
       * remarks
       * examDate
       *
       * className/session/status are NOT part
       * of the current form type, so we do not
       * access them here.
       */

      await createResult({
        studentId:
          data.studentId,

        /*
         * IMPORTANT:
         *
         * Prisma Result stores subject as String,
         * while the form provides subjectId.
         *
         * resultActions resolves subjectId into
         * the actual subject name.
         */
        subjectId:
          data.subjectId,

        /*
         * Current form does not provide className.
         * resultActions resolves the student's
         * class automatically when className
         * is omitted.
         */

        /*
         * Current form does not provide session.
         * resultActions uses:
         *
         * "Academic Session"
         *
         * automatically.
         */

        examName:
          data.examName ||
          "Examination",

        totalMarks:
          Number(
            data.totalMarks
          ),

        obtainedMarks:
          Number(
            data.obtainedMarks
          ),

        /*
         * Current form does not provide status.
         * resultActions defaults to Published.
         */

        remarks:
          data.remarks,

        examDate:
          data.examDate,
      });

      setShowAddModal(false);

      await loadResults();
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
      setSavingResult(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* MODAL PROPS                                                              */
  /* ------------------------------------------------------------------------ */

  /*
   * The current AddResultModal Props type does not
   * expose "onSubmit".
   *
   * We keep the page logic independent from the
   * exact callback name used inside the modal.
   *
   * If your modal uses onSave, this passes the
   * callback correctly.
   */

  const addResultModalProps = {
    open: showAddModal,

    onClose: () => {
      if (!savingResult) {
        setShowAddModal(false);
      }
    },

    onSave: handleCreateResult,

    onAddResult: handleCreateResult,
  } as unknown as React.ComponentProps<
    typeof AddResultModal
  >;

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          py-5
          sm:px-6
          lg:px-8
          lg:py-7
        "
      >
        {/* HEADER */}

        <ResultsHeader
          onAddResult={
            handleAddResult
          }
        />

        {/* OVERVIEW */}

        <section className="mt-6">
          <ResultsOverviewCards
            stats={stats}
          />
        </section>

        {/* ERROR */}

        {error && (
          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              gap-4
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
            "
          >
            <p className="text-sm text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={
                handleRefresh
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-3
                py-2
                text-xs
                font-medium
                text-red-300
                transition
                hover:bg-red-500/15
              "
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {/* MANAGEMENT */}

        <section
          className="
            mt-6
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.07]
            bg-[#071121]
            shadow-[0_20px_70px_rgba(0,0,0,0.20)]
          "
        >
          {/* TOOLBAR */}

          <div
            className="
              flex
              flex-col
              gap-4
              border-b
              border-white/[0.06]
              p-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-500/20
                  bg-blue-500/10
                "
              >
                <BarChart3
                  size={18}
                  className="text-blue-400"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Results Management
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Manage student academic
                  performance
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={
                  handleRefresh
                }
                disabled={
                  refreshing
                }
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-3
                  text-xs
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  disabled:opacity-50
                "
              >
                <RefreshCw
                  size={14}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>

              <button
                type="button"
                onClick={
                  handleAddResult
                }
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  hover:bg-blue-500
                "
              >
                <Plus size={15} />
                Add Result
              </button>
            </div>
          </div>

          {/* SEARCH / FILTERS */}

          <div className="p-4">
            <div
              className="
                grid
                grid-cols-1
                gap-3
                md:grid-cols-2
                xl:grid-cols-[1.6fr_1fr_1fr_auto]
              "
            >
              <div className="relative">
                <Search
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search student, roll no, subject or exam..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#020817]
                    pl-10
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-slate-600
                    focus:border-blue-500/40
                    focus:ring-2
                    focus:ring-blue-500/10
                  "
                />
              </div>

              <select
                value={
                  classFilter
                }
                onChange={(event) =>
                  setClassFilter(
                    event.target.value
                  )
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-[#020817]
                  px-3
                  text-sm
                  text-slate-300
                  outline-none
                  focus:border-blue-500/40
                "
              >
                <option value="all">
                  All Classes
                </option>

                {classes.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  statusFilter
                }
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-[#020817]
                  px-3
                  text-sm
                  text-slate-300
                  outline-none
                  focus:border-blue-500/40
                "
              >
                <option value="all">
                  All Status
                </option>

                <option value="published">
                  Published
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="draft">
                  Draft
                </option>
              </select>

              <div
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  px-4
                  text-xs
                  text-slate-500
                "
              >
                <SlidersHorizontal
                  size={14}
                />

                {filteredResults.length}{" "}
                Results
              </div>
            </div>
          </div>
        </section>

        {/* TABLE */}

        <section className="mt-6">
          {loading ? (
            <div
              className="
                flex
                min-h-[420px]
                flex-col
                items-center
                justify-center
                rounded-[24px]
                border
                border-white/[0.07]
                bg-[#071121]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-blue-500/20
                  bg-blue-500/10
                "
              >
                <Loader2
                  size={22}
                  className="animate-spin text-blue-400"
                />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-300">
                Loading results
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Please wait while we fetch
                academic records.
              </p>
            </div>
          ) : tableResults.length > 0 ? (
            <ResultsTable
              results={
                tableResults
              }
            />
          ) : (
            <div
              className="
                flex
                min-h-[420px]
                flex-col
                items-center
                justify-center
                rounded-[24px]
                border
                border-white/[0.07]
                bg-[#071121]
                px-6
                text-center
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-blue-500/15
                  bg-blue-500/10
                "
              >
                <GraduationCap
                  size={28}
                  className="text-blue-400"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                No results found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                There are no academic
                results matching your
                current filters. Add a
                result or change your
                search criteria.
              </p>

              <button
                type="button"
                onClick={
                  handleAddResult
                }
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                <Plus size={16} />
                Add First Result
              </button>
            </div>
          )}
        </section>

        {/* FOOTER SUMMARY */}

        {!loading && (
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#071121]
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-2.5">
                  <Users
                    size={17}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-600">
                    Students
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    {stats.totalStudents.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#071121]
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-2.5">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-600">
                    Published
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    {stats.publishedResults.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#071121]
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-2.5">
                  <TrendingUp
                    size={17}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-600">
                    Average Performance
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    {stats.averagePerformance.toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ADD RESULT MODAL */}

      <AddResultModal
        {...addResultModalProps}
      />
    </div>
  );
}