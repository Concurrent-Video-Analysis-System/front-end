import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  locationSlice,
  selectLocationReducer,
} from "../../screens/main/device/location.slice";

export const useFetchLocation = () => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();
  const locationSelector = useSelector(selectLocationReducer);
  useEffect(() => {
    sendHttp("location", { method: "GET", data: {} })
      .then((data) => {
        if (
          JSON.stringify(data.data) !==
          JSON.stringify(locationSelector.locationList)
        ) {
          dispatch(locationSlice.actions.set(data.data));
        }
      })
      .catch((errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
