export const tabs = {
  CHATS: "Chats",
  CONTACTS: "Contacts",
  PROFILE: "Profile",
  LOGOUT: "Logout",
} as const;

export const activities = {
  CHAT: "Chat",
  CODE: "Code",
} as const;

export type TabType = (typeof tabs)[keyof typeof tabs];
