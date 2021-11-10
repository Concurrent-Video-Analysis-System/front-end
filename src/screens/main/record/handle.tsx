import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Divider, Typography, Popconfirm, message } from "antd";
import { useProcess } from "utils/process";
import { useNavigate, useParams } from "react-router-dom";
import { RecordItemProps } from "./content";
import { useRecord } from "../../../utils/record";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const RecordHandlingPage = ({
  onUnmount,
}: {
  onUnmount?: () => void;
}) => {
  useEffect(() => {
    return () => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [onUnmount]);

  const { recordId } = useParams();
  const [recordItem, setRecordItem] = useState<RecordItemProps | null>(null);
  const sendRecord = useRecord();
  useEffect(() => {
    sendRecord(+recordId)
      .then(setRecordItem)
      .catch((errorMessage) => message.error(errorMessage));
  }, [recordId, sendRecord]);

  const navigate = useNavigate();

  const [processType, setProcessedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const sendProcess = useProcess();

  const onHandleButtonClick = (type: string) => {
    setIsLoading(true);
    sendProcess({
      idList: [recordItem?.id || 0],
      type,
    }).then(() => {
      setProcessedType(null);
      setIsLoading(false);
      navigate("/record");
    });
  };

  return (
    <Container>
      <Header>
        <Button
          type={"dashed"}
          icon={<LeftOutlined />}
          onClick={() => {
            navigate("/record");
          }}
        >
          返回违规记录列表
        </Button>
      </Header>
      <ImageDetail alt="Record Image" src={recordItem?.imageUrl} />
      <VerticalDivider type={"vertical"} />
      <HandlingPanel>
        <Title level={5}>检测到：</Title>
        <Title level={3} style={{ marginTop: 0 }}>
          「{recordItem?.reason?.name}」
        </Title>

        <Title level={5}>详细信息：</Title>
        <ul>
          <li>编号：#{recordItem?.id}</li>
          <li>所在网点：{recordItem?.location?.name}</li>
          <li>检出设备：{recordItem?.device?.name}</li>
          <li>发生时间：{recordItem?.date}</li>
          <li>检出时间：{recordItem?.from}</li>
        </ul>

        <BottomParagraph>
          {recordItem?.type === "pending" ? (
            <>
              <Button
                type={"primary"}
                size={"large"}
                loading={processType === "processed" && isLoading}
                onClick={() => onHandleButtonClick("processed")}
              >
                完成处理
              </Button>
              <Popconfirm
                title={"确定要标记这条记录为误报吗？"}
                okText={"删除"}
                cancelText={"取消"}
                onConfirm={() => onHandleButtonClick("deleted")}
              >
                <Button
                  type={"default"}
                  danger
                  size={"large"}
                  style={{ marginLeft: "2rem" }}
                  loading={processType === "deleted" && isLoading}
                >
                  标记误报
                </Button>
              </Popconfirm>
            </>
          ) : (
            <Button
              type={"primary"}
              size={"large"}
              loading={processType === "pending" && isLoading}
              onClick={() => onHandleButtonClick("pending")}
            >
              撤销处理状态
            </Button>
          )}
        </BottomParagraph>
      </HandlingPanel>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1rem 34rem;
  grid-template-rows: 3.5rem 1fr;
  grid-template-areas:
    "header vertical-divider handling-panel"
    "image-detail vertical-divider handling-panel";
  grid-gap: 1.5rem;
  width: 100%;
  height: calc(100% - 6rem);
  padding: 2rem 0 2rem 2rem;
`;

const Header = styled.div`
  grid-area: header;
  padding-left: 1.2rem;
`;

const ImageDetail = styled.img`
  grid-area: image-detail;
  width: 100%;
  padding-left: 1.2rem;
`;

const VerticalDivider = styled(Divider)`
  grid-area: vertical-divider;
  height: 100%;
`;

const HandlingPanel = styled.div`
  grid-area: handling-panel;
  padding: 3rem 0;
`;

const BottomParagraph = styled(Paragraph)`
  position: absolute;
  bottom: 6rem;
`;
