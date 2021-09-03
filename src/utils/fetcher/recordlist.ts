import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  recordlistSlice,
  selectRecordlistReducer,
} from "screens/main/recordlist.slice";

export const useFetchRecordList = (filter: object) => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();
  const recordlistSelector = useSelector(selectRecordlistReducer);
  useEffect(() => {
    sendHttp("recordlist", { method: "GET", data: filter })
      .then((data) => {
        if (
          JSON.stringify(data.data) !==
          JSON.stringify(recordlistSelector.recordlist)
        ) {
          dispatch(recordlistSlice.actions.set(data.data));
        }
      })
      .catch((errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};
