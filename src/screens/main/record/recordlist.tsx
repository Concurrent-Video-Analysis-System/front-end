import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  RecordContent,
  RecordItemProps,
} from "./recordlist-component/record-content";
import { Navigate, Route, Routes } from "react-router";
import { RecordHandlingFragment } from "./recordhandling";
import { Breadcrumb, Button, Divider, Radio } from "antd";
import { ExportOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { navigateSlice, selectNavigateReducer } from "./navigate.slice";
import { Link } from "react-router-dom";
import { useForm } from "../../../utils/form";
import { recordlistSlice } from "../recordlist.slice";
import { exportRecordList } from "./export";
import { AsidePanel } from "./aside";

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

  const [selectedCard, setSelectedCard] = useState<RecordItemProps | null>(
    null
  );
  const [displayType, setDisplayType] = useState("card");

  const { setPartialProps, reload } = useForm(
    {
      type: undefined,
      location: undefined,
      reason: undefined,
      from: undefined,
      to: undefined,
    },
    "recordlist",
    (data) => {
      dispatch(recordlistSlice.actions.set(data));
    }
  );

  const onRecordItemSelected = (item: RecordItemProps) => {
    setSelectedCard(item);
    dispatch(
      navigateSlice.actions.moveTo({
        name: `${item.reason} #${item.id}`,
        path: `recordlist/${item.id}`,
      })
    );
  };

  const onHandlingUnmount = () => {
    setSelectedCard(null);
    reload();
    dispatch(navigateSlice.actions.back());
  };

  return (
    <Container>
      <RecordHeader>
        <FloatLeft>
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/recordlist"}>违规行为列表</Link>
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
              <Divider type={"vertical"} style={{ margin: "0 1rem" }} />
              <Button
                icon={<ExportOutlined />}
                type={"primary"}
                onClick={exportRecordList}
                danger
              >
                导出数据
              </Button>
            </>
          )}
        </FloatRight>
      </RecordHeader>
      <Content>
        <Routes>
          <Route
            path={":recordId/*"}
            element={<RecordHandlingFragment onUnmount={onHandlingUnmount} />}
          />
          <Route
            path={"/"}
            element={
              <RecordContent
                displayType={displayType}
                onRecordItemSelected={onRecordItemSelected}
              />
            }
          />
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
  display: grid;
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 26rem 1fr;
  grid-template-areas:
    "aside header"
    "aside main";
`;

const RecordHeader = styled.div`
  grid-area: header;
  padding: 1.5rem 0.5rem 0 2rem;
  width: 100%;
  height: 6rem;
`;

const FloatLeft = styled.div`
  float: left;
  padding-left: 0.5rem;
`;

const Content = styled.header`
  grid-area: main;
  padding: 0 2rem;
`;

const Aside = styled.header`
  grid-area: aside;
  overflow: hidden auto;
  position: fixed;
  width: 26rem;
  height: 100%;
`;

const FloatRight = styled.div`
  float: right;
  padding-right: 2rem;
`;
