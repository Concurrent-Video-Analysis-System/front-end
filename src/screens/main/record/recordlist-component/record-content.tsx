import React from "react";
import styled from "@emotion/styled";
import { Card, Badge, Empty } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRecordlistReducer } from "../../recordlist.slice";

export interface RecordItemProps {
  id: number;
  imageUrl?: string;
  type?: string;
  reason?: string;
  location?: string;
  date?: string;
}

interface RecordCardProps {
  label: string;
  color: string;
  imageOpacity: number;
}

const type2typeLabel = (type?: string): RecordCardProps | undefined => {
  switch (type) {
    case "pending":
      return {
        label: "待处理",
        color: "#FF0000",
        imageOpacity: 1,
      };
    case "processed":
      return {
        label: "已处理",
        color: "#2cbd00",
        imageOpacity: 0.7,
      };
    case "deleted":
      return {
        label: "已删除",
        color: "#808080",
        imageOpacity: 0.7,
      };
    default:
      return undefined;
  }
};

const RecordCard = (props: RecordItemProps) => {
  const typeLabel = type2typeLabel(props.type);

  return (
    <Link to={`${props.id}`}>
      <Badge.Ribbon text={typeLabel?.label} color={typeLabel?.color}>
        <Card
          cover={
            <img
              alt="example"
              src={props.imageUrl}
              style={{ opacity: typeLabel?.imageOpacity }}
            />
          }
          size={"small"}
          hoverable
        >
          <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
            {props.reason}
          </div>
          <div style={{ float: "left" }}>{props.location}</div>
          <div style={{ float: "right" }}>{props.date}</div>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};

export const RecordContent = () => {
  const screensCountProps = useSelector(selectRecordlistReducer);

  return screensCountProps.recordlist.length === 0 ? (
    <Empty description={<span style={{ color: "#A0A0A0" }}>无记录条目</span>} />
  ) : (
    <Container>
      {screensCountProps.recordlist.map((item) => (
        <RecordCard {...item} />
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
