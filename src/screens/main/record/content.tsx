import React from "react";
import styled from "@emotion/styled";
import { Card, Badge, Empty, Table, Tag, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecordlistReducer } from "../recordlist.slice";
import { ItemProps } from "interfaces";
import { useProcess } from "../../../utils/process";

export interface RecordDataProps {
  totalNum: number;
  records: RecordItemProps[];
}

export interface RecordItemProps {
  id: number;
  imageUrl?: string;
  type?: string;
  reason?: ItemProps;
  device?: ItemProps;
  location?: ItemProps;
  date?: string;
}

interface RecordLabelProps {
  label: string;
  color: string;
  imageOpacity: number;
}

const type2typeLabel = (type?: string): RecordLabelProps | undefined => {
  switch (type) {
    case "pending":
      return {
        label: "待处理",
        color: "#FF0000",
        imageOpacity: 1,
      };
    case "processed":
      return {
        label: "已处理",
        color: "#2cbd00",
        imageOpacity: 0.7,
      };
    case "deleted":
      return {
        label: "已删除",
        color: "#808080",
        imageOpacity: 0.7,
      };
    default:
      return undefined;
  }
};

const RecordCard = ({
  props,
  onSelected,
}: {
  props: RecordItemProps;
  onSelected?: (item: RecordItemProps) => void;
}) => {
  const typeLabel = type2typeLabel(props.type);

  return (
    <Link to={`${props.id}`}>
      <Badge.Ribbon text={typeLabel?.label} color={typeLabel?.color}>
        <Card
          cover={
            <img
              alt="example"
              src={props.imageUrl}
              style={{ opacity: typeLabel?.imageOpacity }}
            />
          }
          size={"small"}
          hoverable
          onClick={() => (onSelected ? onSelected(props) : null)}
        >
          <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
            {props.reason?.name}
          </div>
          <div style={{ float: "left" }}>{props.location?.name}</div>
          <div style={{ float: "right" }}>{props.date}</div>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};

const RecordCardList = ({
  recordlist,
  onRecordItemSelected,
}: {
  recordlist: RecordItemProps[];
  onRecordItemSelected?: (item: RecordItemProps) => void;
}) => {
  return (
    <>
      {recordlist.length === 0 ? (
        <Empty
          description={<span style={{ color: "#A0A0A0" }}>无记录条目</span>}
        />
      ) : (
        <RecordCardContainer>
          {recordlist.map((item) => (
            <RecordCard props={item} onSelected={onRecordItemSelected} />
          ))}
        </RecordCardContainer>
      )}
    </>
  );
};

const RecordTableList = ({
  recordlist,
  onRecordItemSelected,
  onUnmount,
}: {
  recordlist: RecordItemProps[];
  onRecordItemSelected?: (item: RecordItemProps) => void;
  onUnmount?: () => void;
}) => {
  const sendProcess = useProcess();
  const navigate = useNavigate();

  // @ts-ignore
  return (
    <Table
      dataSource={recordlist.map((item) => ({
        ...item,
        location: item.location?.name,
        reason: item.reason?.name,
      }))}
      size={"middle"}
      pagination={false}
    >
      <Table.Column title={"序号"} dataIndex={"id"} key={"id"} />
      <Table.Column title={"违规原因"} dataIndex={"reason"} key={"reason"} />
      <Table.Column
        title={"营业网点"}
        dataIndex={"location"}
        key={"location"}
      />
      <Table.Column title={"时间"} dataIndex={"date"} key={"date"} />
      <Table.Column
        title={"处理情况"}
        dataIndex={"type"}
        key={"type"}
        render={(type) => (
          <Tag color={type2typeLabel(type)?.color}>
            {type2typeLabel(type)?.label}
          </Tag>
        )}
      />
      <Table.Column
        title={"操作"}
        key={"action"}
        render={(record) => (
          <>
            <Button
              type={"link"}
              size={"small"}
              onClick={() => {
                if (record && onRecordItemSelected) {
                  onRecordItemSelected(record as RecordItemProps);
                  navigate(`record/${record.id}`);
                }
              }}
            >
              查看详情
            </Button>
            <Divider type={"vertical"} />
            {record.type === "processed" ? (
              <RevertButton
                type={"link"}
                size={"small"}
                onClick={() => {
                  sendProcess(record.id, "pending").then(() => {
                    onUnmount && onUnmount();
                  });
                }}
              >
                撤销处理
              </RevertButton>
            ) : (
              <Button
                type={"link"}
                size={"small"}
                danger
                onClick={() => {
                  sendProcess(record.id, "processed").then(() => {
                    onUnmount && onUnmount();
                  });
                }}
              >
                完成处理
              </Button>
            )}
          </>
        )}
      />
    </Table>
  );
};

export const RecordContent = ({
  recordlist,
  displayType,
  onRecordItemSelected,
  onUnmount,
}: {
  recordlist: RecordItemProps[];
  displayType: string;
  onRecordItemSelected?: (item: RecordItemProps) => void;
  onUnmount?: () => void;
}) => {
  return (
    <Container>
      {displayType === "card" ? (
        <RecordCardList
          recordlist={recordlist}
          onRecordItemSelected={onRecordItemSelected}
        />
      ) : null}
      {displayType === "table" ? (
        <RecordTableList
          recordlist={recordlist}
          onRecordItemSelected={onRecordItemSelected}
          onUnmount={onUnmount}
        />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const RecordCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-gap: 30px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
`;

const RevertButton = styled(Button)`
  color: #a0a0a0;
`;
