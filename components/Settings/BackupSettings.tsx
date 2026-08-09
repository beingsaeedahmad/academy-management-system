"use client";

import { useState } from "react";
import {
  Archive,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  FileArchive,
  HardDrive,
  History,
  RefreshCw,
  Save,
  ShieldCheck,
  Upload,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
    BackupFrequency,
    BackupRetention,
    BackupSettings as BackupSettingsType,
  } from "./settingsTypes";

interface BackupSettingsProps {
  settings: BackupSettingsType;
  onChange: <K extends keyof BackupSettingsType>(
    field: K,
    value: BackupSettingsType[K]
  ) => void;
  onSave?: () => void;
  saving?: boolean;
}

export default function BackupSettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: BackupSettingsProps) {
  const [backupLoading, setBackupLoading] =
    useState(false);

  const [backupMessage, setBackupMessage] =
    useState("");

  const handleBackup = async () => {
    setBackupLoading(true);
    setBackupMessage("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      setBackupMessage(
        "Backup request completed successfully."
      );
    } finally {
      setBackupLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Backup & Data"
      description="Manage database backups and protect your academy data."
      icon={<Database className="h-5 w-5" />}
      action={
        onSave ? (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.18)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        ) : undefined
      }
    >
      <div className="space-y-5">
        {/* Backup Overview */}
        <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-600/[0.04] p-5">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Your data is protected
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Create regular backups of your academy
                  database to keep important student,
                  attendance, fee, and academic records safe.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBackup}
              disabled={backupLoading}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-500/20 bg-blue-600/10 px-4 text-xs font-semibold text-blue-400 transition hover:bg-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={[
                  "h-4 w-4",
                  backupLoading
                    ? "animate-spin"
                    : "",
                ].join(" ")}
              />

              {backupLoading
                ? "Creating Backup..."
                : "Create Backup"}
            </button>
          </div>

          {backupMessage && (
            <div className="relative mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.04] px-3 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />

              <span className="text-[10px] font-medium text-emerald-400">
                {backupMessage}
              </span>
            </div>
          )}
        </div>

        {/* Automatic Backup */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <Cloud className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Automatic Backups
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Automatically create database backups on
                  a regular schedule.
                </p>
              </div>
            </div>

            <Toggle
              checked={settings.automaticBackup}
              onChange={(value) =>
                onChange(
                  "automaticBackup",
                  value
                )
              }
            />
          </div>

          {settings.automaticBackup && (
            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/5 pt-5 sm:grid-cols-2">
              <SelectField
                label="Backup Frequency"
                value={settings.frequency}
                onChange={(value) =>
                    onChange("frequency", value as BackupFrequency)
                  }
                options={[
                  {
                    value: "Daily",
                    label: "Daily",
                  },
                  {
                    value: "Weekly",
                    label: "Weekly",
                  },
                  {
                    value: "Monthly",
                    label: "Monthly",
                  },
                ]}
              />

              <SelectField
                label="Retention Period"
                value={settings.retention}
                onChange={(value) =>
                    onChange("retention", value as BackupRetention)
                  }
                options={[
                  {
                    value: "7 days",
                    label: "7 days",
                  },
                  {
                    value: "30 days",
                    label: "30 days",
                  },
                  {
                    value: "90 days",
                    label: "90 days",
                  },
                  {
                    value: "1 year",
                    label: "1 year",
                  },
                ]}
              />
            </div>
          )}
        </div>

        {/* Storage */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <HardDrive className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Backup Storage
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Current backup storage information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StorageCard
              icon={
                <Database className="h-4 w-4" />
              }
              label="Database"
              value="PostgreSQL"
            />

            <StorageCard
              icon={
                <FileArchive className="h-4 w-4" />
              }
              label="Backup Format"
              value="Database Archive"
            />

            <StorageCard
              icon={
                <Archive className="h-4 w-4" />
              }
              label="Storage"
              value="Configured"
            />
          </div>
        </div>

        {/* Backup History */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <History className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Backup History
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Recent backup activity.
                </p>
              </div>
            </div>

            <span className="rounded-full border border-emerald-500/15 bg-emerald-500/5 px-2.5 py-1 text-[9px] font-semibold text-emerald-400">
              Protected
            </span>
          </div>

          <div className="space-y-2">
            <HistoryRow
              date={settings.lastBackupDate || "Not available"}
              size="Database backup"
              status="Completed"
            />

            <HistoryRow
              date="No previous backup"
              size="—"
              status="Waiting"
              waiting
            />
          </div>
        </div>

        {/* Import / Export */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ActionCard
            icon={
              <Download className="h-5 w-5" />
            }
            title="Export Data"
            description="Export academy records for safe offline storage."
            buttonText="Export"
            onClick={() => {}}
          />

          <ActionCard
            icon={<Upload className="h-5 w-5" />}
            title="Import Backup"
            description="Restore supported academy data from a backup."
            buttonText="Choose Backup"
            onClick={() => {}}
          />
        </div>

        {/* Warning */}
        <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] px-4 py-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

            <div>
              <p className="text-xs font-semibold text-amber-300">
                Backup recommendation
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-600">
                Keep automatic backups enabled and regularly
                verify that your backups can be restored before
                relying on them for recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Toggle                                                                     */
/* -------------------------------------------------------------------------- */

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative h-6 w-11 shrink-0 rounded-full border transition-all duration-200",
        checked
          ? "border-blue-500/40 bg-blue-600"
          : "border-white/10 bg-slate-800",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200",
          checked
            ? "left-[22px]"
            : "left-[3px]",
        ].join(" ")}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Select Field                                                               */
/* -------------------------------------------------------------------------- */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-300 outline-none transition hover:border-white/15 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Storage Card                                                               */
/* -------------------------------------------------------------------------- */

function StorageCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}

        <span className="text-[9px] uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs font-semibold text-slate-300">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* History Row                                                                */
/* -------------------------------------------------------------------------- */

function HistoryRow({
  date,
  size,
  status,
  waiting = false,
}: {
  date: string;
  size: string;
  status: string;
  waiting?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={[
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            waiting
              ? "bg-slate-500/10 text-slate-600"
              : "bg-emerald-500/10 text-emerald-400",
          ].join(" ")}
        >
          {waiting ? (
            <History className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-slate-300">
            {date}
          </p>

          <p className="mt-0.5 text-[9px] text-slate-600">
            {size}
          </p>
        </div>
      </div>

      <span
        className={[
          "shrink-0 text-[9px] font-semibold",
          waiting
            ? "text-slate-600"
            : "text-emerald-400",
        ].join(" ")}
      >
        {status}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Action Card                                                                */
/* -------------------------------------------------------------------------- */

function ActionCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-slate-600">
            {description}
          </p>

          <button
            type="button"
            onClick={onClick}
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[10px] font-semibold text-slate-400 transition hover:border-blue-500/20 hover:bg-blue-600/10 hover:text-blue-400"
          >
            {icon}
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}