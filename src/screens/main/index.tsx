import React from "react";
import styled from "@emotion/styled";
import { SurveillanceHeader } from "./header";
import { RecordListFragment } from "./record/recordlist";
import { useDocumentTitle } from "../../utils/document-title";
import { Route, Routes } from "react-router";
import { DeviceIndexFragment } from "./device";
import { TaskIndexFragment } from "./task";
import { DashBoard } from "./dashboard";
import { MenuNavigator } from "./menu";

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
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 26rem 1fr;
  grid-template-areas:
    "header header"
    "aside main";
  height: 100vh;
`;

const HeaderContainer = styled.header`
  grid-area: header;
`;
const ContentContainer = styled.header`
  grid-area: main;
`;

const AsideContainer = styled.div`
  grid-area: aside;
`;
