"use client";

import { useState } from "react";

import {
  AlertTriangle,
  Bell,
  Building2,
  ChevronDown,
  CircleHelp,
  Database,
  Languages,
  Palette,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UserCircle,
} from "lucide-react";

import GeneralSettings from "./GeneralSettings";
import AcademySettings from "./AcademySettings";
import AppearanceSettings from "./AppearanceSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import AccountSettings from "./AccountSettings";
import BackupSettings from "./BackupSettings";
import DangerZone from "./DangerZone";

import {
  SettingsData,
  SettingsSection,
} from "./settingsTypes";

/* ============================================================
   DEFAULT SETTINGS
============================================================ */

const defaultSettings: SettingsData = {
  general: {
    academyName: "Saeed Educational Academy",
    academyEmail: "",
    academyPhone: "",
    academyAddress: "",
    timezone: "Asia/Karachi",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    currency: "PKR",
  },

  academy: {
    name: "Saeed Educational Academy",
    phone: "",
    email: "",
    website: "",
    establishedYear: "",
    address: "",
    city: "",
    country: "Pakistan",
  },

  appearance: {
    theme: "dark",
    accentColor: "blue",
    sidebarDensity: "comfortable",
  },

  notifications: {
    enabled: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    attendanceAlerts: true,
    feeAlerts: true,
    admissionAlerts: true,
    systemAlerts: true,
  },

  security: {
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: "30 minutes",
    loginProtection: "Standard",
  },

  account: {
    firstName: "Saeed",
    lastName: "Ahmad",
    email: "",
    phone: "",
    username: "administrator",
  },

  backup: {
    automaticBackup: true,
    frequency: "Daily",
    retention: "30 days",
    lastBackupDate: "Never",
  },

  /* ============================================================
     DANGER SETTINGS
  ============================================================ */

  danger: {
    confirmBeforeDelete: true,
  },
};

/* ============================================================
   SIDEBAR ITEM TYPES
============================================================ */

interface SidebarItem {
  id: SettingsSection;
  label: string;
  description: string;
  icon: React.ElementType;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

/* ============================================================
   SIDEBAR DATA
============================================================ */

const sidebarGroups: SidebarGroup[] = [
  {
    title: "GENERAL",
    items: [
      {
        id: "general",
        label: "General",
        description: "Manage general preferences",
        icon: SlidersHorizontal,
      },
      {
        id: "academy",
        label: "Academy",
        description: "Manage academy information",
        icon: Building2,
      },
    ],
  },

  {
    title: "PERSONALIZATION",
    items: [
      {
        id: "appearance",
        label: "Appearance",
        description: "Customize the system appearance",
        icon: Palette,
      },
      {
        id: "notifications",
        label: "Notifications",
        description: "Manage notification preferences",
        icon: Bell,
      },
    ],
  },

  {
    title: "SECURITY & ACCOUNT",
    items: [
      {
        id: "security",
        label: "Security",
        description: "Manage security preferences",
        icon: ShieldCheck,
      },
      {
        id: "account",
        label: "Account",
        description: "Manage your account information",
        icon: UserCircle,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        id: "backup",
        label: "Backup",
        description: "Manage system backups",
        icon: Database,
      },
    ],
  },
];

/* ============================================================
   SETTINGS PAGE
============================================================ */

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);

  const [saving, setSaving] = useState(false);

  /* ============================================================
     UPDATE SETTINGS
  ============================================================ */

  function updateSettings<
    S extends keyof SettingsData,
    K extends keyof SettingsData[S],
  >(
    section: S,
    field: K,
    value: SettingsData[S][K]
  ) {
    setSettings((current) => ({
      ...current,

      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  }

  /* ============================================================
     SAVE SETTINGS
  ============================================================ */

  async function handleSave() {
    setSaving(true);

    try {
      /*
       * Database integration will be connected here.
       *
       * IMPORTANT:
       * For the AMS project, permanent settings should
       * eventually be saved in PostgreSQL through Prisma.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );
    } finally {
      setSaving(false);
    }
  }

  /* ============================================================
     RENDER SETTINGS
  ============================================================ */

  function renderSettings() {
    switch (activeSection) {
      /* ========================================================
         GENERAL
      ======================================================== */

      case "general":
        return (
          <GeneralSettings
            settings={settings.general}
            onChange={(field, value) =>
              updateSettings(
                "general",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         ACADEMY
      ======================================================== */

      case "academy":
        return (
          <AcademySettings
            settings={settings.academy}
            onChange={(field, value) =>
              updateSettings(
                "academy",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         APPEARANCE
      ======================================================== */

      case "appearance":
        return (
          <AppearanceSettings
            settings={settings.appearance}
            onChange={(field, value) =>
              updateSettings(
                "appearance",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         NOTIFICATIONS
      ======================================================== */

      case "notifications":
        return (
          <NotificationSettings
            settings={settings.notifications}
            onChange={(field, value) =>
              updateSettings(
                "notifications",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         SECURITY
      ======================================================== */

      case "security":
        return (
          <SecuritySettings
            settings={settings.security}
            onChange={(field, value) =>
              updateSettings(
                "security",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         ACCOUNT
      ======================================================== */

      case "account":
        return (
          <AccountSettings
            settings={settings.account}
            onChange={(field, value) =>
              updateSettings(
                "account",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         BACKUP
      ======================================================== */

      case "backup":
        return (
          <BackupSettings
            settings={settings.backup}
            onChange={(field, value) =>
              updateSettings(
                "backup",
                field,
                value
              )
            }
            onSave={handleSave}
            saving={saving}
          />
        );

      /* ========================================================
         DANGER ZONE
      ======================================================== */

      case "danger":
        return <DangerZone />;

      default:
        return null;
    }
  }

  /* ============================================================
     RETURN
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="flex min-h-screen">

        {/* ======================================================
            LEFT SIDEBAR
        ====================================================== */}

        <aside className="hidden w-[278px] shrink-0 border-r border-slate-800/80 bg-[#020817] lg:flex lg:flex-col">

          {/* ====================================================
              BRAND
          ==================================================== */}

          <div className="border-b border-slate-800/70 px-6 py-7">
            <div className="flex items-start gap-3">

              {/* Logo */}

              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_25px_rgba(37,99,235,0.25)]">
                <div className="absolute inset-[3px] rounded-lg border border-white/10" />

                <Languages className="relative h-6 w-6 text-white" />
              </div>

              {/* Brand text */}

              <div className="min-w-0">
                <h2 className="text-[25px] font-bold leading-none tracking-tight text-white">
                  AMS
                </h2>

                <p className="mt-2 text-sm leading-5 text-slate-300">
                  Academy Management
                  <br />
                  System
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================
              SIDEBAR NAVIGATION
          ==================================================== */}

          <div className="flex-1 overflow-y-auto px-5 py-5">

            {sidebarGroups.map((group) => (
              <div
                key={group.title}
                className="mb-6"
              >

                {/* Group title */}

                <div className="mb-3 px-1">
                  <p className="text-[12px] font-medium tracking-[0.12em] text-blue-400">
                    {group.title}
                  </p>
                </div>

                {/* Group items */}

                <div className="space-y-1">

                  {group.items.map((item) => {
                    const Icon = item.icon;

                    const active =
                      activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setActiveSection(item.id)
                        }
                        className={`group relative flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-all duration-200 ${
                          active
                            ? "border border-blue-500/80 bg-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.10)]"
                            : "border border-transparent hover:bg-slate-900/60"
                        }`}
                      >

                        {/* Active left line */}

                        {active && (
                          <span className="absolute -left-[1px] top-2 bottom-2 w-[2px] rounded-full bg-blue-400" />
                        )}

                        {/* Icon */}

                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                            active
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-slate-900/80 text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </div>

                        {/* Text */}

                        <div className="min-w-0 flex-1">

                          <p
                            className={`text-sm font-semibold ${
                              active
                                ? "text-white"
                                : "text-slate-200"
                            }`}
                          >
                            {item.label}
                          </p>

                          <p
                            className={`mt-1 truncate text-[11px] ${
                              active
                                ? "text-blue-200/80"
                                : "text-slate-500"
                            }`}
                          >
                            {item.description}
                          </p>

                        </div>

                        {/* Active indicator */}

                        {active && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        )}

                      </button>
                    );
                  })}

                </div>
              </div>
            ))}

            {/* ==================================================
                DANGER ZONE
            ================================================== */}

            <div className="mt-2">

              <div className="mb-3 px-1">
                <p className="text-[12px] font-medium tracking-[0.12em] text-red-400">
                  DANGER ZONE
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveSection("danger")
                }
                className={`group relative flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition ${
                  activeSection === "danger"
                    ? "border border-red-500/60 bg-red-500/10"
                    : "border border-transparent hover:bg-red-500/5"
                }`}
              >

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    activeSection === "danger"
                      ? "bg-red-500/15 text-red-400"
                      : "bg-slate-900/80 text-red-400"
                  }`}
                >
                  <AlertTriangle className="h-[18px] w-[18px]" />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-slate-200">
                    Danger Zone
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Sensitive system actions
                  </p>

                </div>

              </button>
            </div>
          </div>

          {/* ====================================================
              HELP CARD
          ==================================================== */}

          <div className="border-t border-slate-800/70 p-5">

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 shadow-[0_0_30px_rgba(37,99,235,0.04)]">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
                  <CircleHelp className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-sm font-semibold text-blue-400">
                    Need Help?
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-400">
                    Visit our help center for
                    <br />
                    guides and support.
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-blue-600/20 text-xs font-medium text-blue-100 transition hover:bg-blue-600/30"
              >
                Help Center
              </button>

            </div>
          </div>
        </aside>

        {/* ======================================================
            MAIN AREA
        ====================================================== */}

        <main className="min-w-0 flex-1">

          {/* ====================================================
              TOP HEADER
          ==================================================== */}

          <header className="border-b border-slate-800/70 bg-[#020817]">

            <div className="flex min-h-[118px] items-center justify-between gap-6 px-7 py-5 xl:px-8">

              {/* PAGE TITLE */}

              <div className="flex items-center gap-5">

                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-xl bg-blue-600/20 shadow-[0_0_30px_rgba(37,99,235,0.12)]">
                  <Settings2 className="h-8 w-8 text-blue-400" />
                </div>

                <div>

                  <h1 className="text-[27px] font-bold tracking-tight text-white">
                    Settings
                  </h1>

                  <p className="mt-1 text-[15px] text-slate-400">
                    Manage your academy system
                    preferences and configuration.
                  </p>

                </div>
              </div>

              {/* RIGHT HEADER */}

              <div className="hidden items-center gap-5 xl:flex">

                {/* System status */}

                <div className="flex h-[70px] min-w-[300px] items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/20 px-5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  </div>

                  <div className="flex-1">

                    <p className="text-[12px] text-blue-400">
                      System Status
                    </p>

                    <p className="mt-1 text-sm font-medium text-emerald-400">
                      All Systems Operational
                    </p>

                  </div>

                  {/* ECG */}

                  <div className="relative flex h-8 w-12 items-center">

                    <div className="absolute left-0 right-0 top-1/2 h-px bg-emerald-500/20" />

                    <svg
                      viewBox="0 0 50 24"
                      className="relative h-7 w-12 text-emerald-400"
                      fill="none"
                    >
                      <path
                        d="M1 13H10L14 12L17 12L20 5L24 19L28 13H34L37 12L40 12L43 7L46 13H49"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </div>

                </div>

                {/* Administrator */}

                <button
                  type="button"
                  className="flex h-[70px] min-w-[235px] items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/20 px-4 text-left transition hover:border-slate-700"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white shadow-[0_0_18px_rgba(59,130,246,0.2)]">
                    SA
                  </div>

                  <div className="flex-1">

                    <p className="text-sm font-semibold text-white">
                      Administrator
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Super Admin
                    </p>

                  </div>

                  <ChevronDown className="h-5 w-5 text-slate-400" />

                </button>

              </div>
            </div>
          </header>

          {/* ====================================================
              CONTENT
          ==================================================== */}

          <section className="px-7 py-7 xl:px-8">

            <div className="mx-auto w-full max-w-[1195px]">
              {renderSettings()}
            </div>

          </section>

          {/* ====================================================
              FOOTER
          ==================================================== */}

          <footer className="px-6 pb-8 pt-4 text-center">

            <p className="text-xs text-slate-500">
              © 2026 Academy Management System. All
              rights reserved.
            </p>

          </footer>

        </main>
      </div>
    </div>
  );
}