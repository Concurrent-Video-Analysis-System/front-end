import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Divider, Typography, Popconfirm } from "antd";
import { RecordItemProps } from "./recordlist-component/record-content";
import { useProcess } from "../../../utils/process";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export const RecordHandlingFragment = ({
  recordItem,
  onUnmount,
}: {
  recordItem: RecordItemProps | null;
  onUnmount?: () => void;
}) => {
  useEffect(() => {
    return () => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, []);

  const navigate = useNavigate();

  const [processType, setProcessedType] = useState<string | null>(null);
  const { isLoading, setProcess } = useProcess(recordItem?.id, () => {
    setProcessedType(null);
    navigate("/recordlist");
  });

  const onHandleButtonClick = (type: string) => {
    if (!isLoading) {
      setProcessedType(type);
      setProcess(type);
    }
  };

  return (
    <Container>
      <ImageDetail alt="Record Image" src={recordItem?.imageUrl} />
      <VerticalDivider type={"vertical"} />
      <HandlingPanel>
        <Title level={5}>检测到：</Title>
        <Title level={3} style={{ marginTop: 0 }}>
          「{recordItem?.reason}」
        </Title>
        <Title level={5}>处理办法：</Title>
        <Paragraph>
          <blockquote>
            根据《XX营业厅管理办法》：
            <br />
            需要对违纪人员处<Text strong>警告</Text>一次；
            若多次违纪，则处以XX元至XX元的罚款，并暂停优秀资格评审
          </blockquote>
        </Paragraph>

        <Title level={5}>详细信息：</Title>
        <Paragraph>
          检测地点：{recordItem?.location}
          <br />
          检测时间：{recordItem?.date}
          <br />
          其它检测信息...
          <br />
        </Paragraph>

        <BottomParagraph>
          <Button
            type={"primary"}
            size={"large"}
            loading={processType === "processed" && isLoading}
            onClick={() => onHandleButtonClick("processed")}
          >
            完成处理
          </Button>
          <Popconfirm
            title={"确定要删除这条记录吗？"}
            okText={"删除"}
            cancelText={"取消"}
            onConfirm={() => onHandleButtonClick("deleted")}
          >
            <Button
              type={"primary"}
              danger
              size={"large"}
              style={{ marginLeft: "2rem" }}
              loading={processType === "deleted" && isLoading}
            >
              反馈误报并删除
            </Button>
          </Popconfirm>
        </BottomParagraph>
      </HandlingPanel>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1rem 30rem;
  grid-template-areas: "image-detail vertical-divider handling-panel";
  grid-gap: 1.5rem;
  width: 100%;
  height: calc(100% - 6rem);
  padding: 3rem 0 3rem 0;
`;

const ImageDetail = styled.img`
  grid-area: image-detail;
  width: 100%;
`;

const VerticalDivider = styled(Divider)`
  grid-area: vertical-divider;
  height: 100%;
`;

const HandlingPanel = styled.div`
  grid-area: handling-panel;
`;

const BottomParagraph = styled(Paragraph)`
  position: absolute;
  bottom: 2rem;
`;
