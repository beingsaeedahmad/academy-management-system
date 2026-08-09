import {
  AppSettings,
  SettingsSection,
} from "./settingsTypes";

/* -------------------------------------------------------------------------- */
/* Settings Navigation                                                        */
/* -------------------------------------------------------------------------- */

export const SETTINGS_SECTIONS: {
  id: SettingsSection;
  label: string;
  description: string;
}[] = [
  {
    id: "general",
    label: "General",
    description: "Manage general system preferences",
  },
  {
    id: "academy",
    label: "Academy",
    description: "Manage academy information",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Customize the system appearance",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Manage notification preferences",
  },
  {
    id: "security",
    label: "Security",
    description: "Manage security preferences",
  },
  {
    id: "account",
    label: "Account",
    description: "Manage your account information",
  },
  {
    id: "backup",
    label: "Backup",
    description: "Manage system backups",
  },
  {
    id: "danger",
    label: "Danger Zone",
    description: "Sensitive system actions",
  },
];

/* -------------------------------------------------------------------------- */
/* Default Settings                                                           */
/* -------------------------------------------------------------------------- */

export const DEFAULT_SETTINGS: AppSettings = {
  general: {
    language: "English",
    timezone: "Asia/Karachi",
    dateFormat: "DD/MM/YYYY",
    currency: "PKR",
  },

  academy: {
    name: "Saeed Educational Academy",
    phone: "",
    email: "",
    website: "",
    establishedYear: "2020",
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
    emailNotifications: true,
    attendanceAlerts: true,
    feeReminders: true,
    admissionNotifications: true,
    resultNotifications: true,
  },

  security: {
    twoFactorEnabled: false,
    sessionTimeout: 30,
  },

  account: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "admin",
  },

  backup: {
    automaticBackup: true,
    frequency: "daily",
    retention: "30 days",
    lastBackupDate: "",
  },
  danger: {
    confirmBeforeDelete: true,
  },
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export function getSettingsSection(
  section: SettingsSection
) {
  return SETTINGS_SECTIONS.find(
    (item) => item.id === section
  );
}

export function formatSettingsLabel(
  value: string
): string {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}