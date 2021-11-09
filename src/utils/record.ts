import { useHttp } from "./http";
import { RecordItemProps } from "screens/main/record/content";
import { useCallback } from "react";

export const useRecord = () => {
  const sendHttp = useHttp();

  return useCallback(
    async (id: number) => {
      return sendHttp("record", {
        data: { id },
        method: "GET",
      })
        .then((data) => {
          return Promise.resolve(data.data as RecordItemProps);
        })
        .catch((errorMessage) => {
          return Promise.reject(errorMessage);
        });
    },
    [sendHttp]
  );
};
