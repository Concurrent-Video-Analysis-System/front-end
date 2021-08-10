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
import { useForm } from "../../../utils/form";
import { recordlistSlice } from "../recordlist.slice";

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

export const RecordListFragment = ({
  reloadList,
}: {
  reloadList: () => void;
}) => {
  const dispatch = useDispatch();
  const navigateSelector = useSelector(selectNavigateReducer);

  const [selectedCard, setSelectedCard] = useState<RecordItemProps | null>(
    null
  );
  const [displayType, setDisplayType] = useState("card");

  return (
    <Container>
      <RecordHeader>
        <FloatLeft>
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/"}>违规行为列表</Link>
            </Breadcrumb.Item>
            {navigateSelector.navigateList.map((item) => (
              <Breadcrumb.Item>
                <Link to={item.path}>{item.name}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </FloatLeft>
        <FloatRight>
          {selectedCard ? null : (
            <>
              展示格式：&nbsp;
              <TypeSwitcher
                types={[
                  { label: "卡片", value: "card" },
                  { label: "表格", value: "table" },
                ]}
                initialType={displayType}
                onChange={setDisplayType}
              />
            </>
          )}
        </FloatRight>
      </RecordHeader>
      <Content>
        <Routes>
          <Route
            path={"/"}
            element={
              <RecordContent
                displayType={displayType}
                onRecordItemSelected={onRecordItemSelected}
              />
            }
          />
          <Route
            path={":recordId/*"}
            element={
              <RecordHandlingFragment
                recordItem={selectedCard}
                onUnmount={onHandlingUnmount}
              />
            }
          />
          <Navigate to={"/"} />
        </Routes>
      </Content>
      <Aside>
        <AsidePanel setPartialProps={setPartialProps} />
      </Aside>
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
