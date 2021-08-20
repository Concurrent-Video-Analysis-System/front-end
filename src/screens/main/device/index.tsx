import styled from "@emotion/styled";
import { DeviceAside } from "./aside";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LocationFragment } from "./location";
import { DeviceFragment } from "./device";
import { CreateTaskFragment } from "./create-task";
import { OverviewFragment } from "./overview";
import { useDocumentTitle } from "utils/document-title";
import { useState } from "react";
import { useFetchDevice } from "../../../utils/fetcher/device";
import { useFetchLocation } from "../../../utils/fetcher/location";

export const DeviceIndexFragment = () => {
  useDocumentTitle("设备列表");
  const navigate = useNavigate();
  useFetchDevice();
  useFetchLocation();

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
