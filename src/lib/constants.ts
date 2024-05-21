export const tabs = {
  CHATS: "Chats",
  CONTACTS: "Contacts",
  STATUS: "Status",
  SETTINGS: "Settings",
  PROFILE: "Profile",
} as const;

export type TabType = (typeof tabs)[keyof typeof tabs];
