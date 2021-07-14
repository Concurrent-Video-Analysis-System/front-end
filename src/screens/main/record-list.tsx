import React from "react";
import styled from "@emotion/styled";
import { Card } from "antd";

const RecordCard = () => {
  return (
    <Card title="Default size card" style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export const RecordList = () => {
  return (
    <Container>
      <RecordCard />
      <RecordCard />
      <RecordCard />
      <RecordCard />
      <RecordCard />
      <RecordCard />
      <RecordCard />
      <RecordCard />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  grid-gap: 30px;
`;
