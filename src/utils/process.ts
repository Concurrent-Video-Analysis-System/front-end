import { useHttp } from "./http";

export interface RecordHandleProps {
  idList: number[];
  type: string;
}

export const useProcess = () => {
  const sendHttp = useHttp();

  return async (handleProps: RecordHandleProps) => {
    return sendHttp("recordlist/handle", {
      data: handleProps,
      method: "POST",
    });
  };
};
