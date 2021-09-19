import React from "react";
import {
  CameraOutlined,
  ControlOutlined,
  EnvironmentOutlined,
  ExceptionOutlined,
  GoldOutlined,
  LineChartOutlined,
  SaveOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const findNodeInTree = (
  treeRootNode: LocationTreeNodeProps,
  predicate: (node: LocationTreeNodeProps) => unknown
): LocationTreeNodeProps | undefined => {
  if (predicate(treeRootNode)) {
    return treeRootNode;
  }
  return treeRootNode.children.find((node) => findNodeInTree(node, predicate));
};

export const location2title = (location: string) => {
  const tempRoot = {
    key: "",
    children: locationTree,
  };
  const result = findNodeInTree(tempRoot, (node) => {
    let keyLastSlice = node.key;
    if (typeof node.key === "string") {
      const keySlice = node.key.split("/");
      keyLastSlice = keySlice[keySlice.length - 1];
    }
    console.log(
      keyLastSlice,
      location,
      keyLastSlice === location || keyLastSlice === "/" + location
    );
    return keyLastSlice === location || keyLastSlice === "/" + location;
  });

  console.log(location, result);

  if (!result || result === tempRoot) return undefined;
  return result.title;
};

export interface LocationTreeNodeProps {
  key: React.Key;
  title?: string;
  icon?: JSX.Element;
  children: LocationTreeNodeProps[];
}

export const locationTree: LocationTreeNodeProps[] = [
  {
    key: "/dashboard",
    title: "数据总览",
    icon: <LineChartOutlined />,
    children: [],
  },
  {
    key: "/device",
    title: "设备管理",
    icon: <GoldOutlined />,
    children: [
      {
        key: "/device",
        title: "摄像头管理",
        icon: <CameraOutlined />,
        children: [],
      },
      {
        key: "/device/location",
        title: "网点管理",
        icon: <EnvironmentOutlined />,
        children: [],
      },
    ],
  },
  {
    key: "/task",
    title: "监察任务管理",
    icon: <ScheduleOutlined />,
    children: [
      {
        key: "/task/realtime",
        title: "实时监控分析",
        icon: <VideoCameraOutlined />,
        children: [],
      },
      {
        key: "/task/history",
        title: "历史录像分析",
        icon: <SaveOutlined />,
        children: [],
      },
    ],
  },
  {
    key: "/record",
    title: "违规记录管理",
    icon: <ExceptionOutlined />,
    children: [],
  },
  {
    key: "/system",
    title: "系统管理",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/user",
        title: "用户信息",
        icon: <UserOutlined />,
        children: [],
      },
      {
        key: "/settings",
        title: "分析配置",
        icon: <ControlOutlined />,
        children: [],
      },
    ],
  },
];
