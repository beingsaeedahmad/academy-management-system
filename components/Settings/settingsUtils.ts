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
  /* ------------------------------------------------------------------------ */
  /* General                                                                  */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* Academy                                                                  */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* Appearance                                                               */
  /* ------------------------------------------------------------------------ */

  appearance: {
    theme: "dark",
    accentColor: "blue",
    sidebarDensity: "comfortable",
  },

  /* ------------------------------------------------------------------------ */
  /* Notifications                                                             */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* Security                                                                  */
  /* ------------------------------------------------------------------------ */

  security: {
    newPassword: "",
    confirmPassword: "",

    twoFactorEnabled: false,

    sessionTimeout: "30 minutes",

    loginProtection: "Standard",
  },

  /* ------------------------------------------------------------------------ */
  /* Account                                                                   */
  /* ------------------------------------------------------------------------ */

  account: {
    firstName: "Saeed",
    lastName: "Ahmad",
    email: "",
    phone: "",
    username: "administrator",
  },

  /* ------------------------------------------------------------------------ */
  /* Backup                                                                    */
  /* ------------------------------------------------------------------------ */

  backup: {
    automaticBackup: true,
    frequency: "Daily",
    retention: "30 days",
    lastBackupDate: "Never",
  },

  /* ------------------------------------------------------------------------ */
  /* Danger Zone                                                               */
  /* ------------------------------------------------------------------------ */

  danger: {
    confirmBeforeDelete: true,
  },
};

/* -------------------------------------------------------------------------- */
/* Get Settings Section                                                       */
/* -------------------------------------------------------------------------- */

export function getSettingsSection(
  section: SettingsSection
) {
  return SETTINGS_SECTIONS.find(
    (item) => item.id === section
  );
}

/* -------------------------------------------------------------------------- */
/* Format Settings Label                                                      */
/* -------------------------------------------------------------------------- */

export function formatSettingsLabel(
  value: string
): string {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) =>
      char.toUpperCase()
    );
}