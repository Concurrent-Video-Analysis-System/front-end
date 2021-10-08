import { useState } from "react";

/*export const useRemovableState = <T>(
  initialState: T[],
  isEqual?: (a: T, b: T) => boolean
) => {
  const [state, setState] = useState(initialState);
  const removeState = (itemToRemove: T) => {
    if (isEqual) {
      setState(state.filter((item) => !isEqual(item, itemToRemove)));
    } else {
      setState(state.filter((item) => item !== itemToRemove));
    }
  };
  return [state, removeState, setState] as const;
};*/

export const usePartialState = <T extends object>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const setPartialState = (partialState: Partial<T>) => {
    if (partialState) {
      setState({ ...state, ...partialState });
    }
  };
  return [state, setPartialState] as const;
};
