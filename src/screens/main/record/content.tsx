import React, { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  Card,
  Badge,
  Empty,
  Table,
  Tag,
  Button,
  Divider,
  Tooltip,
  Popover,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ItemProps } from "interfaces";
import { useProcess } from "utils/process";
import {
  CameraOutlined,
  EnvironmentOutlined,
  HddOutlined,
} from "@ant-design/icons";
import moment from "moment";

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
  nvr?: ItemProps;
  date?: string;
  from?: string;
  to?: string;
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
  onReload,
  showMultiSelect,
}: {
  recordlist: RecordItemProps[];
  onRecordItemSelected?: (item: RecordItemProps) => void;
  onUnmount?: () => void;
  onReload?: () => void;
  showMultiSelect?: boolean;
}) => {
  const sendProcess = useProcess();
  const navigate = useNavigate();

  const [rowSelection, setRowSelection] = useState([] as React.Key[]);

  const tableRowSelection = useMemo(
    () => ({
      selectedRowKeys: rowSelection,
      onChange: (keys: React.Key[]) => {
        setRowSelection(keys);
      },
    }),
    [rowSelection]
  );

  const selectSomething = useMemo(
    () => rowSelection.length !== 0,
    [rowSelection]
  );

  const tableData = useMemo(
    () =>
      recordlist.map((item) => ({
        ...item,
        key: item.id,
        reason: `${item.reason?.name}-${item.imageUrl}`,
        full_device: `${item.location?.name}-${item.nvr?.name}-${item.device?.name}`,
      })),
    [recordlist]
  );

  const handleRecord = useProcess();
  const handleProcessButton = useCallback(
    (type) => {
      handleRecord({
        idList: rowSelection.map((item) => +item),
        type,
      })
        .then(() => {
          onReload && onReload();
          message.success("更改状态成功！").then(null);
        })
        .catch((errorMessage) => {
          onReload && onReload();
          message.error(`更改状态时出错：${errorMessage}`).then(null);
        });
    },
    [handleRecord, onReload, rowSelection]
  );

  const tableTitle = useMemo(
    () => () =>
      (
        <TableTitle>
          <Button
            type={"default"}
            onClick={() => {
              selectSomething
                ? setRowSelection([])
                : setRowSelection(recordlist.map((item) => item.id));
            }}
          >
            {selectSomething ? "取消" : "全选"}
          </Button>
          <Button
            type={"primary"}
            disabled={!selectSomething}
            onClick={() => handleProcessButton("processed")}
          >
            标记为已处理
          </Button>
          <Button
            type={"dashed"}
            disabled={!selectSomething}
            onClick={() => handleProcessButton("pending")}
          >
            标记为未处理
          </Button>
          <Button
            type={"primary"}
            disabled={!selectSomething}
            danger
            onClick={() => handleProcessButton("deleted")}
          >
            删除选中项
          </Button>
        </TableTitle>
      ),
    [handleProcessButton, recordlist, selectSomething]
  );

  const tableColumns = useMemo(
    () => [
      {
        title: "序号",
        dataIndex: "id",
        key: "id",
        width: "6rem",
      },
      {
        title: "违规原因",
        dataIndex: "reason",
        key: "reason",
        render: (reason_url: string) => (
          <Popover
            content={
              <img
                src={reason_url.split("-")[1]}
                alt={reason_url.split("-")[1]}
                style={{ width: "30rem" }}
              />
            }
          >
            <span style={{ cursor: "pointer", userSelect: "none" }}>
              {reason_url.split("-")[0]}
            </span>
          </Popover>
        ),
      },
      {
        title: "违规检出设备",
        dataIndex: "full_device",
        key: "lnd",
        width: "30%",
        ellipsis: true,
        render: (full: string) => (
          <Tooltip title={full.replaceAll("-", " ")}>
            <Tag color={"blue"} icon={<EnvironmentOutlined />}>
              <TextInTag>{full.split("-")[0]}</TextInTag>
            </Tag>
            <Tag color={"orange"} icon={<HddOutlined />}>
              <TextInTag>{full.split("-")[1]}</TextInTag>
            </Tag>
            <Tag icon={<CameraOutlined />}>
              <TextInTag>{full.split("-")[2]}</TextInTag>
            </Tag>
          </Tooltip>
        ),
      },
      {
        title: "违规发生时间",
        dataIndex: "date",
        key: "date",
        render: (date: string) => (
          <Tooltip title={moment(date).format("YYYY年MM月DD日 HH:mm:ss")}>
            {moment(date).format("MM月DD日 HH:mm:ss")}
          </Tooltip>
        ),
      },
      {
        title: "处理状态",
        dataIndex: "type",
        key: "type",
        render: (type: any) => (
          <Tag color={type2typeLabel(type)?.color}>
            <TextInTag>{type2typeLabel(type)?.label}</TextInTag>
          </Tag>
        ),
      },
      {
        title: "操作",
        key: "action",
        render: (record: RecordItemProps) => (
          <>
            <Button
              type={"link"}
              size={"small"}
              onClick={() => {
                console.log(record.id);
                if (record && onRecordItemSelected) {
                  onRecordItemSelected(record as RecordItemProps);
                  navigate(`/record/${record.id}`);
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
                  sendProcess({ idList: [record.id], type: "pending" }).then(
                    () => {
                      onUnmount && onUnmount();
                    }
                  );
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
                  sendProcess({ idList: [record.id], type: "processed" }).then(
                    () => {
                      onUnmount && onUnmount();
                    }
                  );
                }}
              >
                完成处理
              </Button>
            )}
          </>
        ),
      },
    ],
    [navigate, onRecordItemSelected, onUnmount, sendProcess]
  );

  // @ts-ignore
  return (
    <Table
      title={showMultiSelect ? tableTitle : undefined}
      dataSource={tableData}
      rowSelection={showMultiSelect ? tableRowSelection : undefined}
      columns={tableColumns}
      size={"small"}
      pagination={false}
    ></Table>
  );
};

export const RecordContent = ({
  recordlist,
  displayType,
  onRecordItemSelected,
  onUnmount,
  onReload,
}: {
  recordlist: RecordItemProps[];
  displayType: string;
  onRecordItemSelected?: (item: RecordItemProps) => void;
  onUnmount?: () => void;
  onReload?: () => void;
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
          onReload={onReload}
          showMultiSelect
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

const TextInTag = styled.span`
  font-size: 1.4rem;
`;

const TableTitle = styled.div`
  display: flex;
  gap: 1.5rem;
  padding-bottom: 0.5rem;
`;
