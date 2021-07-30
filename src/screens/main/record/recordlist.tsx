import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  RecordContent,
  RecordItemProps,
} from "./recordlist-component/record-content";
import { Navigate, Route, Routes } from "react-router";
import { RecordHandlingFragment } from "./recordhandling";
import { Breadcrumb, Radio } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { navigateSlice, selectNavigateReducer } from "./navigate.slice";
import { useDebugImageCard } from "./__debug__/__debug_image_card__";
import { Link } from "react-router-dom";

const TypeSwitcher = <K extends string>({
  types,
  initialType,
  onChange,
}: {
  types: { label: string; value: K }[];
  initialType?: K;
  onChange?: (type: K) => void;
}) => {
  return (
    <Radio.Group
      defaultValue={initialType}
      optionType="button"
      buttonStyle="solid"
      onChange={(event) => {
        if (onChange) {
          onChange(event.target.value);
        }
      }}
    >
      {types.map((type) => (
        <Radio.Button value={type.value}>{type.label}</Radio.Button>
      ))}
    </Radio.Group>
  );
};

export const RecordListFragment = () => {
  const dispatch = useDispatch();
  const navigateSelector = useSelector(selectNavigateReducer);

  useDebugImageCard();

  const [selectedCard, setSelectedCard] = useState<RecordItemProps | null>(
    null
  );
  const [displayType, setDisplayType] = useState<string>("card");

  return (
    <Container>
      <RecordHeader>
        <FloatLeft>
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"recordlist"}>违规行为列表</Link>
            </Breadcrumb.Item>
            {navigateSelector.map((item) => (
              <Breadcrumb.Item>
                <Link to={item.path}>{item.name}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </FloatLeft>
        <FloatRight>
          展示格式：&nbsp;
          <TypeSwitcher
            types={[
              { label: "卡片", value: "card" },
              { label: "表格", value: "table" },
            ]}
            initialType={displayType}
            onChange={setDisplayType}
          />
        </FloatRight>
      </RecordHeader>
      <Routes>
        <Route
          path={"recordlist"}
          element={
            <RecordContent
              displayType={displayType}
              onRecordItemSelected={(item) => {
                setSelectedCard(item);
                console.log(selectedCard);
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
  padding-top: 2rem;
  width: 100%;
  height: 6rem;
`;

const FloatLeft = styled.div`
  float: left;
  padding-left: 0.5rem;
`;

const FloatRight = styled.div`
  float: right;
  padding-right: 2rem;
`;
