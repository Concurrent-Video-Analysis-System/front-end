import React from "react";
import { Pagination } from "antd";
import styled from "@emotion/styled";

export const RecordFooter = () => {
  return (
    <Container>
      <Pagination
        showQuickJumper
        showSizeChanger={false}
        defaultCurrent={1}
        total={100}
        style={{ textAlign: "center" }}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
