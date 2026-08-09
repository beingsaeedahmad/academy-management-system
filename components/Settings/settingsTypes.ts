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
  language: string;
  timezone: string;
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
  emailNotifications: boolean;
  attendanceAlerts: boolean;
  feeReminders: boolean;
  admissionNotifications: boolean;
  resultNotifications: boolean;
}

/* -------------------------------------------------------------------------- */
/* Security Settings                                                          */
/* -------------------------------------------------------------------------- */

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
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
  | "daily"
  | "weekly"
  | "monthly";

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
/* Danger Zone                                                                */
/* -------------------------------------------------------------------------- */

export interface DangerSettings {
  confirmBeforeDelete: boolean;
}

/* -------------------------------------------------------------------------- */
/* Complete Application Settings                                              */
/* -------------------------------------------------------------------------- */

export interface AppSettings {
  general: GeneralSettings;
  academy: AcademySettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  account: AccountSettings;
  backup: BackupSettings;
  danger: DangerSettings;
}

/* -------------------------------------------------------------------------- */
/* Backward Compatible Settings Data                                          */
/* -------------------------------------------------------------------------- */

export type SettingsData = AppSettings;