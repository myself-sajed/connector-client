import { tabs } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActiveState {
  currentTab: string;
}

const initialState: ActiveState = {
  currentTab: tabs.CHATS,
};

export const counterSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentTab } = counterSlice.actions;

export default counterSlice.reducer;
