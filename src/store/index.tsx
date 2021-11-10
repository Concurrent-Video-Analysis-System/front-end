import { configureStore } from "@reduxjs/toolkit";
import { recordlistSlice } from "screens/main/recordlist.slice";
import { recordfilterSlice } from "screens/main/recordfilter.slice";
import { navigateSlice } from "screens/main/record/navigate.slice";
import { deviceSlice } from "screens/main/device/device.slice";
import { locationSlice } from "screens/main/device/location.slice";
import { taskSlice } from "screens/main/task/task.slice";
import { reasonSlice } from "../screens/main/device/reason.slice";
import { generalListSlice } from "../screens/main/general-list.slice";
import { selectedDeviceSlices } from "../screens/main/device/device-select.slice";

export const rootReducer = {
  recordlistReducer: recordlistSlice.reducer,
  recordfilterReducer: recordfilterSlice.reducer,
  navigateReducer: navigateSlice.reducer,
  deviceReducer: deviceSlice.reducer,
  locationReducer: locationSlice.reducer,
  taskReducer: taskSlice.reducer,
  reasonReducer: reasonSlice.reducer,
  generalListReducer: generalListSlice.reducer,
  selectedDeviceReducer: selectedDeviceSlices.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
