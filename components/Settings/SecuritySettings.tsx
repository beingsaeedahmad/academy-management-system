"use client";

import {
  Save,
  ShieldCheck,
  Smartphone,
  Clock3,
  LockKeyhole,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
  SecuritySettings as SecuritySettingsType,
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

/* -------------------------------------------------------------------------- */
/* Session Timeout Options                                                    */
/* -------------------------------------------------------------------------- */

const sessionTimeoutOptions: {
  label: string;
  value: SecuritySettingsType["sessionTimeout"];
}[] = [
  {
    label: "15 Minutes",
    value: "15 minutes",
  },
  {
    label: "30 Minutes",
    value: "30 minutes",
  },
  {
    label: "1 Hour",
    value: "1 hour",
  },
  {
    label: "4 Hours",
    value: "4 hours",
  },
  {
    label: "Never",
    value: "Never",
  },
];

/* -------------------------------------------------------------------------- */
/* Security Settings                                                          */
/* -------------------------------------------------------------------------- */

export default function SecuritySettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: SecuritySettingsProps) {
  const selectedTimeout = sessionTimeoutOptions.find(
    (option) =>
      option.value === settings.sessionTimeout
  );

  const sessionTimeoutLabel =
    selectedTimeout?.label ??
    settings.sessionTimeout;

  const hasSessionTimeout =
    settings.sessionTimeout !== "Never";

  return (
    <SettingsSection
      title="Security"
      description="Manage two-factor authentication and account session security."
      icon={<ShieldCheck className="h-5 w-5" />}
      action={
        onSave ? (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-blue-600
              px-4
              text-sm
              font-semibold
              text-white
              shadow-[0_0_20px_rgba(37,99,235,0.18)]
              transition
              hover:bg-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save className="h-4 w-4" />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        ) : undefined
      }
    >
      <div className="space-y-5">

        {/* ---------------------------------------------------------------- */}
        {/* Security Overview                                               */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-emerald-500/20
            bg-emerald-500/[0.035]
            p-5
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-32
              w-32
              rounded-full
              bg-emerald-500/10
              blur-3xl
            "
          />

          <div className="relative flex items-start gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-400
              "
            >
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Account Security
              </h3>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                Configure additional account protection
                and control how long an active session
                remains valid.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    settings.twoFactorEnabled
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                      : "bg-amber-400",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-[10px] font-medium",
                    settings.twoFactorEnabled
                      ? "text-emerald-400"
                      : "text-amber-400",
                  ].join(" ")}
                >
                  {settings.twoFactorEnabled
                    ? "Enhanced security is enabled"
                    : "Two-factor authentication is disabled"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Two Factor Authentication                                       */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-950/40
            p-5
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-500/10
                  text-violet-400
                "
              >
                <Smartphone className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Two-Factor Authentication
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Add an additional layer of protection
                  to your academy management account.
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

        {/* ---------------------------------------------------------------- */}
        {/* Session Settings                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-950/40
            p-5
          "
        >
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600/10
                  text-blue-400
                "
              >
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Session Settings
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Control how long your login session
                  remains active.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Session Timeout */}

            <div>
              <label
                htmlFor="session-timeout"
                className="
                  mb-2
                  block
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Session Timeout
              </label>

              <div className="relative">
                <Clock3
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-600
                  "
                />

                <select
                  id="session-timeout"
                  value={settings.sessionTimeout}
                  onChange={(event) => {
                    const value =
                      event.target
                        .value as SecuritySettingsType["sessionTimeout"];

                    onChange(
                      "sessionTimeout",
                      value
                    );
                  }}
                  className="
                    h-11
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    border-white/10
                    bg-slate-950/80
                    pl-10
                    pr-3
                    text-sm
                    text-slate-300
                    outline-none
                    transition
                    hover:border-white/15
                    focus:border-blue-500/50
                    focus:ring-2
                    focus:ring-blue-500/10
                  "
                >
                  {sessionTimeoutOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="
                          bg-slate-950
                          text-slate-300
                        "
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <p className="mt-2 text-[10px] text-slate-600">
                Current timeout:{" "}
                <span className="text-slate-500">
                  {sessionTimeoutLabel}
                </span>
              </p>
            </div>

            {/* Security Level */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Security Level
              </label>

              <div
                className="
                  flex
                  h-11
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-white/10
                  bg-slate-950/80
                  px-3
                "
              >
                <LockKeyhole
                  className={[
                    "h-4 w-4",
                    settings.twoFactorEnabled
                      ? "text-emerald-400"
                      : "text-slate-600",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-sm font-medium",
                    settings.twoFactorEnabled
                      ? "text-emerald-400"
                      : "text-slate-500",
                  ].join(" ")}
                >
                  {settings.twoFactorEnabled
                    ? "Enhanced Protection"
                    : "Standard Protection"}
                </span>
              </div>

              <p className="mt-2 text-[10px] text-slate-600">
                Based on your two-factor authentication
                setting.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Security Status                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-950/40
            p-5
          "
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">
              Security Status
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current protection status of your account.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >
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
              label="Session"
              value={sessionTimeoutLabel}
              active={hasSessionTimeout}
            />

            <StatusCard
              label="Protection"
              value={
                settings.twoFactorEnabled
                  ? "Enhanced"
                  : "Standard"
              }
              active={
                settings.twoFactorEnabled
              }
            />
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
    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-white/[0.02]
        p-4
      "
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="
            text-[9px]
            uppercase
            tracking-wider
            text-slate-600
          "
        >
          {label}
        </span>

        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            active
              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
              : "bg-slate-700",
          ].join(" ")}
        />
      </div>

      <p
        className={[
          "mt-2 text-xs font-semibold",
          active
            ? "text-emerald-400"
            : "text-slate-600",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}