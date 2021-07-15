import React from "react";
import styled from "@emotion/styled";
import { Card, Badge } from "antd";
import { Link } from "react-router-dom";

interface RecordCardProps {
  id: number;
  imageUrl?: string;
  title?: string;
  text?: string;
}

const RecordCard = (props: RecordCardProps) => {
  return (
    <Link to={`${props.id}`}>
      <Badge.Ribbon text="待处理" color={"#FF0000"}>
        <Card
          cover={
            <img alt="example" src="template.jpg" style={{ opacity: 1 }} />
          }
          hoverable
        >
          <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
            离开工位时未锁屏
          </div>
          <div>XXX营业网点YYY分行</div>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};

export const RecordContent = () => {
  return (
    <Container>
      <RecordCard id={1} />
      <RecordCard id={2} />
      <RecordCard id={3} />
      <RecordCard id={4} />
      <RecordCard id={5} />
      <RecordCard id={6} />
      <RecordCard id={7} />
      <RecordCard id={8} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-gap: 30px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
`;
