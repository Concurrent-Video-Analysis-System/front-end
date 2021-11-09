import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Divider } from "antd";
import { DeviceProps } from "../device/device.slice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { selectGeneralListReducer } from "../general-list.slice";
import { useMemo } from "react";
import { RecordDataProps } from "../record/content";

export const DashBoardAside = () => {
  const generalListSelector = useSelector(selectGeneralListReducer);
  const deviceList = useMemo(
    () => generalListSelector.generalList.device as DeviceProps[] | undefined,
    [generalListSelector]
  );
  const recordList = useMemo(
    () =>
      generalListSelector.generalList.recordlist as RecordDataProps | undefined,
    [generalListSelector]
  );
  const navigate = useNavigate();

  console.log(deviceList);

  return (
    <>
      <Block>
        <Title>近期违规记录</Title>
        <ContentBlock>
          <CollapsibleList
            list={recordList?.records || []}
            maxItemCount={7}
            displayFormat={(record) =>
              record ? (
                <RecordItem
                  key={record?.id}
                  onClick={() => navigate(`/record/${record?.id}`)}
                >
                  {record?.type === "pending" ? (
                    <EmphasisedText>[新] </EmphasisedText>
                  ) : null}
                  {moment(record?.date, "YYYY-MM-DD HH:mm:ss").format(
                    "M月D日 HH:mm:ss"
                  )}{" "}
                  {record?.reason?.name}
                </RecordItem>
              ) : (
                <RecordItem
                  key={"more"}
                  style={{ marginTop: "0.5rem", color: "#A0A0A0" }}
                  onClick={() => {
                    navigate(`/record`);
                  }}
                >
                  查看更多记录……
                </RecordItem>
              )
            }
          />
        </ContentBlock>
        <AsideDivider />
      </Block>

      <Block>
        <Title>设备列表</Title>
        <ContentBlock>
          <CollapsibleList
            list={deviceList || []}
            maxItemCount={5}
            displayFormat={(device) =>
              device ? (
                <RecordItem
                  key={device.id}
                  onClick={() => navigate(`/device/${device.id}`)}
                >
                  {device.location.name} - {device.name}
                </RecordItem>
              ) : (
                <RecordItem
                  key={"more"}
                  style={{ marginTop: "0.5rem", color: "#A0A0A0" }}
                  onClick={() => {
                    navigate(`/device`);
                  }}
                >
                  查看更多设备……
                </RecordItem>
              )
            }
          />
        </ContentBlock>
        <AsideDivider />
      </Block>
    </>
  );
};

const CollapsibleList = <K extends unknown>({
  list,
  displayFormat,
  maxItemCount = 10,
}: {
  list: K[];
  displayFormat?: (item?: K) => JSX.Element;
  maxItemCount?: number;
}) => {
  return (
    <ul style={{ listStyleType: "none", padding: "0" }}>
      {list
        .filter((item, index) => index < maxItemCount)
        .map((item) => displayFormat && displayFormat(item))}
      {list.length >= maxItemCount ? displayFormat && displayFormat() : null}
    </ul>
  );
};

const Block = styled.div`
  margin-bottom: 4rem;
  height: 40%;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const AsideDivider = styled(Divider)`
  margin: 1rem 0;
`;

const ContentBlock = styled.div`
  background-color: #ffffff;
  max-height: calc(100% - 2rem);
  overflow: hidden auto;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
`;

const RecordItem = styled.li`
  margin-bottom: 1rem;
  list-style: none;
  font-size: 1.7rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  cursor: pointer;
`;

const EmphasisedText = styled.span`
  color: #e00000;
  font-weight: bold;
`;
