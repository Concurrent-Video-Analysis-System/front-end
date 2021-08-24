import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface DeviceProps {
  id: number;
  location: {
    id: number;
    name: string;
  };
  name: string;
  rtsp: string;
}

interface State {
  deviceList: DeviceProps[];
  isLoading: boolean;
}

const initialState: State = {
  deviceList: [],
  isLoading: false,
};

export const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState: initialState,
  reducers: {
    set(state, action) {
      state.deviceList = action.payload;
    },
    append(state, action) {
      state.deviceList = [...state.deviceList, action.payload];
    },
    clear(state) {
      state.deviceList = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const selectDeviceReducer = (state: RootState) => state.deviceReducer;
