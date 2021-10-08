import { useHttp } from "./http";
import { RecordItemProps } from "screens/main/record/content";

export const useRecord = () => {
  const sendHttp = useHttp();

  return async (id: number) => {
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
  };
};
