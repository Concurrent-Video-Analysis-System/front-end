export const getKey = (localStorageKey: string): string | null => {
  return window.localStorage.getItem(localStorageKey);
};

export const setKey = (
  localStorageKey: string,
  value: string | undefined | null
) => {
  if (typeof value === "string") {
    window.localStorage.setItem(localStorageKey, value);
  } else {
    clearKey(localStorageKey);
  }
};

export const clearKey = (localStorageKey: string) => {
  window.localStorage.removeItem(localStorageKey);
};
