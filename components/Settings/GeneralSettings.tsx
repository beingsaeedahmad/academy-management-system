"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Globe2,
  Languages,
  Save,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
  GeneralSettings as GeneralSettingsType,
} from "./settingsTypes";

interface GeneralSettingsProps {
  settings: GeneralSettingsType;
  onChange: (
    field: keyof GeneralSettingsType,
    value: string
  ) => void;
  onSave?: () => void;
  saving?: boolean;
}

export default function GeneralSettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: GeneralSettingsProps) {
  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Karachi",
    }
  );

  const formattedTime = currentTime.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi",
    }
  );

  return (
    <SettingsSection
      title="General Settings"
      description="Configure general preferences for your academy management system."
      icon={<Globe2 className="h-5 w-5" />}
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
        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {/* Language */}
          <GeneralSelectCard
            icon={<Languages className="h-5 w-5" />}
            title="Language"
            description="Select the default system language."
            value={settings.language}
            onChange={(value) =>
              onChange("language", value)
            }
            options={[
              {
                value: "English",
                label: "English",
              },
              {
                value: "Urdu",
                label: "Urdu",
              },
            ]}
          />

          {/* Timezone */}
          <GeneralSelectCard
            icon={<Globe2 className="h-5 w-5" />}
            title="Timezone"
            description="Set the timezone used by the system."
            value={settings.timezone}
            onChange={(value) =>
              onChange("timezone", value)
            }
            options={[
              {
                value: "Asia/Karachi (PKT)",
                label: "Asia/Karachi (PKT)",
              },
              {
                value: "Asia/Dubai (GST)",
                label: "Asia/Dubai (GST)",
              },
              {
                value: "Asia/Kolkata (IST)",
                label: "Asia/Kolkata (IST)",
              },
              {
                value: "UTC",
                label: "UTC",
              },
            ]}
          />

          {/* Date Format */}
          <GeneralSelectCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="Date Format"
            description="Choose how dates appear throughout the system."
            value={settings.dateFormat}
            onChange={(value) =>
              onChange("dateFormat", value)
            }
            options={[
              {
                value: "DD/MM/YYYY",
                label: "DD/MM/YYYY",
              },
              {
                value: "MM/DD/YYYY",
                label: "MM/DD/YYYY",
              },
              {
                value: "YYYY-MM-DD",
                label: "YYYY-MM-DD",
              },
            ]}
          />

          {/* Currency */}
          <GeneralSelectCard
            icon={
              <span className="text-sm font-bold">
                Rs
              </span>
            }
            title="Currency"
            description="Select the currency used for fees and financial records."
            value={settings.currency}
            onChange={(value) =>
              onChange("currency", value)
            }
            options={[
              {
                value: "PKR — Pakistani Rupee",
                label: "PKR — Pakistani Rupee",
              },
              {
                value: "USD — US Dollar",
                label: "USD — US Dollar",
              },
              {
                value: "AED — UAE Dirham",
                label: "AED — UAE Dirham",
              },
              {
                value: "GBP — British Pound",
                label: "GBP — British Pound",
              },
            ]}
          />
        </div>

        {/* System Time */}
        <div className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-blue-600/[0.04] p-5 shadow-[0_0_35px_rgba(37,99,235,0.06)]">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center">
            {/* Description */}
            <div className="flex min-w-0 flex-1 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-400">
                  System Time
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  The selected timezone will be used when
                  displaying attendance, fee payments,
                  admissions, reports, and other date-based
                  records.
                </p>
              </div>
            </div>

            {/* Time Details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:min-w-[560px]">
              <TimeInfo
                icon={
                  <CalendarDays className="h-4 w-4" />
                }
                label="Date"
                value={formattedDate}
              />

              <TimeInfo
                icon={<Clock3 className="h-4 w-4" />}
                label="Time"
                value={formattedTime}
              />

              <TimeInfo
                icon={<Globe2 className="h-4 w-4" />}
                label="Timezone"
                value={settings.timezone}
              />
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Select Card                                                                */
/* -------------------------------------------------------------------------- */

interface SelectOption {
  value: string;
  label: string;
}

interface GeneralSelectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

function GeneralSelectCard({
  icon,
  title,
  description,
  value,
  onChange,
  options,
}: GeneralSelectCardProps) {
  return (
    <div className="group rounded-xl border border-white/10 bg-slate-950/40 p-5 transition duration-200 hover:border-blue-500/20 hover:bg-slate-950/60">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-400 transition group-hover:bg-blue-600/15">
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-200">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>

          {/* Select */}
          <div className="relative mt-4">
            <select
              value={value}
              onChange={(event) =>
                onChange(event.target.value)
              }
              className="h-11 w-full appearance-none rounded-lg border border-white/10 bg-slate-950/80 px-3 pr-10 text-sm font-medium text-slate-200 outline-none transition hover:border-white/15 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
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

            {/* Chevron */}
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Time Information                                                           */
/* -------------------------------------------------------------------------- */

interface TimeInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function TimeInfo({
  icon,
  label,
  value,
}: TimeInfoProps) {
  return (
    <div className="border-l border-blue-500/10 pl-4 first:border-l-0">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="text-blue-400">
          {icon}
        </span>

        <span className="text-[11px] font-medium">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}