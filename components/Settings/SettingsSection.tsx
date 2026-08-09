"use client";

import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}

export default function SettingsSection({
  title,
  description,
  icon,
  action,
  children,
}: SettingsSectionProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl shadow-black/10">
      {/* Section Header */}
      <div className="border-b border-white/5 bg-white/[0.015] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            {icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-600/10 text-blue-400">
                {icon}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight text-white">
                {title}
              </h2>

              {description && (
                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  {description}
                </p>
              )}
            </div>
          </div>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className="p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}