import { useMemo } from "react";
import { cleanObject } from "./url";

export const useExactFilter = <K extends string>(
  originList: { [key in K]: unknown }[],
  filterParams: Partial<{ [key in K]: unknown }>,
  strict: boolean = false
) => {
  return useMemo(() => {
    const cleanedFilterParams = cleanObject(filterParams);
    return originList.filter((item) =>
      Object.entries(cleanedFilterParams).every(([key, value]) => {
        if (strict) {
          return item[key as K] === value;
        } else {
          if (Array.isArray(item[key as K])) {
            return (item[key as K] as { id: number; name: string }[]).find(
              (i) => value != null && +i.id === Number(value)
            );
          }
          return false;
        }
      })
    );
  }, [originList, filterParams]);
};

export const useConditionalFilter = <K extends string>(
  originList: { [key in K]?: unknown }[],
  filterCondition: (item: { [key in K]?: unknown }) => boolean
) => {
  return useMemo(() => {
    return originList.filter(filterCondition);
  }, [originList, filterCondition]);
};
