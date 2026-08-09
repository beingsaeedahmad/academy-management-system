"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  RefreshCw,
} from "lucide-react";

import {
  getReports,
  ReportsData,
} from "@/actions/reportActions";

import ReportsHeader from "./ReportsHeader";
import ReportsOverviewCards from "./ReportsOverviewCards";
import ReportsFilters from "./ReportsFilters";
import AttendanceReport from "./AttendanceReport";
import FeesReport from "./FeesReport";
import StudentsReport from "./StudentsReport";
import AcademicReport from "./AcademicReport";
import ReportTable from "./ReportTable";

const emptyReports: ReportsData = {
  summary: {
    totalStudents: 0,
    activeStudents: 0,
    attendanceRate: 0,
    feesCollected: 0,
    feesPending: 0,
  },

  attendance: {
    present: 0,
    absent: 0,
    leave: 0,
    holiday: 0,
    total: 0,
    attendanceRate: 0,
  },

  fees: {
    totalFees: 0,
    collected: 0,
    pending: 0,
    overdue: 0,
    collectionRate: 0,
  },

  students: {
    total: 0,
    active: 0,
    inactive: 0,
    newAdmissions: 0,
  },

  academic: {
    totalSubjects: 0,
    totalNotes: 0,
    totalClasses: 0,
  },

  recentStudents: [],
};

export default function ReportsPage() {
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("2026");

  const [reports, setReports] =
    useState<ReportsData>(emptyReports);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const data = await getReports({
        month,
        year,
      });

      setReports(data);
    } catch (error) {
      console.error("Failed to load reports:", error);

      setError(
        "Unable to load reports. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, [month, year]);

  const reportRows = useMemo(() => {
    return reports.recentStudents.map((student) => ({
      id: student.id,
      name: student.name,
      className: student.className,
      status: student.status,
      value: new Date(
        student.admissionDate
      ).toLocaleDateString("en-PK"),
    }));
  }, [reports.recentStudents]);

  function handleExport() {
    const report = {
      filters: {
        month,
        year,
      },
      data: reports,
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `academy-report-${year}-${month}.json`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#020817] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">

        <ReportsHeader
          onExport={handleExport}
        />

        <ReportsFilters
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />

        {error && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <span>{error}</span>

            <button
              onClick={loadReports}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition hover:bg-red-500/10"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                size={30}
                className="animate-spin text-blue-500"
              />

              <p className="text-sm text-slate-500">
                Loading reports...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <ReportsOverviewCards
                summary={reports.summary}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <AttendanceReport
                data={reports.attendance}
              />

              <FeesReport
                data={reports.fees}
              />

              <StudentsReport
                data={reports.students}
              />

              <AcademicReport
                data={reports.academic}
              />
            </div>

            <div className="mt-6">
              <ReportTable
                rows={reportRows}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}