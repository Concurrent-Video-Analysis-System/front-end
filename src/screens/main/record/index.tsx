import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { RecordContent, RecordDataProps } from "./content";
import { Button, Divider } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExportOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useFilter } from "utils/filter";
import { useDocumentTitle } from "utils/document-title";
import { useGeneralLists } from "utils/general-list";
import { FilterBar } from "components/filter-bar/filter-bar";
import { PaginationBar } from "components/pagination/pagination";
import { TypeSwitcher } from "components/type-switcher/type-switcher";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { useExport } from "utils/export";

export const RecordIndexPage = () => {
  useDocumentTitle("违规记录列表");

  useGeneralLists(["device", "location", "reason", "task", "recordlist"]);
  const { reasonList, deviceList, taskList, recordList } = useGeneralQuery();

  const [displayType, setDisplayType] = useState("card");

  const filterPropsName = useMemo(
    () => ["type", "location", "device", "reason", "task", "pageSize", "page"],
    []
  );

  const { filterProps, setFilterProps, responseData, reloadData } = useFilter(
    "recordlist",
    filterPropsName
  );
  const filteredRecords = useMemo(
    () => responseData as RecordDataProps | undefined,
    [responseData]
  );

  const exportRecordList = useExport();

  const recordFilters = useMemo(() => {
    return [
      {
        key: "type",
        title: "处理状态",
        options: [
          {
            key: "pending",
            title: "待处理",
            icon: <InfoCircleFilled style={{ color: "#f65353" }} />,
          },
          {
            key: "processed",
            title: "已处理",
            icon: <CheckCircleFilled style={{ color: "#2cbd00" }} />,
          },
          {
            key: "deleted",
            title: "已删除",
            icon: <CloseCircleFilled style={{ color: "#808080" }} />,
          },
        ],
      },
      {
        key: "reason",
        title: "违规类型",
        options:
          reasonList?.map((reason) => ({
            key: reason.id,
            title: reason.name,
          })) || [],
      },
      {
        key: "device",
        title: "监控设备",
        options:
          deviceList?.map((device) => ({
            key: device.id,
            title: device.name,
          })) || [],
        style: { minWidth: "22rem", maxWidth: "22rem" },
      },
      {
        key: "task",
        title: "监察任务",
        options:
          taskList?.tasks.map((task) => ({
            key: task.id,
            title: `#${task.id} ${task.name}`,
          })) || [],
        style: { minWidth: "24rem", maxWidth: "28rem" },
      },
    ];
  }, [reasonList, deviceList, taskList?.tasks]);

  return (
    <Container>
      <Header>
        <FilterBar<React.Key, React.Key>
          filters={recordFilters}
          filterState={filterProps}
          onFilterUpdate={(filter, option) => {
            // console.log(`SET ${filter} TO ${option}`);
            setFilterProps(filter as any, option);
          }}
        />
        <FloatRight>
          <div style={{ minWidth: "8rem" }}>展示格式：</div>
          <TypeSwitcher
            types={[
              { label: <AppstoreOutlined />, value: "card" },
              { label: <BarsOutlined />, value: "table" },
            ]}
            initialType={displayType}
            onChange={setDisplayType}
          />
          <Divider type={"vertical"} style={{ margin: "0 1rem" }} />
          <Button
            icon={<ExportOutlined />}
            type={"primary"}
            onClick={() =>
              exportRecordList(
                recordList?.records.map((item) => +item.id) || []
              )
            }
            danger
          >
            导出数据
          </Button>
        </FloatRight>
      </Header>
      <Content>
        <RecordContent
          recordlist={filteredRecords?.records || []}
          displayType={displayType}
          onUnmount={reloadData}
          onReload={reloadData}
        />
      </Content>
      <Footer>
        <PaginationBar
          enabled={!!filteredRecords}
          currentPage={+(filterProps["page"] || 1)}
          totalNum={filteredRecords?.totalNum}
          onPageChange={(page, pageSize) => {
            setFilterProps("pageSize", pageSize);
            setFilterProps("page", page);
          }}
          onPageSizeChange={(pageSize) => {
            setFilterProps("pageSize", pageSize);
          }}
        />
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const Header = styled.header`
  padding: 0 2rem;
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 6rem - 6rem);
  padding: 0 2rem;
  overflow: auto;
`;

/*const LoadingContentShade = styled(Content)`
  opacity: 0.4;
  text-align: center;
  display: flex;
  height: calc(100% - 6rem - 6rem);
  justify-content: center;
  background-color: white;
  
  transition: opacity 1s;
`

const HandlingContent = styled.div`
  width: 100%;
  padding: 0 2rem;
  overflow: auto;
`;*/

const FloatRight = styled.div`
  margin-left: auto;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
