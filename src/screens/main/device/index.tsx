import styled from "@emotion/styled";
import { DeviceAside } from "./aside";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LocationFragment } from "./location";
import { DeviceFragment } from "./device";
import { CreateTaskFragment } from "./create-task";
import { OverviewFragment } from "./overview";
import { useDocumentTitle } from "utils/document-title";
import { useState } from "react";
import { useFetchDevice } from "utils/fetcher/device";
import { useFetchLocation } from "utils/fetcher/location";

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
  width: 100%;
  height: 100%;
`;

const Aside = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 30rem;
`;

const Content = styled.div`
  position: absolute;
  width: calc(100% - 30rem);
  left: 30rem;
  top: 0;
  padding: 2rem 4rem;
`;
