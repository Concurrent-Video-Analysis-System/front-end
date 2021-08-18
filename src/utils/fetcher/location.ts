import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  locationSlice,
  selectLocationReducer,
} from "../../screens/main/device/location.slice";

export const useFetchLocation = () => {
  const sendHttp = useHttp("location");
  const dispatch = useDispatch();
  const locationSelector = useSelector(selectLocationReducer);
  useEffect(() => {
    sendHttp(
      { method: "GET", data: {} },
      (data) => {
        if (
          JSON.stringify(data.data) !==
          JSON.stringify(locationSelector.locationList)
        ) {
          dispatch(locationSlice.actions.set(data.data));
        }
      },
      (errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`);
      }
    );
  }, []);
};
