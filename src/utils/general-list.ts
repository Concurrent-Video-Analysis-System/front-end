import { useHttp } from "./http";
import { useDispatch } from "react-redux";
import { generalListSlice } from "screens/main/general-list.slice";
import { message } from "antd";
import { useEffect } from "react";

export const useGeneralLists = (lists: string[]) => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    lists.forEach((item) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sendHttp]);
};

export const useUpdateGeneralLists = (listToUpdate: string[]) => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();

  return async () => {
    await Promise.all(
      listToUpdate.map(
        (item) =>
          new Promise((resolve, reject) => {
            sendHttp(item, { method: "GET", data: {} })
              .then((response) => {
                dispatch(
                  generalListSlice.actions.set({
                    key: item,
                    list: response.data,
                  })
                );
                resolve(response);
              })
              .catch((errorMessage) => {
                message.error(`获取列表时出错：${errorMessage}`).then(null);
                reject(errorMessage);
              });
          })
      )
    );
  };
};
