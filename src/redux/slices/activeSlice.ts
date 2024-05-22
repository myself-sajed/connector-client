import { tabs } from "@/lib/constants";
import { Contact } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelectedChatUser extends Contact {
  chatId: string;
}

export interface ActiveState {
  currentTab: string;
  selectedContact: SelectedChatUser | null;
}

const initialState: ActiveState = {
  currentTab: tabs.CHATS,
  selectedContact: null,
};

export const counterSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },

    setContact: (state, action: PayloadAction<SelectedChatUser>) => {
      state.selectedContact = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentTab, setContact } = counterSlice.actions;

export default counterSlice.reducer;
