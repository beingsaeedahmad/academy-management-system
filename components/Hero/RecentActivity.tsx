"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import {
  UserPlus,
  Wallet,
  CalendarCheck2,
  BookOpen,
  Activity,
} from "lucide-react";

import {
  getRecentActivity,
  type DashboardActivity,
  type ActivityType,
} from "@/actions/dashboardActions";
import { formatRelativeTime } from "@/lib/formatRelativeTime";

const activityConfig: Record<
  ActivityType,
  { icon: typeof UserPlus; color: string; bg: string }
> = {
  admission: {
    icon: UserPlus,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  fee: {
    icon: Wallet,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  attendance: {
    icon: CalendarCheck2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  note: {
    icon: BookOpen,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
};

function ActivitySkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/30 p-4"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-800/70" />
            <div className="h-3 w-20 rounded bg-slate-800/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<DashboardActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await getRecentActivity();
        setActivities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadActivity();
  }, []);

  return (
    <Card
      hover={false}
      title="Recent Activity"
      subtitle="Latest updates from your academy"
      icon={<Activity size={20} />}
    >
      {loading ? (
        <ActivitySkeleton />
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 py-12 text-center">
          <Activity size={32} className="text-slate-600" />
          <p className="mt-3 text-sm font-medium text-slate-400">
            No recent activity yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Admissions, fees, and attendance will appear here
          </p>
        </div>
      ) : (
        <div className="relative space-y-1">
          <div className="absolute bottom-4 left-5 top-4 w-px bg-slate-800" />

          {activities.map((activity, index) => {
            const config = activityConfig[activity.type];
            const Icon = config.icon;

            return (
              <Link
                key={activity.id}
                href={activity.href}
                className="group relative flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-slate-800/40"
              >
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 ${config.bg}`}
                >
                  <Icon className={config.color} size={18} />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-300">
                      {activity.title}
                    </h3>
                    <time className="shrink-0 text-xs text-slate-500">
                      {formatRelativeTime(activity.timestamp)}
                    </time>
                  </div>

                  <p className="mt-0.5 text-sm text-slate-400 line-clamp-2">
                    {activity.description}
                  </p>
                </div>

                {index < activities.length - 1 && (
                  <span className="sr-only">Activity item</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}
