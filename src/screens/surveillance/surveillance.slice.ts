import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  screensCount: number;
  screensShown: number[];
  camerasTotalCount: number;
}

const initialState: State = {
  screensCount: 9,
  screensShown: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  camerasTotalCount: 9,
};

const updateShownScreens = (state: State) => {
  const firstScreen = state.screensShown[0];
  let newScreensShown = [];
  for (let i = firstScreen; i < firstScreen + state.screensCount; ++i) {
    newScreensShown.push(i);
    if (i >= state.camerasTotalCount) {
      break;
    }
  }
  return newScreensShown;
};

export const screensCountSlice = createSlice({
  name: "screensCountSlice",
  initialState: initialState,
  reducers: {
    setScreensCount(state, action) {
      state.screensCount = action.payload;
      state.screensShown = updateShownScreens(state);
    },
    setShownScreens(state, action) {
      state.screensShown[0] = action.payload;
      state.screensShown = updateShownScreens(state);
    },
    setCameraTotalCount(state, action) {
      state.camerasTotalCount = action.payload;
      state.screensShown = updateShownScreens(state);
    },
  },
});

export const selectScreensCountProps = (state: RootState) =>
  state.screensCountReducer;
