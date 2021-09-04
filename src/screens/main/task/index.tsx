import styled from "@emotion/styled";
import { Menu } from "antd";
import React from "react";
import { useDocumentTitle } from "utils/document-title";
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
