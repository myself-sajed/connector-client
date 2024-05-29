export const tabs = {
  CHATS: "Chats",
  CONTACTS: "Contacts",
  PROFILE: "Profile",
} as const;

export type TabType = (typeof tabs)[keyof typeof tabs];
