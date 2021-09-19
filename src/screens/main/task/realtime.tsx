import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { TaskDataProps, TaskItemProps } from "./task.slice";
import { TaskCard } from "./task-card";
import { updateCurrentTime, useCurrentTime } from "utils/time";
import React, { useEffect, useMemo } from "react";
import { FilterBar } from "components/filter-bar/filter-bar";
import { CheckCircleFilled, InfoCircleFilled } from "@ant-design/icons";
import { selectGeneralListReducer } from "../general-list.slice";
import { ReasonProps } from "../device/reason.slice";
import { DeviceProps } from "../device/device.slice";
import { useFilter } from "utils/filter";
import { PaginationBar } from "components/pagination/pagination";

export const RealtimeTaskFragment = () => {
  const currentTime = useCurrentTime();
  useEffect(() => updateCurrentTime, []);

  const generalListSelector = useSelector(selectGeneralListReducer);
  const reasonList = useMemo(
    () => generalListSelector.generalList.reason as ReasonProps[] | undefined,
    [generalListSelector]
  );
  const deviceList = useMemo(
    () => generalListSelector.generalList.device as DeviceProps[] | undefined,
    [generalListSelector]
  );

  const taskFilters = useMemo(() => {
    return [
      {
        key: "state",
        title: "进行状态",
        options: [
          {
            key: "start",
            title: "执行中",
            icon: <CheckCircleFilled style={{ color: "#2cbd00" }} />,
          },
          {
            key: "paused",
            title: "暂停中",
            icon: <InfoCircleFilled style={{ color: "#f65353" }} />,
          },
        ],
      },
      {
        key: "device",
        title: "调用设备",
        options:
          deviceList?.map((device) => ({
            key: device.id,
            title: device.name,
          })) || [],
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
    ];
  }, [reasonList, deviceList]);

  const { setFilterProps, isLoading, responseData, errorMessage } = useFilter(
    "task/realtime",
    ["reason", "device", "state", "pageSize", "page"]
  );
  const filteredTask = useMemo(
    () => responseData as TaskDataProps | undefined,
    [responseData]
  );

  return (
    <Container>
      <Header>
        <FilterBar<React.Key, React.Key>
          filters={taskFilters}
          onFilterUpdate={(filter, option) =>
            setFilterProps(filter as any, option)
          }
        />
      </Header>
      <Content>
        {filteredTask?.tasks?.map((item) => (
          <TaskCard
            taskProps={item as TaskItemProps}
            currentTime={currentTime}
          />
        ))}
      </Content>
      <Footer>
        <PaginationBar
          enabled={!!filteredTask}
          totalNum={filteredTask?.totalNum}
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

const Header = styled.div`
  padding: 0 2rem;
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.header`
  width: 100%;
  height: calc(100% - 6rem - 10rem);
  padding: 0 2rem;
  overflow: auto;
`;

const FloatRight = styled.div`
  margin-left: auto;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Footer = styled.div`
  width: 100%;
  height: 6rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
