import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface TaskDataProps {
  totalNum: number;
  tasks: TaskItemProps[];
}

export interface TaskItemProps {
  id: number;
  name: string;
  from: string;
  to: string;
  // isEverydayTask?: boolean;
  device: {
    id: number;
    name: string;
  }[];
  reason: {
    id: number;
    name: string;
  }[];
  state: string;
}

interface State {
  taskList: TaskItemProps[];
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
