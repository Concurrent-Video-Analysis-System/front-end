import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  RecordContent,
  RecordItemProps,
} from "./recordlist-component/record-content";
import { Navigate, Route, Routes } from "react-router";
import { RecordHandlingFragment } from "./recordhandling";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { navigateSlice, selectNavigateReducer } from "./navigate.slice";
import { useDebugImageCard } from "./__debug__/__debug_image_card__";
import { Link } from "react-router-dom";

export const RecordListFragment = () => {
  const dispatch = useDispatch();
  const navigateSelector = useSelector(selectNavigateReducer);

  useDebugImageCard();

  const [selectedCard, setSelectedCard] = useState<RecordItemProps | null>(
    null
  );

  return (
    <Container>
      <RecordHeader>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={"recordlist"}>违规行为列表</Link>
          </Breadcrumb.Item>
          {navigateSelector.map((item) => (
            <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </RecordHeader>
      <Routes>
        <Route
          path={"recordlist"}
          element={
            <RecordContent
              onRecordItemSelected={(item) => {
                setSelectedCard(item);
                dispatch(
                  navigateSlice.actions.moveTo({
                    name: `item.reason #${item.id}`,
                    path: `recordlist/${item.id}`,
                  })
                );
              }}
            />
          }
        />
        <Route
          path={"recordlist/:recordId/*"}
          element={<RecordHandlingFragment recordItem={selectedCard} />}
        />
        <Navigate to={"recordlist"} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  padding: 0 2rem 0 2rem;
`;

const RecordHeader = styled.div`
  padding-top: 1.5rem;
  width: 100%;
  height: 4rem;
`;
