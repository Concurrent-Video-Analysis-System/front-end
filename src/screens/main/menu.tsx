import { Menu } from "antd";
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
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuProps } from "rc-menu/lib/Menu";
import { locationTree } from "../../components/navigate/titile";

export interface MenuNavigatorProps extends MenuProps {
  width?: string;
  height?: string;
}

export const MenuNavigator = (props: MenuProps) => {
  const iconStyle = { fontSize: "1.8rem" };
  const location = useLocation();
  const navigate = useNavigate();
  const [menuSelectedItem, setMenuSelectedItem] = useState("");

  useEffect(() => {
    setMenuSelectedItem(location.pathname);
  }, [location]);

  const onMenuItemSelected = (item: MenuInfo) => {
    setMenuSelectedItem(item.key);
    navigate(item.key);
  };

  const tree = { ...locationTree };

  return (
    <Menu
      style={{ width: "100%", height: "100%" }}
      defaultOpenKeys={["list", "filter"]}
      theme={"dark"}
      selectedKeys={[menuSelectedItem]}
      mode={"inline"}
      inlineCollapsed={false}
      onClick={onMenuItemSelected}
      {...props}
    >
      <Menu.Item
        key={"/dashboard"}
        title={"数据总览"}
        icon={<LineChartOutlined style={iconStyle} />}
      >
        数据总览
      </Menu.Item>

      <Menu.SubMenu
        key={"device-menu"}
        title={"设备管理"}
        icon={<GoldOutlined style={iconStyle} />}
      >
        <Menu.Item
          key={"/device"}
          title={"摄像头管理"}
          icon={<CameraOutlined style={iconStyle} />}
        >
          摄像头管理
        </Menu.Item>
        <Menu.Item
          key={"/device/location"}
          title={"网点管理"}
          icon={<EnvironmentOutlined style={iconStyle} />}
        >
          网点管理
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key={"task-menu"}
        title={"监察任务管理"}
        icon={<ScheduleOutlined style={iconStyle} />}
      >
        <Menu.Item
          key={"/task/realtime"}
          title={"实时监控分析"}
          icon={<VideoCameraOutlined style={iconStyle} />}
        >
          实时监控分析
        </Menu.Item>
        <Menu.Item
          key={"/task/history"}
          title={"历史录像分析"}
          icon={<SaveOutlined style={iconStyle} />}
        >
          历史录像分析
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        key={"/record"}
        title={"违规记录管理"}
        icon={<ExceptionOutlined style={iconStyle} />}
      >
        违规记录管理
      </Menu.Item>

      <Menu.SubMenu
        key={"system-menu"}
        title={"系统管理"}
        icon={<SettingOutlined style={iconStyle} />}
      >
        <Menu.Item
          key={"/user"}
          title={"用户信息"}
          icon={<UserOutlined style={iconStyle} />}
        >
          用户信息
        </Menu.Item>
        <Menu.Item
          key={"/settings"}
          title={"分析配置"}
          icon={<ControlOutlined style={iconStyle} />}
        >
          分析配置
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
