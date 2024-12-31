import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./Slices/nameSlice";
import generalSlice from "./Slices/generalSlice";

export const store = configureStore({
  reducer: {
    name: nameSlice,
    general: generalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
