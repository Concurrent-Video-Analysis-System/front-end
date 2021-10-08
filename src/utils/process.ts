import { useHttp } from "./http";
import { message } from "antd";

export const useProcess = () => {
  const sendHttp = useHttp();

  return async (id: number, processType: string) => {
    sendHttp("recordlist/handle", {
      data: { id: id, type: processType },
      method: "POST",
    })
      .then(() => {
        message.success(`操作成功`).then(null);
        return Promise.resolve();
      })
      .catch((errorMessage) => {
        message.error(`操作失败：${errorMessage}`).then(null);
        return Promise.reject(errorMessage);
      });
  };
};
