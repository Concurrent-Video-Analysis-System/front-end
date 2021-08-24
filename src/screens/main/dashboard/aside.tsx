import { useSelector } from "react-redux";
import { selectRecordlistReducer } from "../recordlist.slice";
import styled from "@emotion/styled";
import { Divider } from "antd";
import { selectDeviceReducer } from "../device/device.slice";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const DashBoardAside = () => {
  const deviceSelector = useSelector(selectDeviceReducer);
  const recordlistSelector = useSelector(selectRecordlistReducer);
  const navigate = useNavigate();

  return (
    <>
      <AsideBlock>
        <Title>近期违规记录</Title>
        <AsideDivider />
        {recordlistSelector.recordlist
          //.sort((a, b) =>
          //  (+(a.type === "pending")) - (+(b.type === "pending")))
          .filter((item, index) => index < 10)
          .map((record) => (
            <RecordItem>
              <a
                href={"/#"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/recordlist/${record.id}`);
                }}
              >
                {record.type === "pending" ? (
                  <EmphasisedText>[新] </EmphasisedText>
                ) : null}
                {moment(record.date, "YYYY-MM-DD HH:mm:ss").format(
                  "M月D日 HH:mm:ss"
                )}{" "}
                {record.reason}
              </a>
            </RecordItem>
          ))}
        {recordlistSelector.recordlist.length >= 10 ? (
          <RecordItem style={{ marginTop: "1.5rem", color: "#A0A0A0" }}>
            <a
              href={"/#"}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/recordlist`);
              }}
            >
              查看更多记录……
            </a>
          </RecordItem>
        ) : null}
      </AsideBlock>

      <AsideBlock>
        <Title>设备列表</Title>
        <AsideDivider />
        {deviceSelector.deviceList
          .filter((device, index) => index < 5)
          .map((device) => (
            <RecordItem>
              <a
                href={"/#"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/device/${device.id}`);
                }}
              >
                {device.location.name} - {device.name}
              </a>
            </RecordItem>
          ))}
        {deviceSelector.deviceList.length >= 5 ? (
          <RecordItem style={{ marginTop: "1.5rem", color: "#A0A0A0" }}>
            <a
              href={"/#"}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/device`);
              }}
            >
              查看更多设备……
            </a>
          </RecordItem>
        ) : null}
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
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmphasisedText = styled.span`
  color: #e00000;
  font-weight: bold;
`;
