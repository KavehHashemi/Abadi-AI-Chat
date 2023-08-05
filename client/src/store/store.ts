import { configureStore } from "@reduxjs/toolkit";
import setReducer from "./sets";
import modeReducer from "./mode";

export const store = configureStore({
  reducer: {
    sets: setReducer,
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
