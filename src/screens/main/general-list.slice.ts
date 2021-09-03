import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface ListState {
  generalList: { [key in string]: unknown[] };
}

export const generalListSlice = createSlice({
  name: "GeneralListSlice",
  initialState: {
    generalList: {},
  } as ListState,
  reducers: {
    set(state, action) {
      state.generalList[action.payload.key] = action.payload.list;
    },
    remove(state, action) {
      delete state.generalList[action.payload.key];
    },
  },
});

export const selectGeneralListReducer = (state: RootState) =>
  state.generalListReducer;
