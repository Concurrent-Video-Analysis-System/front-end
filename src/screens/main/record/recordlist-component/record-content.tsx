import React from "react";
import styled from "@emotion/styled";
import { Card, Badge, Empty, Pagination } from "antd";
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

interface RecordLabelProps {
  label: string;
  color: string;
  imageOpacity: number;
}

const type2typeLabel = (type?: string): RecordLabelProps | undefined => {
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

export const base64ToImage = (code?: string) => {
  if (code) {
    return `data:image/png;base64,${code}`;
  }
};

const RecordCard = ({
  props,
  onSelected,
}: {
  props: RecordItemProps;
  onSelected?: (item: RecordItemProps) => void;
}) => {
  const typeLabel = type2typeLabel(props.type);

  console.log(props);
  return (
    <Link to={`${props.id}`}>
      <Badge.Ribbon text={typeLabel?.label} color={typeLabel?.color}>
        <Card
          cover={
            <img
              alt="example"
              src={base64ToImage(props.imageUrl)}
              style={{ opacity: typeLabel?.imageOpacity }}
            />
          }
          size={"small"}
          hoverable
          onClick={() => (onSelected ? onSelected(props) : null)}
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

export const RecordContent = ({
  onRecordItemSelected,
}: {
  onRecordItemSelected?: (item: RecordItemProps) => void;
}) => {
  const screensCountProps = useSelector(selectRecordlistReducer);

  console.log(screensCountProps.recordlist);

  return (
    <Container>
      <Content>
        {screensCountProps.recordlist.length === 0 ? (
          <Empty
            description={<span style={{ color: "#A0A0A0" }}>无记录条目</span>}
          />
        ) : (
          <RecordCardContainer>
            {screensCountProps.recordlist.map((item) => (
              <RecordCard props={item} onSelected={onRecordItemSelected} />
            ))}
          </RecordCardContainer>
        )}
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
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 8rem;
  grid-template-areas: "content" "footer";
  height: calc(100% - 4rem);
`;

const RecordCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  grid-gap: 30px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
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
