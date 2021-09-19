import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Button, Divider, Typography, Popconfirm } from "antd";
import { useProcess } from "utils/process";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { selectRecordlistReducer } from "../recordlist.slice";
import { useSelector } from "react-redux";
import { RecordItemProps } from "./content";

const { Title, Paragraph, Text } = Typography;

const HandlerOnPending = ({
  isLoading,
  processType,
  onClick,
}: {
  isLoading: boolean;
  processType: string | null;
  onClick: (type: string) => void;
}) => {
  return (
    <>
      <Button
        type={"primary"}
        size={"large"}
        loading={processType === "processed" && isLoading}
        onClick={() => onClick("processed")}
      >
        完成处理
      </Button>
      <Popconfirm
        title={"确定要删除这条记录吗？"}
        okText={"删除"}
        cancelText={"取消"}
        onConfirm={() => onClick("deleted")}
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
    </>
  );
};

const HandlerOnOther = ({
  isLoading,
  processType,
  onClick,
}: {
  isLoading: boolean;
  processType: string | null;
  onClick: (type: string) => void;
}) => {
  return (
    <>
      <Button
        type={"primary"}
        size={"large"}
        loading={processType === "pending" && isLoading}
        onClick={() => onClick("pending")}
      >
        撤销处理状态
      </Button>
    </>
  );
};

export const RecordHandlingFragment = ({
  recordItem,
  onUnmount,
}: {
  recordItem: RecordItemProps;
  onUnmount?: () => void;
}) => {
  useEffect(() => {
    return () => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [onUnmount]);

  const navigate = useNavigate();

  const [processType, setProcessedType] = useState<string | null>(null);
  const { isLoading, setProcess } = useProcess(recordItem?.id, () => {
    setProcessedType(null);
    navigate("/record");
  });

  const onHandleButtonClick = (type: string) => {
    if (!isLoading) {
      setProcessedType(type);
      setProcess(type);
    }
  };

  console.log("handling", recordItem);

  return (
    <Container>
      <ImageDetail alt="Record Image" src={recordItem?.imageUrl} />
      <VerticalDivider type={"vertical"} />
      <HandlingPanel>
        <Title level={5}>检测到：</Title>
        <Title level={3} style={{ marginTop: 0 }}>
          「{recordItem?.reason?.name}」
        </Title>
        {/*<Title level={5}>处理办法：</Title>
        <Paragraph>
          <blockquote>
            根据《XX营业厅管理办法》：
            <br />
            需要对违纪人员处<Text strong>警告</Text>一次；
            若多次违纪，则处以XX元至XX元的罚款，并暂停优秀资格评审
          </blockquote>
        </Paragraph>*/}

        <Title level={5}>详细信息：</Title>
        <ul>
          <li>检测地点：{recordItem?.location?.name}</li>
          <li>检测时间：{recordItem?.date}</li>
        </ul>

        <BottomParagraph>
          {recordItem?.type === "pending" ? (
            <HandlerOnPending
              isLoading={isLoading}
              processType={processType}
              onClick={onHandleButtonClick}
            />
          ) : (
            <HandlerOnOther
              isLoading={isLoading}
              processType={processType}
              onClick={onHandleButtonClick}
            />
          )}
        </BottomParagraph>
      </HandlingPanel>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1rem 34rem;
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
