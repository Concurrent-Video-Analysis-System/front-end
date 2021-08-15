import { useDispatch, useSelector } from "react-redux";
import { TaskProps, taskSlice } from "../task.slice";
import { useEffect } from "react";

export const taskTemplate: TaskProps[] = [
  {
    id: 1,
    name: "每日检查任务",
    from: "2021-08-14",
    to: "2021-08-16",
    isEverydayTask: false,
    deviceId: [1, 2, 3, 4],
    reasonId: [1, 2, 3],
    state: "processing",
  },
  {
    id: 2,
    name: "日终封箱",
    from: "17:00:00",
    to: "18:00:00",
    isEverydayTask: true,
    deviceId: [1, 2, 3, 4],
    reasonId: [4],
    state: "pending",
  },
];

export const useDebugTask = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskSlice.actions.set(taskTemplate));
  }, [dispatch]);
};
