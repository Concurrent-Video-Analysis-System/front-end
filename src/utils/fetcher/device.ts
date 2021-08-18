import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deviceSlice,
  selectDeviceReducer,
} from "screens/main/device/device.slice";

export const useFetchDevice = () => {
  const sendHttp = useHttp("device");
  const dispatch = useDispatch();
  const deviceSelector = useSelector(selectDeviceReducer);
  useEffect(() => {
    sendHttp(
      { method: "GET", data: {} },
      (data) => {
        if (
          JSON.stringify(data.data) !==
          JSON.stringify(deviceSelector.deviceList)
        ) {
          dispatch(deviceSlice.actions.set(data.data));
        }
      },
      (errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`);
      }
    );
  }, []);
};
