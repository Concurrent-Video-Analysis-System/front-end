import React from "react";
import styled from "@emotion/styled";
import { RecordHeader } from "./record-header";
import { RecordContent } from "./record-content";
import { RecordFooter } from "./record-footer";

export const RecordListFragment = () => {
  return (
    <Container>
      <Navigation>
        <RecordHeader />
      </Navigation>
      <Content>
        <RecordContent />
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
  padding: 1rem 0 0 0;
`;

const Pagination = styled.div`
  grid-area: pagination;
  padding: 1.5rem 0 1.5rem 0;
`;
