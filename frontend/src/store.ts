import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./Slices/nameSlice";
import generalSlice from "./Slices/generalSlice";
import electrifiedSlice from "./Slices/electrifiedSlice";
import conventionalSlice from "./Slices/conventionalSlice";

export const store = configureStore({
  reducer: {
    name: nameSlice,
    general: generalSlice,
    electrified: electrifiedSlice,
    conventional: conventionalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
