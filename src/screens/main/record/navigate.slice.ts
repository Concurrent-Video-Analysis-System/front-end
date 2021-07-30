import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface NavigateItem {
  name: string;
  path: string;
}

export const navigateSlice = createSlice({
  name: "navigateSlice",
  initialState: { navigateList: [] as NavigateItem[] },
  reducers: {
    moveTo(state, action) {
      state.navigateList = [...state.navigateList, action.payload];
    },
    back(state) {
      state.navigateList = state.navigateList.slice(0, -1);
    },
    home(state) {
      state.navigateList = [];
    },
  },
});

export const selectNavigateReducer = (state: RootState) =>
  state.navigateReducer;
