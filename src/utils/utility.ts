export const toStringOrUndefined = (value: unknown) => {
  if (value == null || value === "") {
    // or value == undefined
    return undefined;
  } else {
    return String(value);
  }
};
