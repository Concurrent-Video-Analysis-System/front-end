import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deviceSlice,
  selectDeviceReducer,
} from "screens/main/device/device.slice";

export const useFetchDevice = () => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();
  const deviceSelector = useSelector(selectDeviceReducer);
  useEffect(() => {
    sendHttp("device", { method: "GET", data: {} })
      .then((data) => {
        if (
          JSON.stringify(data.data) !==
          JSON.stringify(deviceSelector.deviceList)
        ) {
          dispatch(deviceSlice.actions.set(data.data));
        }
      })
      .catch((errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
