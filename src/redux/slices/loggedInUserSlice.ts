import { Contact } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActiveState {
  user: Contact | null | undefined;
}

const initialState: ActiveState = {
  user: null,
};

export const userSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<Contact | null>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
