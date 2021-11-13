import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export const selectedDeviceSlices = createSlice({
  name: "SelectedDeviceSlice",
  initialState: {
    id: [] as number[],
  },
  reducers: {
    set(state, action) {
      state.id = action.payload;
    },
  },
});

export const selectSelectedDeviceReducer = (state: RootState) =>
  state.selectedDeviceReducer;
