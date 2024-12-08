import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./Slices/nameSlice";

export const store = configureStore({
  reducer: {
    name: nameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
