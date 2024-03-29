import React from "react";
import styled from "@emotion/styled";
import { Header } from "./header";
import { useDocumentTitle } from "../../utils/document-title";
import { Outlet } from "react-router-dom";
import { MenuNavigator } from "./menu";
import { BreadcrumbNavigator } from "./breadcrumb";
import { useGeneralLists } from "utils/general-list";

export const MainPageFrame = () => {
  useDocumentTitle("海量数据智能并发解析平台");
  useGeneralLists([
    "device",
    "nvr",
    "location",
    "reason",
    "task",
    "recordlist",
  ]);

  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <AsideContainer>
        <MenuNavigator />
      </AsideContainer>
      <NavigatorContainer>
        <BreadcrumbNavigator icon={<></>} />
      </NavigatorContainer>
      <ContentContainer>
        <Outlet />
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
  overflow: auto;
  width: calc(100% - 26rem);
  height: calc(100% - 10rem);
  position: absolute;
  left: 26rem;
  top: 10rem;
`;

const AsideContainer = styled.div`
  overflow: hidden auto;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 5.5rem;
  width: 26rem;
  height: 100%;
`;

const NavigatorContainer = styled.div`
  position: absolute;
  width: calc(100% - 26rem);
  height: 4.5rem;
  left: 26rem;
  top: 5.5rem;
`;
