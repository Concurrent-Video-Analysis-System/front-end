import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DeviceProps, deviceSlice } from "../device.slice";
import { LocationProps, locationSlice } from "../location.slice";

const locationTemplate: LocationProps[] = [
  {
    id: 1,
    name: "山东路网点",
    location: "山东省青岛市市北区XX街XX号",
    device_count: 12,
  },
  {
    id: 2,
    name: "枝江路网点",
    location: "山东省青岛市崂山区XX号",
    device_count: 8,
  },
  {
    id: 3,
    name: "山东大学网点",
    location: "山东省青岛市即墨区鳌山卫XX号",
    device_count: 5,
  },
  {
    id: 4,
    name: "青岛路网点",
    location: "山东省青岛市即墨区鳌山卫XX号",
    device_count: 5,
  },
];

const deviceTemplate: DeviceProps[] = [
  {
    id: 1,
    location: {
      id: 1,
      name: "山东路网点",
    },
    name: "3号门口",
    rtsp: "rtsp://shandong/door#3",
  },
  {
    id: 2,
    location: {
      id: 1,
      name: "山东路网点",
    },
    name: "5号门口",
    rtsp: "rtsp://shandong/door#5",
  },
  {
    id: 3,
    location: {
      id: 1,
      name: "山东路网点",
    },
    name: "西ATM机1号",
    rtsp: "rtsp://shandong/west_atm#1",
  },
  {
    id: 4,
    location: {
      id: 1,
      name: "山东路网点",
    },
    name: "西ATM机2号",
    rtsp: "rtsp://shandong/west_atm#2",
  },
  {
    id: 5,
    location: {
      id: 2,
      name: "枝江路网点",
    },
    name: "北70号门口",
    rtsp: "rtsp://zhi-jiang/n70",
  },
  {
    id: 6,
    location: {
      id: 2,
      name: "枝江路网点",
    },
    name: "接线图1号",
    rtsp: "rtsp://zhi-jiang/jxt",
  },
  {
    id: 7,
    location: {
      id: 2,
      name: "枝江路网点",
    },
    name: "消防通道1号",
    rtsp: "rtsp://shandong/bjx",
  },
  {
    id: 8,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 9,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 10,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 11,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 12,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 13,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 14,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 15,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
  {
    id: 16,
    location: {
      id: 3,
      name: "山东大学网点",
    },
    name: "N3-203",
    rtsp: "rtsp://sdu/n3-203",
  },
];

export const useDebugDeviceLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deviceSlice.actions.set(deviceTemplate));
    dispatch(locationSlice.actions.set(locationTemplate));
  }, []);
};
