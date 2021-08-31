import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { RecordItemProps } from "./record/content";

interface State {
  recordlist: RecordItemProps[];
  isLoading: boolean;
}

const initialState: State = {
  recordlist: [],
  isLoading: false,
};

export const recordlistSlice = createSlice({
  name: "recordlistSlice",
  initialState: initialState,
  reducers: {
    set(state, action) {
      state.recordlist = action.payload;
    },
    append(state, action) {
      state.recordlist = [...state.recordlist, action.payload];
    },
    clear(state) {
      state.recordlist = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const selectRecordlistReducer = (state: RootState) =>
  state.recordlistReducer;
