import { useSelector } from "react-redux";
import { selectRecordlistReducer } from "../recordlist.slice";
import styled from "@emotion/styled";
import { Divider } from "antd";
import { selectDeviceReducer } from "../device/device.slice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDebugImageCard } from "../record/__debug__/__debug_image_card__";

export const DashBoardAside = () => {
  const deviceSelector = useSelector(selectDeviceReducer);
  const recordlistSelector = useSelector(selectRecordlistReducer);
  const navigate = useNavigate();

  useDebugImageCard();

  return (
    <>
      <Block>
        <Title>近期违规记录</Title>
        <ContentBlock>
          <CollapsibleList
            list={recordlistSelector.recordlist}
            maxItemCount={7}
            displayFormat={(record) =>
              record ? (
                <div onClick={() => navigate(`/record/${record?.id}`)}>
                  {record?.type === "pending" ? (
                    <EmphasisedText>[新] </EmphasisedText>
                  ) : null}
                  {moment(record?.date, "YYYY-MM-DD HH:mm:ss").format(
                    "M月D日 HH:mm:ss"
                  )}{" "}
                  {record?.reason}
                </div>
              ) : (
                <div
                  onClick={() => {
                    navigate(`/record`);
                  }}
                >
                  查看更多记录……
                </div>
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
            list={deviceSelector.deviceList}
            maxItemCount={5}
            displayFormat={(device) =>
              device ? (
                <div onClick={() => navigate(`/device/${device.id}`)}>
                  {device.location.name} - {device.name}
                </div>
              ) : (
                <div
                  onClick={() => {
                    navigate(`/device`);
                  }}
                >
                  查看更多设备……
                </div>
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
    <>
      {list
        .filter((item, index) => index < maxItemCount)
        .map((item) => (
          <RecordItem>{displayFormat && displayFormat(item)}</RecordItem>
        ))}
      {list.length >= maxItemCount ? (
        <RecordItem style={{ marginTop: "0.5rem", color: "#A0A0A0" }}>
          {displayFormat && displayFormat()}
        </RecordItem>
      ) : null}
    </>
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

const RecordItem = styled.div`
  margin-bottom: 1rem;
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
