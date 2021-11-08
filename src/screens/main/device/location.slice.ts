import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface LocationProps {
  id: number;
  name: string;
  location: string;
}

interface State {
  locationList: LocationProps[];
  isLoading: boolean;
}

const initialState: State = {
  locationList: [],
  isLoading: false,
};

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: initialState,
  reducers: {
    set(state, action) {
      state.locationList = action.payload;
    },
    append(state, action) {
      state.locationList = [...state.locationList, action.payload];
    },
    clear(state) {
      state.locationList = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const selectLocationReducer = (state: RootState) =>
  state.locationReducer;
