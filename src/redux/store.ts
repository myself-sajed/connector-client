import { configureStore } from "@reduxjs/toolkit";
import activeSlice from "./slices/activeSlice";
import loggedInUserSlice from "./slices/loggedInUserSlice";

export const store = configureStore({
  reducer: {
    active: activeSlice,
    user: loggedInUserSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
