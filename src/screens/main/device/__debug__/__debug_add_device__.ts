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
];

const deviceTemplate: DeviceProps[] = [
  {
    id: 1,
    location_id: 1,
    location_name: "山东路网点",
    viewport: "3号门口",
    rtsp: "rtsp://shandong/door#3",
  },
  {
    id: 2,
    location_id: 1,
    location_name: "山东路网点",
    viewport: "5号门口",
    rtsp: "rtsp://shandong/door#5",
  },
  {
    id: 3,
    location_id: 1,
    location_name: "山东路网点",
    viewport: "西ATM机1号",
    rtsp: "rtsp://shandong/west_atm#1",
  },
  {
    id: 4,
    location_id: 1,
    location_name: "山东路网点",
    viewport: "西ATM机2号",
    rtsp: "rtsp://shandong/west_atm#2",
  },
  {
    id: 5,
    location_id: 2,
    location_name: "枝江路网点",
    viewport: "北70号门口",
    rtsp: "rtsp://zhi-jiang/n70",
  },
  {
    id: 6,
    location_id: 2,
    location_name: "枝江路网点",
    viewport: "接线图1号",
    rtsp: "rtsp://zhi-jiang/jxt",
  },
  {
    id: 7,
    location_id: 2,
    location_name: "枝江路网点",
    viewport: "消防通道1号",
    rtsp: "rtsp://shandong/bjx",
  },
  {
    id: 8,
    location_id: 3,
    location_name: "山东大学网点",
    viewport: "N3-203",
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
