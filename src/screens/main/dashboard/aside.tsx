import { useSelector } from "react-redux";
import { selectRecordlistReducer } from "../recordlist.slice";
import styled from "@emotion/styled";
import { Divider } from "antd";
import { selectDeviceReducer } from "../device/device.slice";

export const DashBoardAside = () => {
  const deviceSelector = useSelector(selectDeviceReducer);
  const recordlistSelector = useSelector(selectRecordlistReducer);

  return (
    <>
      <AsideBlock>
        <Title>近期违规记录</Title>
        <AsideDivider />
        {recordlistSelector.recordlist.map((record) => (
          <RecordItem>
            {record.date} 在{record.location}的{record.reason}
          </RecordItem>
        ))}
      </AsideBlock>

      <AsideBlock>
        <Title>设备列表</Title>
        <AsideDivider />
        {deviceSelector.deviceList.map((device) => (
          <RecordItem>
            {device.location.name} - {device.name}
          </RecordItem>
        ))}
      </AsideBlock>
    </>
  );
};

const AsideBlock = styled.div`
  margin-bottom: 4rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const AsideDivider = styled(Divider)`
  margin: 1rem 0;
`;

const RecordItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1.7rem;
`;
