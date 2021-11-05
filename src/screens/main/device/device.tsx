import { selectDeviceReducer } from "./device.slice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { EditTwoTone } from "@ant-design/icons";

export const DevicePage = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const deviceSelector = useSelector(selectDeviceReducer);

  const device = useMemo(() => {
    return deviceSelector.deviceList.find((item) => item.id === +deviceId);
  }, [deviceId, deviceSelector.deviceList]);

  useEffect(() => {
    if (!device) {
      navigate(`/device`);
    }
  }, [device, navigate]);

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
        {device?.location.name + " - " + device?.name}
      </Typography.Title>

      <ParagraphContainer>
        <ParagraphLabel>设备编号：</ParagraphLabel>
        <Paragraph>#{device?.id}</Paragraph>
      </ParagraphContainer>

      <ParagraphContainer>
        <ParagraphLabel>网点名称：</ParagraphLabel>
        <Paragraph editable={editableConfig("2rem")}>
          {device?.location.name}
        </Paragraph>
      </ParagraphContainer>

      <ParagraphContainer>
        <ParagraphLabel>RTSP地址：</ParagraphLabel>
        <Paragraph editable={editableConfig("2rem")}>{device?.rtsp}</Paragraph>
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
