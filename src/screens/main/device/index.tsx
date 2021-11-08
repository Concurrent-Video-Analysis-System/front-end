import React, { useState } from "react";
import styled from "@emotion/styled";
import { DeviceAside } from "./aside";
import { useNavigate } from "react-router-dom";

export const AssetPageFrame = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
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
              navigate(`/asset/location/${itemId.locationId}`);
            } else if (itemType === "nvr") {
              navigate(`/asset/nvr/${itemId.nvrId}`);
            } else if (itemType === "device") {
              navigate(`/asset/device/${itemId.deviceId}`);
            } else {
              navigate(`/asset/location`);
            }
          }}
        />
      </Aside>
      <Content>{children}</Content>
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
  width: 36rem;
`;

const Content = styled.div`
  position: absolute;
  width: calc(100% - 36rem);
  left: 36rem;
  top: 0;
  padding: 2rem 4rem;
`;
