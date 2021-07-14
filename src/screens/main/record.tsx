import React from "react";
import styled from "@emotion/styled";
import { RecordHeader } from "./record-header";
import { RecordList } from "./record-list";
import { RecordFooter } from "./record-footer";

export const RecordFragment = () => {
  return (
    <Container>
      <Navigation>
        <RecordHeader />
      </Navigation>
      <Content>
        <RecordList />
      </Content>
      <Pagination>
        <RecordFooter />
      </Pagination>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr 6rem;
  grid-template-areas:
    "navigation"
    "content"
    "pagination";
  height: 100%;
  padding: 1.5rem 3rem 1.5rem 3rem;
`;

const Navigation = styled.div`
  grid-area: navigation;
`;

const Content = styled.div`
  grid-area: content;
  overflow: hidden auto;
`;

const Pagination = styled.div`
  grid-area: pagination;
  margin: 1.5rem 0 1.5rem 0;
`;
