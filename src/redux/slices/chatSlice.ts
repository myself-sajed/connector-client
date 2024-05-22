import { Chat, Contact } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
