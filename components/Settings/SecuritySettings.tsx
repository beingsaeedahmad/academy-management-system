"use client";

import {
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Save,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

import SettingsSection from "./SettingsSection";

import {
  LoginProtection,
  SecuritySettings as SecuritySettingsType,
  SessionTimeout,
} from "./settingsTypes";

interface SecuritySettingsProps {
  settings: SecuritySettingsType;
  onChange: <K extends keyof SecuritySettingsType>(
    field: K,
    value: SecuritySettingsType[K]
  ) => void;
  onSave?: () => void;
  saving?: boolean;
}

const sessionTimeoutOptions: SessionTimeout[] = [
  "15 minutes",
  "30 minutes",
  "1 hour",
  "4 hours",
  "Never",
];

const loginProtectionOptions: LoginProtection[] = [
  "Standard",
  "Enhanced",
  "Strict",
];

export default function SecuritySettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: SecuritySettingsProps) {
  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const passwordsMatch =
    settings.newPassword ===
      settings.confirmPassword &&
    settings.confirmPassword.length > 0;

  return (
    <SettingsSection
      title="Security"
      description="Manage your password, login protection, sessions, and account security."
      icon={<ShieldCheck className="h-5 w-5" />}
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
        {/* Security Overview */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/[0.035] p-5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Account Security
              </h3>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                Keep your academy management system secure
                by using a strong password and appropriate
                login protection.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

                <span className="text-[10px] font-medium text-emerald-400">
                  Security settings are active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <LockKeyhole className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Change Password
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Create a strong password for your account.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* New Password */}
            <PasswordInput
              label="New Password"
              value={settings.newPassword}
              placeholder="Enter new password"
              visible={showNewPassword}
              onToggle={() =>
                setShowNewPassword(
                  (current) => !current
                )
              }
              onChange={(value) =>
                onChange("newPassword", value)
              }
            />

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password"
              value={settings.confirmPassword}
              placeholder="Confirm new password"
              visible={showConfirmPassword}
              onToggle={() =>
                setShowConfirmPassword(
                  (current) => !current
                )
              }
              onChange={(value) =>
                onChange(
                  "confirmPassword",
                  value
                )
              }
            />
          </div>

          {settings.confirmPassword.length > 0 && (
            <div
              className={[
                "mt-4 flex items-center gap-2 text-[10px] font-medium",
                passwordsMatch
                  ? "text-emerald-400"
                  : "text-rose-400",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 items-center justify-center rounded-full",
                  passwordsMatch
                    ? "bg-emerald-500/10"
                    : "bg-rose-500/10",
                ].join(" ")}
              >
                {passwordsMatch ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">!</span>
                )}
              </span>

              {passwordsMatch
                ? "Passwords match"
                : "Passwords do not match"}
            </div>
          )}

          {/* Password Requirements */}
          <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Password recommendations
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Requirement
                active={settings.newPassword.length >= 8}
                text="At least 8 characters"
              />

              <Requirement
                active={/[A-Z]/.test(
                  settings.newPassword
                )}
                text="One uppercase letter"
              />

              <Requirement
                active={/[0-9]/.test(
                  settings.newPassword
                )}
                text="One number"
              />

              <Requirement
                active={/[^A-Za-z0-9]/.test(
                  settings.newPassword
                )}
                text="One special character"
              />
            </div>
          </div>
        </div>

        {/* Two Factor Authentication */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Smartphone className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Two-Factor Authentication
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Add an additional layer of protection to
                  your account.
                </p>

                <p
                  className={[
                    "mt-2 text-[10px] font-medium",
                    settings.twoFactorEnabled
                      ? "text-emerald-400"
                      : "text-slate-600",
                  ].join(" ")}
                >
                  {settings.twoFactorEnabled
                    ? "Two-factor authentication is enabled"
                    : "Two-factor authentication is disabled"}
                </p>
              </div>
            </div>

            <Toggle
              checked={settings.twoFactorEnabled}
              onChange={(value) =>
                onChange(
                  "twoFactorEnabled",
                  value
                )
              }
            />
          </div>
        </div>

        {/* Session Settings */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Session & Login Protection
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Configure how long sessions remain active and
              how strict login protection should be.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Session Timeout */}
            <SelectField
              label="Session Timeout"
              value={settings.sessionTimeout}
              options={sessionTimeoutOptions}
              onChange={(value) =>
                onChange(
                  "sessionTimeout",
                  value as SessionTimeout
                )
              }
            />

            {/* Login Protection */}
            <SelectField
              label="Login Protection"
              value={settings.loginProtection}
              options={loginProtectionOptions}
              onChange={(value) =>
                onChange(
                  "loginProtection",
                  value as LoginProtection
                )
              }
            />
          </div>
        </div>

        {/* Security Status */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">
              Security Status
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current protection status of your account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatusCard
              label="Password"
              value={
                settings.newPassword.length >= 8
                  ? "Strong"
                  : "Review"
              }
              active={
                settings.newPassword.length >= 8
              }
            />

            <StatusCard
              label="2FA"
              value={
                settings.twoFactorEnabled
                  ? "Enabled"
                  : "Disabled"
              }
              active={
                settings.twoFactorEnabled
              }
            />

            <StatusCard
              label="Protection"
              value={settings.loginProtection}
              active={
                settings.loginProtection !==
                "Standard"
              }
            />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Password Input                                                             */
/* -------------------------------------------------------------------------- */

function PasswordInput({
  label,
  value,
  placeholder,
  visible,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

        <input
          type={visible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/80 pl-10 pr-11 text-sm text-slate-200 outline-none placeholder:text-slate-700 transition hover:border-white/15 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-slate-400"
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Requirement                                                                */
/* -------------------------------------------------------------------------- */

function Requirement({
  active,
  text,
}: {
  active: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full",
          active
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-white/5 text-slate-700",
        ].join(" ")}
      >
        <Check className="h-3 w-3" />
      </span>

      <span
        className={[
          "text-[10px]",
          active
            ? "text-slate-400"
            : "text-slate-700",
        ].join(" ")}
      >
        {text}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Select Field                                                               */
/* -------------------------------------------------------------------------- */

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
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
        className="h-11 w-full appearance-none rounded-lg border border-white/10 bg-slate-950/80 px-3 text-sm text-slate-300 outline-none transition hover:border-white/15 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-slate-950 text-slate-300"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
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
/* Status Card                                                                */
/* -------------------------------------------------------------------------- */

function StatusCard({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] uppercase tracking-wider text-slate-600">
          {label}
        </span>

        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            active
              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
              : "bg-amber-400",
          ].join(" ")}
        />
      </div>

      <p
        className={[
          "mt-2 text-xs font-semibold",
          active
            ? "text-emerald-400"
            : "text-amber-400",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}