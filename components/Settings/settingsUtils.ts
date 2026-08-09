import {
    AppSettings,
    SettingsSection,
  } from "./settingsTypes";
  
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
  
  export const DEFAULT_SETTINGS: AppSettings = {
    general: {
      language: "English",
      timezone: "Asia/Karachi",
      dateFormat: "DD/MM/YYYY",
      currency: "PKR",
    },
  
    academy: {
      academyName: "Saeed Educational Academy",
      email: "",
      phone: "",
      address: "",
      website: "",
    },
  
    appearance: {
      theme: "dark",
      compactMode: false,
      sidebarCollapsed: false,
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
      name: "",
      email: "",
      role: "Administrator",
    },
  
    backup: {
      automaticBackup: true,
      backupFrequency: "daily",
    },
  };
  
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