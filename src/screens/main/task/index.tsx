import styled from "@emotion/styled";
import { Menu } from "antd";
import React, { useEffect } from "react";
import { useDocumentTitle } from "utils/document-title";
import { useGeneralLists } from "utils/general-list";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { TaskFragment } from "./task";

export type TaskType = "realtime" | "history";

export const TaskIndexFragment = () => {
  useDocumentTitle("任务列表");
  const navigate = useNavigate();

  const update = useGeneralLists([
    "device",
    "location",
    "reason",
    "task",
    "recordlist",
  ]);
  useEffect(update);

  return (
    <Container>
      {/*<Header />*/}
      <Content>
        <TaskFragment type={"realtime"} />
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
  // height: calc(100% - 6rem);
  height: 100%;
  // padding: 0 2rem;
  overflow: auto;
`;
