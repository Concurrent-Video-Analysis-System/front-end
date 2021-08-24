import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { EditTwoTone } from "@ant-design/icons";
import { selectLocationReducer } from "./location.slice";
import { DeviceProps, selectDeviceReducer } from "./device.slice";
import { TagList } from "./create-task";

export const LocationFragment = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const locationSelector = useSelector(selectLocationReducer);
  const deviceSelector = useSelector(selectDeviceReducer);

  const location = useMemo(() => {
    return locationSelector.locationList.find(
      (item) => item.id === +locationId
    );
  }, [locationId, locationSelector.locationList]);

  const deviceAtLocation = useMemo(() => {
    if (!location) {
      return [] as DeviceProps[];
    }
    return deviceSelector.deviceList.filter(
      (device) => device.location.id === location.id
    );
  }, [location, deviceSelector.deviceList]);

  useEffect(() => {
    if (!location) {
      navigate(`/device`);
    }
  }, [location, navigate]);

  const editableConfig = (fontSize: string) => {
    return {
      icon: (
        <EditTwoTone
          twoToneColor={"#E0E0E0"}
          style={{ marginLeft: "1rem", fontSize: fontSize }}
        />
      ),
      tooltip: false,
    };
  };

  return (
    <Container>
      <Typography.Title level={2} editable={editableConfig("2rem")}>
        {location?.name}
      </Typography.Title>

      <ParagraphContainer>
        <ParagraphLabel>网点编号：</ParagraphLabel>
        <Paragraph>#{location?.id}</Paragraph>
      </ParagraphContainer>

      <ParagraphContainer>
        <ParagraphLabel>网点地址：</ParagraphLabel>
        <Paragraph editable={editableConfig("2rem")}>
          {location?.location}
        </Paragraph>
      </ParagraphContainer>

      <ParagraphContainer>
        <ParagraphLabel>设备数量：</ParagraphLabel>
        <Paragraph editable={editableConfig("2rem")}>
          {location?.device_count}
        </Paragraph>
      </ParagraphContainer>

      <ParagraphContainer>
        <ParagraphLabel>设备列表：</ParagraphLabel>
        <TagList
          propList={deviceAtLocation}
          onClick={(id) => navigate(`/device/${id}`)}
        />
      </ParagraphContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 4rem;
`;

const ParagraphContainer = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const ParagraphLabel = styled.div`
  display: inline-block;
  text-align: right;
  width: 9.6rem;
`;

const Paragraph = styled(Typography.Paragraph)`
  display: inline;
  font-size: 1.8rem;
  max-width: 70%;
`;
