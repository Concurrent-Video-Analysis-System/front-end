import { Menu } from "antd";
import {
  CameraOutlined,
  ControlOutlined,
  EnvironmentOutlined,
  ExceptionOutlined,
  GoldOutlined,
  HddOutlined,
  LineChartOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuProps } from "rc-menu/lib/Menu";

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
    const primaryPathname = location.pathname.split("/").slice(0, 3).join("/");
    setMenuSelectedItem(primaryPathname);
  }, [location]);

  const onMenuItemSelected = (item: MenuInfo) => {
    setMenuSelectedItem(item.key);
    navigate(item.key);
  };

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
        title={"资源管理"}
        icon={<GoldOutlined style={iconStyle} />}
      >
        <Menu.Item
          key={"/asset/location"}
          title={"网点管理"}
          icon={<EnvironmentOutlined style={iconStyle} />}
        >
          网点管理
        </Menu.Item>
        <Menu.Item
          key={"/asset/nvr"}
          title={"NVR 管理"}
          icon={<HddOutlined style={iconStyle} />}
        >
          NVR 管理
        </Menu.Item>
        <Menu.Item
          key={"/asset/device"}
          title={"摄像头管理"}
          icon={<CameraOutlined style={iconStyle} />}
        >
          摄像头管理
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        key={"/task"}
        title={"监察任务管理"}
        icon={<ScheduleOutlined style={iconStyle} />}
      >
        监察任务管理
      </Menu.Item>

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
