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
            <img alt="example" src={props.imageUrl} style={{ opacity: 1 }} />
          }
          size={"small"}
          hoverable
        >
          <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
            {props.title}
          </div>
          <div>{props.text}</div>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};

export const RecordContent = () => {
  return (
    <Container>
      {Array.from(Array(8).keys()).map((i) => (
        <RecordCard
          id={i}
          imageUrl={"/__test__/template2.jpg"}
          title={"违规行为名称"}
          text={"XX路XX网点"}
        />
      ))}
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
