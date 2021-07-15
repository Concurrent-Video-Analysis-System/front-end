import React from "react";
import styled from "@emotion/styled";
import { SurveillanceHeader } from "./header";
import { AsidePanel } from "./aside";
import { RecordListFragment } from "./record";
import { useDocumentTitle } from "../../utils/document-title";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

export const MainFragment = () => {
  useDocumentTitle("违规行为列表");
  return (
    <Container>
      <Header>
        <SurveillanceHeader />
      </Header>
      <Main>
        <Router>
          <Routes>
            <Route path={"/recordlist"} element={<RecordListFragment />} />
          </Routes>
        </Router>
      </Main>
      <Aside>
        <AsidePanel />
      </Aside>
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

const Header = styled.header`
  grid-area: header;
`;
const Main = styled.header`
  grid-area: main;
`;
const Aside = styled.header`
  grid-area: aside;
  overflow: hidden auto;
`;
