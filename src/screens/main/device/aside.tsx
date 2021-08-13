import { Checkbox, Layout, Menu } from "antd";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectDeviceReducer } from "./device.slice";
import { selectLocationReducer } from "./location.slice";

export const DeviceAside = () => {
  const dispatch = useDispatch();
  const deviceSelector = useSelector(selectDeviceReducer);
  const locationSelector = useSelector(selectLocationReducer);

  return (
    <FixedSider>
      <Menu mode={"inline"}>
        {" "}
        {locationSelector.locationList.map((location) => (
          <Menu.SubMenu icon={<Checkbox />} title={location.name}>
            {" "}
            {deviceSelector.deviceList
              .filter((device) => {
                return device.location_id === location.id;
              })
              .map((device) => (
                <Menu.Item key={device.id} icon={<Checkbox />}>
                  {device.viewport}
                </Menu.Item>
              ))}{" "}
          </Menu.SubMenu>
        ))}
      </Menu>
    </FixedSider>
  );
};

const FixedSider = styled(Layout.Sider)`
  overflow: auto;
  height: 100%;
  position: fixed;
  left: 0;
  background-color: #f0f0f0;
`;
