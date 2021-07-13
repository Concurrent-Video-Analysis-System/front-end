import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  screensCount: 1 | 4 | 9 | 16;
  screensShown: number[];
  camerasTotalCount: number;
}

const initialState: State = {
  screensCount: 9,
  screensShown: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  camerasTotalCount: 9,
};

const updateScreenState = (state: State) => {
  let newState = state;
  let firstScreen = newState.screensShown[0];
  newState.screensShown = [];

  // normalize border
  if (firstScreen > newState.camerasTotalCount - newState.screensCount) {
    firstScreen = newState.camerasTotalCount - newState.screensCount;
  }
  if (firstScreen < 0) {
    firstScreen = 0;
  }

  // generate screensShown list
  for (let i = firstScreen; i < firstScreen + newState.screensCount; i++) {
    if (i >= newState.camerasTotalCount) {
      break;
    }
    newState.screensShown.push(i);
  }
  return newState;
};

export const screensCountSlice = createSlice({
  name: "screensCountSlice",
  initialState: initialState,
  reducers: {
    setScreensCount(state, action) {
      state.screensCount = action.payload;
      state = updateScreenState(state);
    },
    setShownScreens(state, action) {
      state.screensShown[0] = action.payload;
      state = updateScreenState(state);
    },
    setCameraTotalCount(state, action) {
      state.camerasTotalCount = action.payload;
      state = updateScreenState(state);
    },
  },
});

export const selectScreensCountProps = (state: RootState) =>
  state.screensCountReducer;
