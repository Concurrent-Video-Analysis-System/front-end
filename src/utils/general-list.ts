import { useHttp } from "./http";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generalListSlice } from "screens/main/general-list.slice";
import { message } from "antd";

export const useGeneralLists = (listItems: string[]) => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();
  useEffect(() => {
    listItems.forEach((item) => {
      sendHttp(item, { method: "GET", data: {} })
        .then((response) =>
          dispatch(
            generalListSlice.actions.set({
              key: item,
              list: response.data,
            })
          )
        )
        .catch((errorMessage) =>
          message.error(`获取列表时出错：${errorMessage}`).then(null)
        );
    });
  }, [listItems]);
};
