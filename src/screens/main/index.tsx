import React from "react";
import styled from "@emotion/styled";
import { Header } from "./header";
import { RecordIndexFragment } from "./record";
import { useDocumentTitle } from "../../utils/document-title";
import { Navigate, Route, Routes } from "react-router";
import { DeviceIndexFragment } from "./device";
import { TaskIndexFragment } from "./task";
import { DashBoard } from "./dashboard";
import { MenuNavigator } from "./menu";

export const MainFragment = () => {
  useDocumentTitle("海量数据智能并发解析平台");

  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <ContentContainer>
        <Routes>
          <Route path={"record/*"} element={<RecordIndexFragment />} />
          <Route path={"device/*"} element={<DeviceIndexFragment />} />
          <Route path={"task/*"} element={<TaskIndexFragment />} />
          <Route path={"dashboard/*"} element={<DashBoard />} />
          <Navigate to={"dashboard"} />
        </Routes>
      </ContentContainer>
      <AsideContainer>
        <MenuNavigator />
      </AsideContainer>
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
