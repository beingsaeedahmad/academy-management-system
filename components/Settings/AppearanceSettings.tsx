"use client";

import {
  Check,
  Monitor,
  Moon,
  Palette,
  Save,
  Sidebar,
  Sun,
} from "lucide-react";

import SettingsSection from "./SettingsSection";

import {
  AppearanceSettings as AppearanceSettingsType,
  AccentColor,
  SidebarDensity,
  ThemeMode,
} from "./settingsTypes";

interface AppearanceSettingsProps {
  settings: AppearanceSettingsType;
  onChange: <K extends keyof AppearanceSettingsType>(
    field: K,
    value: AppearanceSettingsType[K]
  ) => void;
  onSave?: () => void;
  saving?: boolean;
}

export default function AppearanceSettings({
  settings,
  onChange,
  onSave,
  saving = false,
}: AppearanceSettingsProps) {
  return (
    <SettingsSection
      title="Appearance"
      description="Customize the look, theme, colors, and layout density of your academy management system."
      icon={<Palette className="h-5 w-5" />}
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
        {/* Theme */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <Monitor className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Theme
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Choose how the application should appear.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ThemeCard
              value="dark"
              selected={settings.theme === "dark"}
              label="Dark"
              description="Dark interface"
              icon={<Moon className="h-5 w-5" />}
              onClick={() =>
                onChange("theme", "dark")
              }
            />

            <ThemeCard
              value="light"
              selected={settings.theme === "light"}
              label="Light"
              description="Light interface"
              icon={<Sun className="h-5 w-5" />}
              onClick={() =>
                onChange("theme", "light")
              }
            />

            <ThemeCard
              value="system"
              selected={settings.theme === "system"}
              label="System"
              description="Follow device"
              icon={<Monitor className="h-5 w-5" />}
              onClick={() =>
                onChange("theme", "system")
              }
            />
          </div>
        </div>

        {/* Accent Color */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-white">
              Accent Color
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Choose the primary accent color used throughout
              the interface.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <ColorOption
              value="blue"
              label="Blue"
              selected={
                settings.accentColor === "blue"
              }
              className="bg-blue-500"
              onClick={() =>
                onChange("accentColor", "blue")
              }
            />

            <ColorOption
              value="violet"
              label="Violet"
              selected={
                settings.accentColor === "violet"
              }
              className="bg-violet-500"
              onClick={() =>
                onChange("accentColor", "violet")
              }
            />

            <ColorOption
              value="emerald"
              label="Emerald"
              selected={
                settings.accentColor === "emerald"
              }
              className="bg-emerald-500"
              onClick={() =>
                onChange("accentColor", "emerald")
              }
            />

            <ColorOption
              value="amber"
              label="Amber"
              selected={
                settings.accentColor === "amber"
              }
              className="bg-amber-500"
              onClick={() =>
                onChange("accentColor", "amber")
              }
            />

            <ColorOption
              value="rose"
              label="Rose"
              selected={
                settings.accentColor === "rose"
              }
              className="bg-rose-500"
              onClick={() =>
                onChange("accentColor", "rose")
              }
            />
          </div>
        </div>

        {/* Sidebar Density */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Sidebar className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Sidebar Density
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Control the spacing between sidebar items.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <DensityCard
              value="compact"
              selected={
                settings.sidebarDensity === "compact"
              }
              label="Compact"
              description="More items"
              onClick={() =>
                onChange(
                  "sidebarDensity",
                  "compact"
                )
              }
            />

            <DensityCard
              value="comfortable"
              selected={
                settings.sidebarDensity ===
                "comfortable"
              }
              label="Comfortable"
              description="Balanced spacing"
              onClick={() =>
                onChange(
                  "sidebarDensity",
                  "comfortable"
                )
              }
            />

            <DensityCard
              value="spacious"
              selected={
                settings.sidebarDensity ===
                "spacious"
              }
              label="Spacious"
              description="More breathing room"
              onClick={() =>
                onChange(
                  "sidebarDensity",
                  "spacious"
                )
              }
            />
          </div>
        </div>

        {/* Interface Preview */}
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">
              Interface Preview
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Preview of your selected appearance settings.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#020617]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="h-2 w-2 rounded-full bg-slate-700" />
              <div className="h-2 w-2 rounded-full bg-slate-700" />

              <div className="ml-3 h-2 w-32 rounded-full bg-white/5" />
            </div>

            <div className="flex min-h-[150px]">
              <div className="w-24 border-r border-white/5 p-3">
                <div className="h-3 w-12 rounded bg-blue-500/20" />

                <div className="mt-5 space-y-3">
                  <div className="h-2 w-16 rounded bg-white/5" />
                  <div className="h-2 w-12 rounded bg-white/5" />
                  <div className="h-2 w-14 rounded bg-white/5" />
                </div>
              </div>

              <div className="flex-1 p-4">
                <div className="h-3 w-28 rounded bg-white/10" />

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
                  <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
                  <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Theme Card                                                                 */
/* -------------------------------------------------------------------------- */

function ThemeCard({
  value,
  selected,
  label,
  description,
  icon,
  onClick,
}: {
  value: ThemeMode;
  selected: boolean;
  label: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "relative rounded-xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-blue-500/40 bg-blue-600/[0.07] shadow-[0_0_20px_rgba(37,99,235,0.07)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.035]",
      ].join(" ")}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check className="h-3 w-3" />
        </span>
      )}

      <div
        className={[
          "flex h-10 w-10 items-center justify-center rounded-lg",
          selected
            ? "bg-blue-500/10 text-blue-400"
            : "bg-white/5 text-slate-600",
        ].join(" ")}
      >
        {icon}
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-300">
        {label}
      </p>

      <p className="mt-1 text-[9px] text-slate-600">
        {description}
      </p>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Color Option                                                               */
/* -------------------------------------------------------------------------- */

function ColorOption({
  value,
  label,
  selected,
  className,
  onClick,
}: {
  value: AccentColor;
  label: string;
  selected: boolean;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Use ${value} accent color`}
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "flex items-center gap-3 rounded-xl border p-3 transition-all duration-200",
        selected
          ? "border-white/20 bg-white/[0.05]"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-7 w-7 items-center justify-center rounded-full",
          className,
          selected
            ? "ring-2 ring-white/40 ring-offset-2 ring-offset-[#020617]"
            : "",
        ].join(" ")}
      >
        {selected && (
          <Check className="h-3.5 w-3.5 text-white" />
        )}
      </span>

      <span className="text-[10px] font-medium text-slate-400">
        {label}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Density Card                                                               */
/* -------------------------------------------------------------------------- */

function DensityCard({
  value,
  selected,
  label,
  description,
  onClick,
}: {
  value: SidebarDensity;
  selected: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        "relative rounded-xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-violet-500/30 bg-violet-500/[0.05]"
          : "border-white/10 bg-white/[0.02] hover:border-white/15",
      ].join(" ")}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
          <Check className="h-3 w-3" />
        </span>
      )}

      <div className="space-y-1.5">
        <div className="flex gap-1">
          <span className="h-1.5 w-5 rounded-full bg-slate-600" />
          <span className="h-1.5 w-8 rounded-full bg-slate-800" />
        </div>

        <div className="flex gap-1">
          <span className="h-1.5 w-5 rounded-full bg-slate-600" />
          <span className="h-1.5 w-6 rounded-full bg-slate-800" />
        </div>

        <div className="flex gap-1">
          <span className="h-1.5 w-5 rounded-full bg-slate-600" />
          <span className="h-1.5 w-7 rounded-full bg-slate-800" />
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-300">
        {label}
      </p>

      <p className="mt-1 text-[9px] text-slate-600">
        {description}
      </p>
    </button>
  );
}