import { useHttp } from "./http";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generalListSlice } from "screens/main/general-list.slice";

export const useGeneralLists = (listItems: string[]) => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();
  useEffect(() => {
    listItems.forEach((item) => {
      sendHttp(item, { method: "GET", data: {} })
        .then((response) =>
          dispatch(generalListSlice.actions.set(response.data))
        )
        .catch((message) =>
          message.error(`获取列表时出错：${message}`).then(null)
        );
    });
  }, [listItems]);
};
