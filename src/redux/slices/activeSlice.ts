import { activities, tabs } from "@/lib/constants";
import { Contact, Message } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelectedChat {
  _id?: string | null;
  me?: Contact;
  unreadCount?: {
    [key: string]: number;
  };
  contact?: Contact;
  lastMessage?: Message | null;
  createdAt?: String | null;
  updatedAt?: String | null;
  openChatSection: boolean;
  generateChatId?: boolean;
}

export interface ActiveState {
  currentTab: string;
  currentActivity: string;
  selectedContact: Contact | null;
  selectedChat: SelectedChat | null;
}

const initialState: ActiveState = {
  currentTab: tabs.CHATS,
  currentActivity: activities.CHAT,
  selectedContact: null,
  selectedChat: null,
};

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },

    setContact: (state, action: PayloadAction<Contact | null>) => {
      state.selectedContact = action.payload;
    },

    setSelectedChat: (state, action: PayloadAction<SelectedChat | null>) => {
      state.selectedChat = action.payload;
    },

    setCurrentActivity: (state, action: PayloadAction<string>) => {
      state.currentActivity = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentTab,
  setContact,
  setSelectedChat,
  setCurrentActivity,
} = activeSlice.actions;

export default activeSlice.reducer;
