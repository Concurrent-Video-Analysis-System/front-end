import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  reasonSlice,
  selectReasonReducer,
} from "screens/main/device/reason.slice";

export const useFetchReason = () => {
  const sendHttp = useHttp("reason");
  const dispatch = useDispatch();
  const reasonSelector = useSelector(selectReasonReducer);
  useEffect(() => {
    sendHttp(
      { method: "GET", data: {} },
      (data) => {
        if (
          JSON.stringify(data.data) !==
          JSON.stringify(reasonSelector.reasonList)
        ) {
          dispatch(reasonSlice.actions.set(data.data));
        }
      },
      (errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`);
      }
    );
  }, []);
};
