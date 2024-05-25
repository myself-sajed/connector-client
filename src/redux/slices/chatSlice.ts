import { Chat, Contact } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  storeChats: Chat[];
}

const initialState: ChatState = {
  storeChats: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setStoreChats: (state, action: PayloadAction<Chat[]>) => {
      state.storeChats = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStoreChats } = chatSlice.actions;

export default chatSlice.reducer;
