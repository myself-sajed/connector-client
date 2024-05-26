export interface Message {
  _id: string;
  author: Contact;
  text: string | null;
  filename: string | null;
  type: string;
  chatId: string;
  status: "sent" | "delivered" | "seen";
  createdAt: string;
  updatedAt: string;
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
