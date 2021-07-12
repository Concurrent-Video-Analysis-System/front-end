import { configureStore } from "@reduxjs/toolkit";
import { screensCountSlice } from "screens/surveillance/surveillance.slice";

export const rootReducer = {
  screensCountReducer: screensCountSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
