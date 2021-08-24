import React from "react";
import styled from "@emotion/styled";
import { SurveillanceHeader } from "./header";
import { RecordListFragment } from "./record/recordlist";
import { useDocumentTitle } from "../../utils/document-title";
import { Route, Routes } from "react-router";
import { DeviceIndexFragment } from "./device";
import { TaskIndexFragment } from "./task";
import { DashBoard } from "./dashboard";

export const MainFragment = () => {
  useDocumentTitle("海量数据智能并发解析平台");

  return (
    <Container>
      <Header>
        <SurveillanceHeader />
      </Header>
      <Main>
        <Routes>
          <Route path={"recordlist/*"} element={<RecordListFragment />} />
          <Route path={"device/*"} element={<DeviceIndexFragment />} />
          <Route path={"task/*"} element={<TaskIndexFragment />} />
          <Route path={"/"} element={<DashBoard />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 5.5rem 1fr;
  grid-template-areas:
    "header"
    "main";
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
`;
const Main = styled.header`
  grid-area: main;
`;
