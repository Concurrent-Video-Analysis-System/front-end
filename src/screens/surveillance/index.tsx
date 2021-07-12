import React from "react";
import styled from "@emotion/styled";
import { SurveillanceHeader } from "./header";
import { AsidePanel } from "./aside";
import { MonitorView } from "./monitor-view";

export const SurveillanceFragment = () => {
  return (
    <Container>
      <Header>
        <SurveillanceHeader />
      </Header>
      <Main>
        <MonitorView />
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
  grid-template-columns: 1fr 30rem;
  grid-template-areas:
    "header header"
    "main aside";
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
`;
