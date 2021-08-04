import { useHttp } from "./http";
import { useEffect, useState } from "react";
import { message } from "antd";

export const useProcess = (id?: number, onSuccess?: () => void) => {
  const sendHttp = useHttp("recordlist/handle");

  const [isLoading, setIsLoading] = useState(false);
  const [process, setProcess] = useState<string>();

  useEffect(() => {
    if (!process) {
      return;
    }
    setIsLoading(true);
    sendHttp(
      { data: { id: id, type: process }, method: "POST" },
      () => {
        setIsLoading(false);
        message.success(`操作成功`);
        if (onSuccess) {
          onSuccess();
        }
      },
      (errorMessage) => {
        setIsLoading(false);
        message.error(`操作失败：${errorMessage}`);
      }
    );
  }, [process]);

  return { isLoading, setProcess } as const;
};
