import { Checkbox, Layout, Menu } from "antd";
import { useDebugDeviceLocation } from "./__debug__/__debug_add_device__";
import styled from "@emotion/styled";
import { DeviceAside } from "./aside";

export const DeviceFragment = () => {
  useDebugDeviceLocation();

  return (
    <Container>
      <Aside>
        <DeviceAside />
      </Aside>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: "aside content";
  grid-template-columns: 40rem 1fr;
  height: 100%;
`;

const Aside = styled.div`
  grid-area: aside;
`;
