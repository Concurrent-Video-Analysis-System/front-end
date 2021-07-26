import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface ListItem {
  id: number;
  name: string;
}

interface State {
  locationList: ListItem[];
  reasonList: ListItem[];
  from?: string;
  to?: string;
}

const initialState: State = {
  locationList: [],
  reasonList: [],
  from: undefined,
  to: undefined,
};

export const recordfilterSlice = createSlice({
  name: "recordfilterSlice",
  initialState: initialState,
  reducers: {
    setFilter(state, action) {
      switch (action.payload.name) {
        case "location":
          state.locationList = action.payload.value;
          break;
        case "reason":
          state.reasonList = action.payload.value;
          break;
        case "from":
          state.from = action.payload.value;
          break;
        case "to":
          state.to = action.payload.value;
          break;
      }
    },
  },
});

export const selectRecordfilterReducer = (state: RootState) =>
  state.recordfilterReducer;
