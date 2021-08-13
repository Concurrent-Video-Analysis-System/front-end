import { Checkbox, Layout, Menu } from "antd";
import { useDebugDeviceLocation } from "./__debug__/__debug_add_device__";
import styled from "@emotion/styled";
import { DeviceAside } from "./aside";

export const DeviceFragment = () => {
  useDebugDeviceLocation();

  return (
    <Layout>
      <DeviceAside />
    </Layout>
  );
};
