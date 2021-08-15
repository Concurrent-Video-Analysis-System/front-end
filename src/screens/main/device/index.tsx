import { Checkbox, Layout, Menu } from "antd";
import { useDebugDeviceLocation } from "./__debug__/__debug_add_device__";
import styled from "@emotion/styled";
import { DeviceAside } from "./aside";
import { Routes, useNavigate } from "react-router-dom";
import { Route, useParams } from "react-router";
import { LocationFragment } from "./location";
import { useSelector } from "react-redux";
import { selectDeviceReducer } from "./device.slice";
import { selectLocationReducer } from "./location.slice";
import { DeviceFragment } from "./device";
import { CreateTaskFragment } from "./create-task";
import { OverviewFragment } from "./overview";
import { useDocumentTitle } from "../../../utils/document-title";
import { useState } from "react";

export const DeviceIndexFragment = () => {
  useDebugDeviceLocation();
  useDocumentTitle("设备列表");
  const navigate = useNavigate();

  const [deviceIdList, setDeviceIdList] = useState([] as string[]);

  return (
    <Container>
      <Aside>
        <DeviceAside
          onCreateTask={(deviceIdList) => {
            setDeviceIdList(deviceIdList);
            navigate(`create-task`);
          }}
          onSelectItem={(itemType, itemId) => {
            if (itemType === "location") {
              navigate(`location/${itemId.locationId}`);
            } else if (itemType === "device") {
              navigate(`${itemId.deviceId}`);
            } else {
              // itemType === "none"
              navigate(`/device`);
            }
          }}
        />
      </Aside>
      <Content>
        <Routes>
          <Route path={"location/:locationId"} element={<LocationFragment />} />
          <Route path={":deviceId"} element={<DeviceFragment />} />
          <Route
            path={"create-task"}
            element={<CreateTaskFragment deviceIdList={deviceIdList} />}
          />
          <Route path={"/"} element={<OverviewFragment />} />
        </Routes>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas: "aside content";
  grid-template-columns: 30rem calc(100vw - 30rem);
  height: 100%;
`;

const Aside = styled.div`
  grid-area: aside;
`;

const Content = styled.div`
  grid-area: content;
  padding: 2rem 4rem;
`;
