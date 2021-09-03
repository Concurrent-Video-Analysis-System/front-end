import styled from "@emotion/styled";
import { TaskAsidePanel } from "./aside";
import { useSelector } from "react-redux";
import { selectTaskReducer, TaskProps } from "./task.slice";
import { TaskCard } from "./task-card";
import { Divider, Menu } from "antd";
import { updateCurrentTime, useCurrentTime } from "utils/time";
import React, { useEffect, useMemo, useState } from "react";
import { useExactFilter } from "../../../utils/task-filter";
import { useFetchTask } from "../../../utils/fetcher/task";
import { useDocumentTitle } from "../../../utils/document-title";
import { FilterBar } from "../../../components/filter-bar/filter-bar";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { selectGeneralListReducer } from "../general-list.slice";
import { ReasonProps } from "../device/reason.slice";
import { DeviceProps } from "../device/device.slice";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RealtimeTaskFragment } from "./realtime";
import { HistoryTaskFragment } from "./history";

export const TaskIndexFragment = () => {
  useDocumentTitle("任务列表");
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Menu
          onClick={(item) => navigate(item.key)}
          selectedKeys={["current"]}
          mode="horizontal"
        >
          <Menu.Item key="realtime" icon={<></>}>
            实时监控分析
          </Menu.Item>
          <Menu.Item key="history" icon={<></>}>
            历史录像分析
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Routes>
          <Route path={"realtime"} element={<RealtimeTaskFragment />} />
          <Route path={"history"} element={<HistoryTaskFragment />} />
          <Navigate to={"realtime"} />
        </Routes>
      </Content>
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
  height: calc(100% - 6rem);
  padding: 0 2rem;
  overflow: auto;
`;
