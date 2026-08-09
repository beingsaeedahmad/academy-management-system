"use client";

import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Save,
  School,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
  AcademySettings as AcademySettingsType,
} from "./settingsTypes";

interface AcademySettingsProps {
  settings: AcademySettingsType;
  onChange: (
    field: keyof AcademySettingsType,
    value: string
  ) => void;
  onSave?: () => void;
  saving?: boolean;
}

export default function AcademySettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: AcademySettingsProps) {
  return (
    <SettingsSection
      title="Academy Information"
      description="Manage the basic information and contact details of your academy."
      icon={<Building2 className="h-5 w-5" />}
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
        {/* Academy Overview */}
        <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-600/[0.04] p-5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-600/10 text-blue-400">
              <School className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-white">
                {settings.name || "Your Academy"}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Academy profile and organization details
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Basic Information
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Enter the official information of your academy.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Academy Name"
              value={settings.name}
              placeholder="Saeed Educational Academy"
              icon={<Building2 className="h-4 w-4" />}
              className="md:col-span-2"
              onChange={(value) =>
                onChange("name", value)
              }
            />

            <InputField
              label="Phone Number"
              value={settings.phone}
              placeholder="+92 300 0000000"
              icon={<Phone className="h-4 w-4" />}
              type="tel"
              onChange={(value) =>
                onChange("phone", value)
              }
            />

            <InputField
              label="Email Address"
              value={settings.email}
              placeholder="info@academy.com"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              onChange={(value) =>
                onChange("email", value)
              }
            />

            <InputField
              label="Website"
              value={settings.website}
              placeholder="https://academy.com"
              icon={<Globe2 className="h-4 w-4" />}
              type="url"
              onChange={(value) =>
                onChange("website", value)
              }
            />

            <InputField
              label="Established Year"
              value={settings.establishedYear}
              placeholder="2020"
              icon={<School className="h-4 w-4" />}
              onChange={(value) =>
                onChange(
                  "establishedYear",
                  value
                )
              }
            />
          </div>
        </div>

        {/* Location */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Location
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Set the academy's official location.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Address"
              value={settings.address}
              placeholder="Enter academy address"
              icon={<MapPin className="h-4 w-4" />}
              className="md:col-span-2"
              onChange={(value) =>
                onChange("address", value)
              }
            />

            <InputField
              label="City"
              value={settings.city}
              placeholder="Multan"
              icon={<MapPin className="h-4 w-4" />}
              onChange={(value) =>
                onChange("city", value)
              }
            />

            <InputField
              label="Country"
              value={settings.country}
              placeholder="Pakistan"
              icon={<Globe2 className="h-4 w-4" />}
              onChange={(value) =>
                onChange("country", value)
              }
            />
          </div>
        </div>

        {/* Contact Preview */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">
              Contact Preview
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              This information can be displayed across
              academy documents and system pages.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PreviewCard
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={settings.phone || "Not provided"}
            />

            <PreviewCard
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={settings.email || "Not provided"}
            />

            <PreviewCard
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={
                settings.city ||
                settings.country ||
                "Not provided"
              }
            />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Input Field                                                                */
/* -------------------------------------------------------------------------- */

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  icon: React.ReactNode;
  type?: string;
  className?: string;
  onChange: (value: string) => void;
}

function InputField({
  label,
  value,
  placeholder,
  icon,
  type = "text",
  className = "",
  onChange,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/80 pl-10 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-700 transition hover:border-white/15 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview Card                                                               */
/* -------------------------------------------------------------------------- */

function PreviewCard({
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
      <div className="flex items-center gap-2 text-slate-600">
        {icon}

        <span className="text-[9px] uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}