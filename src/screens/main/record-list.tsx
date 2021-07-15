import React from "react";
import styled from "@emotion/styled";
import { Card, Badge } from "antd";

const RecordCard = () => {
  return (
    <Badge.Ribbon text="待处理" color={"#FF0000"}>
      <Card
        cover={<img alt="example" src="template.jpg" style={{ opacity: 1 }} />}
        hoverable
      >
        <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
          离开工位时未锁屏
        </div>
        <div>XXX营业网点YYY分行</div>
      </Card>
    </Badge.Ribbon>
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
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-gap: 30px;
  padding-right: 0.8rem;
`;
