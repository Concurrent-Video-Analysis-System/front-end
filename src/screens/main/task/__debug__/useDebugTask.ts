import { useDispatch } from "react-redux";
import { TaskItemProps, taskSlice } from "../task.slice";
import { useEffect } from "react";

export const taskTemplate: TaskItemProps[] = [
  {
    id: 1,
    name: "每日检查任务",
    from: "2021-08-14 10:00:00",
    to: "2021-08-16 12:00:00",
    device: [
      {
        id: 1,
        name: "三号门口",
      },
      {
        id: 2,
        name: "五号门口",
      },
    ],
    reason: [
      {
        id: 1,
        name: "离岗未锁屏",
      },
    ],
    state: "start",
  },
  {
    id: 2,
    name: "日终封箱",
    from: "2021-08-15 17:00:00",
    to: "2021-08-18 18:00:00",
    device: [
      {
        id: 1,
        name: "三号门口",
      },
      {
        id: 2,
        name: "五号门口",
      },
    ],
    reason: [
      {
        id: 1,
        name: "离岗未锁屏",
      },
    ],
    state: "pause",
  },
  {
    id: 3,
    name: "手机拍屏违规检测",
    from: "2021-08-19 15:00:00",
    to: "2021-08-19 16:00:00",
    device: [
      {
        id: 1,
        name: "三号门口",
      },
      {
        id: 2,
        name: "五号门口",
      },
    ],
    reason: [
      {
        id: 1,
        name: "手机拍照",
      },
    ],
    state: "start",
  },
  {
    id: 4,
    name: "日终封箱",
    from: "2021-08-15 17:00:00",
    to: "2021-08-18 18:00:00",
    device: [
      {
        id: 1,
        name: "三号门口",
      },
      {
        id: 2,
        name: "五号门口",
      },
    ],
    reason: [
      {
        id: 1,
        name: "离岗未锁屏",
      },
    ],
    state: "pause",
  },
];

export const useDebugTask = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskSlice.actions.set(taskTemplate));
  }, [dispatch]);
};
