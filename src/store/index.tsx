import { configureStore } from "@reduxjs/toolkit";
import { recordlistSlice } from "screens/main/recordlist.slice";
import { recordfilterSlice } from "screens/main/recordfilter.slice";
import { navigateSlice } from "screens/main/record/navigate.slice";

export const rootReducer = {
  recordlistReducer: recordlistSlice.reducer,
  recordfilterReducer: recordfilterSlice.reducer,
  navigateReducer: navigateSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
