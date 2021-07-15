import React from "react";
import styled from "@emotion/styled";
import { RecordContent } from "./recordlist-component/record-content";
import { Route, Routes } from "react-router";
import { RecordHandlingFragment } from "./recordhandling";
import { Breadcrumb, Pagination } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export const RecordListFragment = () => {
  return (
    <Container>
      <RecordHeader>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>违规行为列表</Breadcrumb.Item>
          <Breadcrumb.Item>待处理</Breadcrumb.Item>
        </Breadcrumb>
      </RecordHeader>
      <Routes>
        <Route path={"/recordlist"} element={<RecordContentWithPagination />} />
        <Route
          path={"/recordlist/:recordId/*"}
          element={<RecordHandlingFragment />}
        />
      </Routes>
    </Container>
  );
};

const RecordContentWithPagination = () => {
  return (
    <SubContainer>
      <Content>
        <RecordContent />
      </Content>
      <RecordFooter>
        <Pagination
          showQuickJumper
          showSizeChanger={false}
          defaultCurrent={1}
          total={100}
          style={{ textAlign: "center" }}
        />
      </RecordFooter>
    </SubContainer>
  );
};

const Container = styled.div`
  height: 100%;
  padding: 0 2rem 0 2rem;
`;

const SubContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 8rem;
  grid-template-areas: "content" "footer";
  height: calc(100% - 4rem);
`;

const RecordHeader = styled.div`
  padding-top: 1.5rem;
  width: 100%;
  height: 4rem;
`;

const Content = styled.div`
  padding: 1rem 0 0 0;
  grid-area: content;
`;

const RecordFooter = styled.div`
  padding: 2rem 0 2rem 0;
  height: 6rem;
  width: 100%;
  grid-area: footer;
`;
