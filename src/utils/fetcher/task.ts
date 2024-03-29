import { useHttp } from "../http";
import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTaskReducer,
  taskSlice,
} from "../../screens/main/task/task.slice";

export const useFetchTask = () => {
  const sendHttp = useHttp();
  const dispatch = useDispatch();
  const taskSelector = useSelector(selectTaskReducer);
  useEffect(() => {
    sendHttp("task", { method: "GET", data: {} })
      .then((data) => {
        if (
          JSON.stringify(data.data) !== JSON.stringify(taskSelector.taskList)
        ) {
          dispatch(taskSlice.actions.set(data.data));
        }
      })
      .then((errorMessage) => {
        message.error(`更新列表时出错：${errorMessage}`).then(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
