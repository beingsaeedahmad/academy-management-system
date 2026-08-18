"use client";

import {
  Bell,
  Check,
  Mail,
  Save,
  Settings2,
  GraduationCap,
  CreditCard,
  UserPlus,
  Smartphone,
  AlertTriangle,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
  NotificationSettings as NotificationSettingsType,
} from "./settingsTypes";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;

  onChange: (
    field: keyof NotificationSettingsType,
    value: boolean
  ) => void;

  onSave?: () => void;

  saving?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Notification Settings                                                      */
/* -------------------------------------------------------------------------- */

export default function NotificationSettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: NotificationSettingsProps) {
  /*
   * The "enabled" field is the master notification setting.
   * Individual notification preferences are controlled separately.
   */
  const notificationsEnabled = settings.enabled;

  return (
    <SettingsSection
      title="Notifications"
      description="Control alerts and notifications for important academy activities."
      icon={<Bell className="h-5 w-5" />}
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
        {/* Notification Status                                             */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-blue-500/20
            bg-blue-600/[0.04]
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
              bg-blue-600/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600/10
                  text-blue-400
                "
              >
                <Bell className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Notifications
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Manage notification preferences for
                  important academy activities.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      notificationsEnabled
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                        : "bg-slate-600",
                    ].join(" ")}
                  />

                  <span
                    className={[
                      "text-[10px] font-medium",
                      notificationsEnabled
                        ? "text-emerald-400"
                        : "text-slate-600",
                    ].join(" ")}
                  >
                    {notificationsEnabled
                      ? "Notifications are enabled"
                      : "All notifications are disabled"}
                  </span>
                </div>
              </div>
            </div>

            {/* Master Toggle */}

            <Toggle
              checked={settings.enabled}
              onChange={(value) =>
                onChange("enabled", value)
              }
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Delivery Channels                                               */}
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
                  bg-violet-500/10
                  text-violet-400
                "
              >
                <Settings2 className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Delivery Channels
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Choose how academy notifications
                  should be delivered.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">

            {/* Email */}

            <NotificationRow
              icon={
                <Mail className="h-4 w-4" />
              }
              title="Email Notifications"
              description="Receive important academy alerts by email."
              checked={
                settings.emailNotifications
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "emailNotifications",
                  value
                )
              }
            />

            {/* Push */}

            <NotificationRow
              icon={
                <Bell className="h-4 w-4" />
              }
              title="Push Notifications"
              description="Receive instant notifications inside the application."
              checked={
                settings.pushNotifications
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "pushNotifications",
                  value
                )
              }
            />

            {/* SMS */}

            <NotificationRow
              icon={
                <Smartphone className="h-4 w-4" />
              }
              title="SMS Notifications"
              description="Receive important academy alerts through SMS."
              checked={
                settings.smsNotifications
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "smsNotifications",
                  value
                )
              }
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Academy Alerts                                                   */}
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
            <h3 className="text-sm font-semibold text-white">
              Academy Alerts
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Select the academy activities you want
              to monitor.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-2
              md:grid-cols-2
            "
          >

            {/* Attendance */}

            <NotificationRow
              icon={
                <Check className="h-4 w-4" />
              }
              title="Attendance Alerts"
              description="Receive important attendance activity."
              checked={
                settings.attendanceAlerts
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "attendanceAlerts",
                  value
                )
              }
            />

            {/* Fees */}

            <NotificationRow
              icon={
                <CreditCard className="h-4 w-4" />
              }
              title="Fee Alerts"
              description="Receive payment and pending fee alerts."
              checked={
                settings.feeAlerts
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "feeAlerts",
                  value
                )
              }
            />

            {/* Admissions */}

            <NotificationRow
              icon={
                <UserPlus className="h-4 w-4" />
              }
              title="Admission Alerts"
              description="Receive notifications about new admissions."
              checked={
                settings.admissionAlerts
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "admissionAlerts",
                  value
                )
              }
            />

            {/* System */}

            <NotificationRow
              icon={
                <AlertTriangle className="h-4 w-4" />
              }
              title="System Alerts"
              description="Receive important system and application alerts."
              checked={
                settings.systemAlerts
              }
              disabled={!settings.enabled}
              onChange={(value) =>
                onChange(
                  "systemAlerts",
                  value
                )
              }
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Notification Summary                                             */}
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
              Notification Summary
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current notification preferences.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-4
            "
          >
            <SummaryCard
              label="Attendance"
              active={
                settings.enabled &&
                settings.attendanceAlerts
              }
            />

            <SummaryCard
              label="Fees"
              active={
                settings.enabled &&
                settings.feeAlerts
              }
            />

            <SummaryCard
              label="Admissions"
              active={
                settings.enabled &&
                settings.admissionAlerts
              }
            />

            <SummaryCard
              label="System"
              active={
                settings.enabled &&
                settings.systemAlerts
              }
            />
          </div>
        </div>

      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Notification Row                                                           */
/* -------------------------------------------------------------------------- */

function NotificationRow({
  icon,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition",
        !disabled
          ? "hover:border-white/10 hover:bg-white/[0.03]"
          : "opacity-60",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            checked && !disabled
              ? "bg-blue-600/10 text-blue-400"
              : "bg-white/[0.03] text-slate-700",
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-300">
            {title}
          </p>

          <p className="mt-0.5 text-[9px] leading-4 text-slate-600">
            {description}
          </p>
        </div>
      </div>

      <Toggle
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Toggle                                                                     */
/* -------------------------------------------------------------------------- */

function Toggle({
  checked,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={[
        "relative h-6 w-11 shrink-0 rounded-full border transition-all duration-200",
        checked
          ? "border-blue-500/40 bg-blue-600"
          : "border-white/10 bg-slate-800",
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer",
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
/* Summary Card                                                               */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  label,
  active,
}: {
  label: string;
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
          "mt-2 text-[10px] font-semibold",
          active
            ? "text-emerald-400"
            : "text-slate-600",
        ].join(" ")}
      >
        {active ? "Enabled" : "Disabled"}
      </p>
    </div>
  );
}