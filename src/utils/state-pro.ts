import { useCallback, useState } from "react";

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

// FIXME
export const usePartialState = <T extends object>(
  initialState?: Partial<T>
) => {
  const [state, setState] = useState<Partial<T> | undefined>(initialState);
  const setPartialState = useCallback((key: keyof T, value: unknown) => {
    setState((state) => ({ ...state, [key]: value }));
  }, []);
  return [state, setPartialState] as [
    Partial<T> | undefined,
    (key: keyof T, value: unknown) => void
  ];
};
