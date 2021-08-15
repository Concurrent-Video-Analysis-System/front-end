import { configureStore } from "@reduxjs/toolkit";
import { recordlistSlice } from "screens/main/recordlist.slice";
import { recordfilterSlice } from "screens/main/recordfilter.slice";
import { navigateSlice } from "screens/main/record/navigate.slice";
import { deviceSlice } from "screens/main/device/device.slice";
import { locationSlice } from "screens/main/device/location.slice";
import { taskSlice } from "screens/main/task/task.slice";

export const rootReducer = {
  recordlistReducer: recordlistSlice.reducer,
  recordfilterReducer: recordfilterSlice.reducer,
  navigateReducer: navigateSlice.reducer,
  deviceReducer: deviceSlice.reducer,
  locationReducer: locationSlice.reducer,
  taskReducer: taskSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
