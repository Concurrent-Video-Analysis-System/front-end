import styled from "@emotion/styled";
import { Menu } from "antd";
import React, { useEffect } from "react";
import { useDocumentTitle } from "utils/document-title";
import { useGeneralLists } from "utils/general-list";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { TaskFragment } from "./task";
import { TaskDetailFragment } from "./task-detail";

export type TaskType = "realtime" | "history";

export const TaskIndexFragment = () => {
  useDocumentTitle("任务列表");

  const update = useGeneralLists([
    "device",
    "location",
    "reason",
    "task",
    "recordlist",
  ]);
  useEffect(update, [update]);

  return (
    <Container>
      {/*<Header />*/}
      <Content>
        <Routes>
          <Route path={":taskId/*"} element={<TaskDetailFragment />} />
          <Route path={"/"} element={<TaskFragment />} />
        </Routes>
      </Content>
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
  width: 100%;
  // height: calc(100% - 6rem);
  height: 100%;
  // padding: 0 2rem;
  overflow: auto;
`;
