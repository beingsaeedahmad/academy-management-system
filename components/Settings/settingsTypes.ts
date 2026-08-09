/* -------------------------------------------------------------------------- */
/* Settings Navigation                                                        */
/* -------------------------------------------------------------------------- */

export type SettingsSection =
  | "general"
  | "academy"
  | "appearance"
  | "notifications"
  | "security"
  | "account"
  | "backup"
  | "danger";

/* -------------------------------------------------------------------------- */
/* General Settings                                                           */
/* -------------------------------------------------------------------------- */

export interface GeneralSettings {
  academyName: string;
  academyEmail: string;
  academyPhone: string;
  academyAddress: string;
  timezone: string;
  language: string;
  dateFormat: string;
  currency: string;
}

/* -------------------------------------------------------------------------- */
/* Academy Settings                                                           */
/* -------------------------------------------------------------------------- */

export interface AcademySettings {
  name: string;
  phone: string;
  email: string;
  website: string;
  establishedYear: string;
  address: string;
  city: string;
  country: string;
}

/* -------------------------------------------------------------------------- */
/* Appearance Settings                                                        */
/* -------------------------------------------------------------------------- */

export type ThemeMode =
  | "dark"
  | "light"
  | "system";

export type AccentColor =
  | "blue"
  | "violet"
  | "emerald"
  | "amber"
  | "rose";

export type SidebarDensity =
  | "compact"
  | "comfortable"
  | "spacious";

export interface AppearanceSettings {
  theme: ThemeMode;
  accentColor: AccentColor;
  sidebarDensity: SidebarDensity;
}

/* -------------------------------------------------------------------------- */
/* Notification Settings                                                      */
/* -------------------------------------------------------------------------- */

export interface NotificationSettings {
  enabled: boolean;

  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;

  attendanceAlerts: boolean;
  feeAlerts: boolean;
  admissionAlerts: boolean;
  systemAlerts: boolean;
}

/* -------------------------------------------------------------------------- */
/* Security Settings                                                          */
/* -------------------------------------------------------------------------- */

export type SessionTimeout =
  | "15 minutes"
  | "30 minutes"
  | "1 hour"
  | "4 hours"
  | "Never";

export type LoginProtection =
  | "Standard"
  | "Enhanced"
  | "Strict";

export interface SecuritySettings {
  newPassword: string;
  confirmPassword: string;

  twoFactorEnabled: boolean;

  sessionTimeout: SessionTimeout;
  loginProtection: LoginProtection;
}

/* -------------------------------------------------------------------------- */
/* Account Settings                                                           */
/* -------------------------------------------------------------------------- */

export interface AccountSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
}

/* -------------------------------------------------------------------------- */
/* Backup Settings                                                            */
/* -------------------------------------------------------------------------- */

export type BackupFrequency =
  | "Daily"
  | "Weekly"
  | "Monthly";

export type BackupRetention =
  | "7 days"
  | "30 days"
  | "90 days"
  | "1 year";

export interface BackupSettings {
  automaticBackup: boolean;

  frequency: BackupFrequency;
  retention: BackupRetention;

  lastBackupDate: string;
}

/* -------------------------------------------------------------------------- */
/* Complete Settings Data                                                     */
/* -------------------------------------------------------------------------- */

export interface SettingsData {
  general: GeneralSettings;
  academy: AcademySettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  account: AccountSettings;
  backup: BackupSettings;
}