export interface Message {
  _id: string;
  author: Contact;
  text: string | null;
  filename?: string | null;
  type: string;
  chatId: string;
  audioUrl?: string | null;
  status?: "optimistic" | "sent" | "delivered" | "seen";
  showChevron?: boolean;
  isEdited: boolean;
  messageRepliedTo?: Message;
  createdAt?: string | number;
  updatedAt: string | number;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  _id: string;
  me: Contact;
  contact: Contact;
  lastMessage: Message;
  createdAt: string;
  updatedAt: string;
  chatable: boolean;
  unreadCount?: {
    [key: string]: number;
  };
}

export interface UnreadCount {
  [key: string]: number;
}
