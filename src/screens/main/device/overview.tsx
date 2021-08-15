import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectLocationReducer } from "./location.slice";
import { selectDeviceReducer } from "./device.slice";
import styled from "@emotion/styled";
import { Divider, Typography } from "antd";
import { DeviceTagList } from "./create-task";

export const OverviewFragment = () => {
  const navigate = useNavigate();
  const locationSelector = useSelector(selectLocationReducer);
  const deviceSelector = useSelector(selectDeviceReducer);

  return (
    <Container>
      <TitleContainer>网点设备概览</TitleContainer>
      <TitleDivider />
      {locationSelector.locationList.map((location) => (
        <DeviceGroup>
          <Typography.Title level={4}>
            <a onClick={() => navigate(`/device/location/${location.id}`)}>
              {location.name}
            </a>
          </Typography.Title>
          <DeviceTagList
            deviceList={deviceSelector.deviceList.filter(
              (device) => device.location_id === location.id
            )}
            clickable
          />
        </DeviceGroup>
      ))}
    </Container>
  );
};

const TitleContainer = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
`;

const Container = styled.div``;

const TitleDivider = styled(Divider)`
  margin: 1rem 0;
`;

const DeviceGroup = styled.div`
  margin: 2rem 0;
  padding: 2rem 3rem;
  background-color: #fcfcfc;
  border: 1px solid #e6e6e6;
`;
