import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useDocumentTitle } from "utils/document-title";
import { useGeneralLists } from "utils/general-list";
import { TaskFragment } from "./task";

export type TaskType = "realtime" | "history";

export const TaskIndexPage = () => {
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
        <TaskFragment />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

/*const Header = styled.header`
  padding: 0 2rem;
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;*/

const Content = styled.div`
  width: 100%;
  // height: calc(100% - 6rem);
  height: 100%;
  // padding: 0 2rem;
  overflow: auto;
`;
