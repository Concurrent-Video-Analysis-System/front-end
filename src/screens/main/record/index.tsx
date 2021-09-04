import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { RecordContent, RecordItemProps } from "./content";
import { Route, Routes } from "react-router";
import { RecordHandlingFragment } from "./handle";
import { Button, Divider, Radio } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExportOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { navigateSlice } from "./navigate.slice";
import { useForm } from "utils/form";
import { recordlistSlice } from "../recordlist.slice";
import { exportRecordList } from "./export";
import { useDocumentTitle } from "utils/document-title";
import { FilterBar } from "../../../components/filter-bar/filter-bar";
import { selectGeneralListReducer } from "../general-list.slice";
import { ReasonProps } from "../device/reason.slice";
import { DeviceProps } from "../device/device.slice";
import { useDebugImageCard } from "./__debug__/__debug_image_card__";

const TypeSwitcher = <K extends string>({
  types,
  initialType,
  onChange,
}: {
  types: { label: JSX.Element; value: K }[];
  initialType?: K;
  onChange?: (type: K) => void;
}) => {
  return (
    <Radio.Group
      defaultValue={initialType}
      optionType="button"
      buttonStyle="solid"
      style={{ minWidth: "9.5rem" }}
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

export const RecordIndexFragment = () => {
  useDocumentTitle("违规记录列表");

  const generalListSelector = useSelector(selectGeneralListReducer);
  const reasonList = useMemo(
    () => generalListSelector.generalList.reason as ReasonProps[] | undefined,
    [generalListSelector]
  );
  const deviceList = useMemo(
    () => generalListSelector.generalList.device as DeviceProps[] | undefined,
    [generalListSelector]
  );

  const dispatch = useDispatch();

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

  const recordFilters = useMemo(() => {
    return [
      {
        key: "type",
        title: "处理状态",
        options: [
          {
            key: "pending",
            title: "待处理",
            icon: <InfoCircleFilled style={{ color: "#f65353" }} />,
          },
          {
            key: "processed",
            title: "已处理",
            icon: <CheckCircleFilled style={{ color: "#2cbd00" }} />,
          },
          {
            key: "deleted",
            title: "已删除",
            icon: <CloseCircleFilled style={{ color: "#808080" }} />,
          },
        ],
      },
      {
        key: "reason",
        title: "违规类型",
        options:
          reasonList?.map((reason) => ({
            key: reason.id,
            title: reason.name,
          })) || [],
      },
      {
        key: "device",
        title: "监控设备",
        options:
          deviceList?.map((device) => ({
            key: device.id,
            title: device.name,
          })) || [],
      },
    ];
  }, [reasonList, deviceList]);

  useEffect(() => {
    console.log(recordFilters);
  }, [recordFilters]);

  const onHandlingUnmount = () => {
    setSelectedCard(null);
    reload();
    dispatch(navigateSlice.actions.back());
  };

  return (
    <Container>
      <Header>
        <FilterBar<React.Key, React.Key>
          filters={recordFilters}
          onFilterUpdate={(filter, option) => console.log(filter, option)}
        />
        <FloatRight>
          <div style={{ minWidth: "8rem" }}>展示格式：</div>
          <TypeSwitcher
            types={[
              { label: <AppstoreOutlined />, value: "card" },
              { label: <BarsOutlined />, value: "table" },
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
        </FloatRight>
      </Header>
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
                recordlist={filteredRecords?.records || []}
                displayType={displayType}
                onRecordItemSelected={onRecordItemSelected}
              />
            }
          />
        </Routes>
      </Content>
      {/*<Aside>
        <AsidePanel setPartialProps={setPartialProps} />
      </Aside>*/}
      <Footer></Footer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  padding: 0 2rem;
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.header`
  width: 100%;
  height: calc(100% - 6rem - 10rem);
  padding: 0 2rem;
  overflow: auto;
`;

const FloatRight = styled.div`
  margin-left: auto;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Footer = styled.div`
  width: 100%;
  height: 10rem;
`;
