"use client";

import {
  AlertOctagon,
  Database,
  LogOut,
  RotateCcw,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

interface DangerZoneProps {
  onResetSettings?: () => void;
  onClearData?: () => void;
  onLogout?: () => void;
}

export default function DangerZone({
  onResetSettings,
  onClearData,
  onLogout,
}: DangerZoneProps) {
  return (
    <SettingsSection
      title="Danger Zone"
      description="Sensitive actions that can affect your system configuration and data."
      icon={<TriangleAlert className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {/* Warning */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <AlertOctagon className="h-5 w-5 text-red-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-300">
                Proceed With Caution
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Actions in this section may permanently
                change or remove system information. Make
                sure you have a recent backup before
                performing any destructive action.
              </p>
            </div>
          </div>
        </div>

        {/* Reset Settings */}
        <DangerAction
          icon={<RotateCcw className="h-4 w-4" />}
          title="Reset Settings"
          description="Restore system settings to their default values. Your students, fees, attendance, and other database records will not be affected."
          buttonLabel="Reset Settings"
          onClick={onResetSettings}
          disabled={!onResetSettings}
        />

        {/* Clear Data */}
        <DangerAction
          icon={<Database className="h-4 w-4" />}
          title="Clear Application Data"
          description="Remove application data from the system. This action should only be performed when you are certain that the data is no longer required."
          buttonLabel="Clear Data"
          onClick={onClearData}
          disabled={!onClearData}
        />

        {/* Logout */}
        <DangerAction
          icon={<LogOut className="h-4 w-4" />}
          title="Sign Out"
          description="Sign out from your current administrator session and return to the login page."
          buttonLabel="Sign Out"
          onClick={onLogout}
          disabled={!onLogout}
        />

        {/* Permanent Delete */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <Trash2 className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-red-300">
                  Permanent Data Deletion
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Permanent deletion of academy records
                  requires additional verification and will
                  only be implemented through a protected
                  server-side operation.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400 opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete Everything
            </button>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-start gap-3">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

            <div>
              <p className="text-xs font-medium text-slate-300">
                Data protection notice
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Destructive database operations will never
                be performed directly from the client. Any
                future data deletion functionality will use
                authenticated server actions with explicit
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Danger Action                                                              */
/* -------------------------------------------------------------------------- */

interface DangerActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
  disabled?: boolean;
}

function DangerAction({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
  disabled = false,
}: DangerActionProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/5 text-red-400">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-medium text-slate-200">
            {title}
          </h3>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={[
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition",
          disabled
            ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600"
            : "border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10",
        ].join(" ")}
      >
        {icon}
        {buttonLabel}
      </button>
    </div>
  );
}