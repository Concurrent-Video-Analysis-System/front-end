import { useCallback, useEffect, useState } from "react";
import { useHttp } from "./http";

export const useProgress = (
  fetchEndpoint: string,
  taskId: number,
  interval: number
) => {
  const [progress, setProgress] = useState<string | undefined>();
  const sendHttp = useHttp();

  const updateProgress = useCallback(() => {
    sendHttp(fetchEndpoint, { method: "GET", data: { id: taskId } })
      .then(async (response) => {
        setProgress(response.data.state);
        return response.data;
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        return Promise.reject(errorMessage);
      });
  }, [fetchEndpoint, sendHttp, taskId]);

  useEffect(() => {
    updateProgress();
    const intervalId = setInterval(updateProgress, interval);
    return () => clearInterval(intervalId);
  }, [fetchEndpoint, interval, taskId, updateProgress]);

  return progress;
};
