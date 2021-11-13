import { useHttp } from "./http";
import { useCallback } from "react";
import moment from "moment";

export const useExport = () => {
  const sendHttp = useHttp();
  return useCallback(
    (recordIdList: number[]) => {
      return sendHttp(
        "export",
        {
          method: "POST",
          data: {
            idList: recordIdList,
          },
        },
        "blob"
      ).then((response) => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(response);
        a.href = url;
        a.download = `${moment().format("YYYYMMDD_HH-mm-ss")}的导出记录.xls`;
        a.style.display = "none";
        a.click();
        window.URL.revokeObjectURL(url);
      });
    },
    [sendHttp]
  );
};
