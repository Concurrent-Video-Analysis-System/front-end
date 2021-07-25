import { configureStore } from "@reduxjs/toolkit";
import { recordlistSlice } from "screens/main/recordlist.slice";

export const rootReducer = {
  recordlistReducer: recordlistSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
