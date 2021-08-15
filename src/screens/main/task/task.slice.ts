import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface TaskProps {
  id: number;
  name: string;
  from: string;
  to: string;
  isEverydayTask: boolean;
  deviceId: number[];
  reasonId: number[];
}

interface State {
  taskList: TaskProps[];
  isLoading: boolean;
}

const initialState: State = {
  taskList: [],
  isLoading: false,
};

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState: initialState,
  reducers: {
    set(state, action) {
      state.taskList = action.payload;
    },
    append(state, action) {
      state.taskList = [...state.taskList, action.payload];
    },
    clear(state) {
      state.taskList = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const selectTaskReducer = (state: RootState) => state.taskReducer;
