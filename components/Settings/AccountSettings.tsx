"use client";

import {
  AtSign,
  Camera,
  CheckCircle2,
  Mail,
  Phone,
  Save,
  UserCircle,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
  AccountSettings as AccountSettingsType,
} from "./settingsTypes";

interface AccountSettingsProps {
  settings: AccountSettingsType;
  onChange: (
    field: keyof AccountSettingsType,
    value: string
  ) => void;
  onSave?: () => void;
  saving?: boolean;
}

export default function AccountSettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: AccountSettingsProps) {
  const initials = getInitials(
    settings.firstName,
    settings.lastName
  );

  return (
    <SettingsSection
      title="Account"
      description="Manage your administrator profile and account information."
      icon={<UserCircle className="h-5 w-5" />}
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
        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-600/[0.04] p-5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/10 text-2xl font-bold text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                {initials}
              </div>

              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900 bg-blue-600 text-white shadow-lg transition hover:bg-blue-500"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {settings.firstName || "Administrator"}{" "}
                  {settings.lastName}
                </h3>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-blue-400">
                  Super Admin
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {settings.email ||
                  "Administrator account"}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

                <span className="text-[10px] font-medium text-emerald-400">
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Personal Information
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Update the personal details associated with
              your administrator account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="First Name"
              value={settings.firstName}
              placeholder="First name"
              icon={
                <UserCircle className="h-4 w-4" />
              }
              onChange={(value) =>
                onChange("firstName", value)
              }
            />

            <InputField
              label="Last Name"
              value={settings.lastName}
              placeholder="Last name"
              icon={
                <UserCircle className="h-4 w-4" />
              }
              onChange={(value) =>
                onChange("lastName", value)
              }
            />

            <InputField
              label="Email Address"
              value={settings.email}
              placeholder="admin@academy.com"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              onChange={(value) =>
                onChange("email", value)
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
              label="Username"
              value={settings.username}
              placeholder="admin"
              icon={<AtSign className="h-4 w-4" />}
              onChange={(value) =>
                onChange("username", value)
              }
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Account Information
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Basic information about your administrator
              account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoCard
              label="Role"
              value="Super Admin"
            />

            <InfoCard
              label="Account Status"
              value="Active"
              success
            />

            <InfoCard
              label="Access Level"
              value="Full Access"
            />
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
              <UserCircle className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-300">
                Profile Privacy
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-600">
                Your administrator information is used only
                for account identification, authentication,
                and system activity records.
              </p>
            </div>
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
/* Info Card                                                                  */
/* -------------------------------------------------------------------------- */

function InfoCard({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {success && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        )}

        <p
          className={[
            "text-xs font-semibold",
            success
              ? "text-emerald-400"
              : "text-slate-300",
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getInitials(
  firstName: string,
  lastName: string
) {
  const first = firstName?.trim()?.charAt(0) ?? "";
  const last = lastName?.trim()?.charAt(0) ?? "";

  const initials = `${first}${last}`.toUpperCase();

  return initials || "AD";
}