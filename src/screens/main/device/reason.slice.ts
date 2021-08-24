import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface ReasonProps {
  id: number;
  name: string;
}

interface State {
  reasonList: ReasonProps[];
  isLoading: boolean;
}

const initialState: State = {
  reasonList: [],
  isLoading: false,
};

export const reasonSlice = createSlice({
  name: "reasonSlice",
  initialState: initialState,
  reducers: {
    set(state, action) {
      state.reasonList = action.payload;
    },
    append(state, action) {
      state.reasonList = [...state.reasonList, action.payload];
    },
    clear(state) {
      state.reasonList = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const selectReasonReducer = (state: RootState) => state.reasonReducer;
