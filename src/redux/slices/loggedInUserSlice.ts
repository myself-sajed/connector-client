import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActiveState {
  user: string | null | undefined;
}

const initialState: ActiveState = {
  user: null,
};

export const userSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
