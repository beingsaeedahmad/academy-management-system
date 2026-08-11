"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { getAnalyticsData } from "@/actions/analyticsActions";

import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsOverviewCards from "./AnalyticsOverviewCards";
import AnalyticsCharts from "./AnalyticsCharts";
import AcademyPerformance from "./AcademyPerformance";

type AnalyticsData = Awaited<
  ReturnType<typeof getAnalyticsData>
>;

function AnalyticsSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Overview Cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              h-36
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/40
            "
          />
        ))}
      </div>

      {/* Charts */}

      <div className="grid gap-5 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              h-80
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/40
            "
          />
        ))}
      </div>

      {/* Performance */}

      <div
        className="
          h-72
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/40
        "
      />
    </div>
  );
}

function AnalyticsError({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div
      className="
        flex
        min-h-[360px]
        items-center
        justify-center
        rounded-2xl
        border
        border-red-500/10
        bg-slate-900/40
        p-6
      "
    >
      <div className="max-w-md text-center">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-red-500/10
          "
        >
          <RefreshCw
            size={20}
            className="text-red-400"
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-white">
          Unable to load analytics
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Something went wrong while loading academy
          analytics. Please try again.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-2.5
            text-xs
            font-medium
            text-slate-300
            transition
            hover:bg-slate-700
            hover:text-white
          "
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const loadAnalytics = useCallback(
    async () => {
      try {
        setLoading(true);
        setError(false);

        const analytics =
          await getAnalyticsData();

        setData(analytics);
      } catch (err) {
        console.error(
          "Analytics loading error:",
          err
        );

        setError(true);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <main
      className="
        min-h-screen
        bg-[#020817]
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <AnalyticsHeader
          onRefresh={loadAnalytics}
          loading={loading}
        />

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && <AnalyticsSkeleton />}

        {/* =====================================================
            ERROR
        ====================================================== */}

        {!loading && error && (
          <AnalyticsError
            onRetry={loadAnalytics}
          />
        )}

        {/* =====================================================
            CONTENT
        ====================================================== */}

        {!loading &&
          !error &&
          data && (
            <div className="space-y-5">

              {/* =================================================
                  OVERVIEW CARDS
              ================================================== */}

              <AnalyticsOverviewCards
                overview={{
                  ...data.overview,

                  /*
                   * New Analytics Cards
                   *
                   * All four values are coming directly
                   * from the overview object returned by
                   * analyticsActions.ts.
                   */

                  totalFees:
                    data.overview.totalFees,

                  presentAttendance:
                    data.overview.presentAttendance,

                  absentAttendance:
                    data.overview.absentAttendance,

                  feeDefaulters:
                    data.overview.feeDefaulters,
                }}
              />

              {/* =================================================
                  CHARTS
              ================================================== */}

              <AnalyticsCharts
                monthlyFees={
                  data.monthlyFees
                }

                monthlyAttendance={
                  data.monthlyAttendance
                }

                classDistribution={
                  data.classDistribution
                }

                averageResult={
                  data.results
                    .averagePercentage
                }
              />

              {/* =================================================
                  ACADEMY PERFORMANCE
              ================================================== */}

              <AcademyPerformance
                students={
                  data.students
                }

                attendance={
                  data.attendance
                }

                fees={
                  data.fees
                }

                results={
                  data.results
                }
              />
            </div>
          )}
      </div>
    </main>
  );
}