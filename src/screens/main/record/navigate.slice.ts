import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface NavigateItem {
  name: string;
  path: string;
}

export const navigateSlice = createSlice({
  name: "navigateSlice",
  initialState: [] as NavigateItem[],
  reducers: {
    moveTo(state, action) {
      state = [...state, action.payload];
    },
    back(state) {
      state = [...state].slice(0, -1);
    },
    home(state) {
      state = [];
    },
  },
});

export const selectNavigateReducer = (state: RootState) =>
  state.navigateReducer;
