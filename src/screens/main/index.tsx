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
import { BreadcrumbNavigator } from "./breadcrumb";

export const MainFragment = () => {
  useDocumentTitle("海量数据智能并发解析平台");

  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <AsideContainer>
        <MenuNavigator />
      </AsideContainer>
      <ContentContainer>
        <BreadcrumbNavigator icon={<></>} />
        <Routes>
          <Route path={"record/*"} element={<RecordIndexFragment />} />
          <Route path={"device/*"} element={<DeviceIndexFragment />} />
          <Route path={"task/*"} element={<TaskIndexFragment />} />
          <Route path={"dashboard/*"} element={<DashBoard />} />
          <Navigate to={"/dashboard"} />
        </Routes>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 5.5rem;
  z-index: 3;
`;

const ContentContainer = styled.div`
  grid-area: main;
  overflow: auto;
  width: calc(100% - 26rem);
  position: absolute;
  left: 26rem;
  top: 5.5rem;
`;

const AsideContainer = styled.div`
  grid-area: aside;
  overflow: hidden auto;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 5.5rem;
  width: 26rem;
  height: 100%;
`;
