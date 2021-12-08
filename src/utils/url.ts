import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

/**
 * Clear `null`, `undefined` and empty string (`''`) in the given object.
 * @param origin The object to be clear.
 */
export const cleanObject = (origin: { [key in string]?: unknown }) => {
  return Object.entries(origin).reduce((prev, [key, value]) => {
    return value === null || value === undefined || value === ""
      ? prev
      : { [key]: value, ...prev };
  }, {} as { [key in string]: unknown });
};

export const useUrlQueryParams = <K extends string>(keys: string[]) => {
  // Parse params from URL. "searchParams" is the container of all
  // params it have parsed, and "setSearchParams" is a function that
  // provides an interface to modify those params in URL.
  const [searchParams, setSearchParams] = useSearchParams();

  // The reduce function extracts keys from the formal parameter "key",
  // then get the corresponding value and combines into pairs; Keys not
  // found will combines "". Returns an object containing all the pairs.

  // Without "useMemo", "parsedParams" will be generated as a new object
  // for each rendering process, which will cause infinity loop if used
  // as a dependency. "useMemo" guarantees that new values will only be
  // generated when "searchParams" changes, thereby the situation above
  // is avoided.
  const parsedParams = useMemo(
    () =>
      keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      }, {} as { [key in K]: string }),
    [keys, searchParams]
  );

  // To ensure the params passed to "setParsedParams" is in type K,
  // and clean the null, undefined values and empty string in params.
  const setParsedParams = useCallback(
    (params: Partial<{ [key in K]: unknown }>) => {
      // `...params` overwrites keys in the origin object
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      console.log(o);
      if (
        Object.keys(o).length === 0 &&
        Object.keys(cleanObject(parsedParams)).length === 0
      ) {
        console.log("not changed");
        return null;
      }
      setSearchParams(o);
    },
    [parsedParams, searchParams, setSearchParams]
  );

  return [parsedParams, setParsedParams] as const;
};
