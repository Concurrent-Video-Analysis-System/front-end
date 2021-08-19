import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Badge, DatePicker, Form, Menu, Select } from "antd";
import { selectRecordlistReducer } from "../recordlist.slice";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FilterListItem, useFilters } from "utils/filter";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import {
  recordfilterSlice,
  selectRecordfilterReducer,
} from "../recordfilter.slice";
import { selectLocationReducer } from "../device/location.slice";
import { selectReasonReducer } from "../device/reason.slice";
import { useFetchLocation } from "../../../utils/fetcher/location";
import { useFetchReason } from "../../../utils/fetcher/reason";

const { SubMenu } = Menu;

const FormSelector = ({
  optionList,
  onChange,
}: {
  optionList: { id: number; name: string }[];
  onChange: (value: unknown) => void;
}) => {
  return (
    <Select
      showSearch
      allowClear={true}
      placeholder={"请选择"}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onChange={(value) => onChange(value)}
    >
      {optionList?.map((option) => (
        <Select.Option value={option.id}>{option.name}</Select.Option>
      ))}
    </Select>
  );
};

const FormDateSelector = ({
  onChange,
}: {
  onChange: (date: RangeValue<Moment>) => void;
}) => {
  return (
    <DatePicker.RangePicker
      placeholder={["起始日期", "结束日期"]}
      style={{ width: "21.2rem" }}
      format={"M月D日"}
      onChange={(dates) => onChange(dates)}
    />
  );
};

export const AsidePanel = ({
  setPartialProps,
}: {
  setPartialProps: (props: any) => void;
}) => {
  useFetchLocation();
  useFetchReason();

  const recordlistSelector = useSelector(selectRecordlistReducer);
  const locationSelector = useSelector(selectLocationReducer);
  const reasonSelector = useSelector(selectReasonReducer);

  // use for badge
  const [pendingItemsCount, setPendingItemsCount] = useState(0);
  useEffect(() => {
    setPendingItemsCount(
      recordlistSelector.recordlist.reduce((prev, item) => {
        return prev + +(item.type === "pending");
      }, 0)
    );
  }, [recordlistSelector.recordlist]);

  return (
    <Menu
      style={{ width: "100%", height: "100%" }}
      defaultOpenKeys={["list", "filter"]}
      mode="inline"
      onClick={(event) => setPartialProps({ type: event.key })}
    >
      <SubMenu key="list" icon={<UnorderedListOutlined />} title="违规行为列表">
        <Menu.Item key="pending" icon={<InfoCircleOutlined />}>
          <Badge count={pendingItemsCount} offset={[20, 0]}>
            待处理
          </Badge>
        </Menu.Item>
        <Menu.Item key="processed" icon={<CheckCircleOutlined />}>
          已处理
        </Menu.Item>
        <Menu.Item key="deleted" icon={<CloseCircleOutlined />}>
          已删除
        </Menu.Item>
      </SubMenu>
      <SubMenu key="filter" icon={<SearchOutlined />} title="筛选列表">
        <Menu.ItemGroup>
          <FormContainer>
            <Form
              labelCol={{ span: "4rem" }}
              wrapperCol={{ span: "1rem" }}
              layout="horizontal"
            >
              <Form.Item label={"营业网点"}>
                <FormSelector
                  optionList={locationSelector.locationList.map((item) => ({
                    id: item.id,
                    name: item.name,
                  }))}
                  onChange={(value) =>
                    setPartialProps({
                      location: value ? String(value) : undefined,
                    })
                  }
                />
              </Form.Item>

              <Form.Item label={"违规类型"}>
                <FormSelector
                  optionList={reasonSelector.reasonList.map((item) => ({
                    id: item.id,
                    name: item.name,
                  }))}
                  onChange={(value) => {
                    setPartialProps({
                      reason: value ? String(value) : undefined,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item label={"违规时间"}>
                <FormDateSelector
                  onChange={(dates) => {
                    if (dates === null) {
                      setPartialProps({ from: undefined, to: undefined });
                    } else {
                      const [fromDate, toDate] = dates;
                      setPartialProps({
                        from: fromDate?.format("YYYY-MM-DD"),
                        to: toDate?.format("YYYY-MM-DD"),
                      });
                    }
                  }}
                />
              </Form.Item>
            </Form>
          </FormContainer>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

const FormContainer = styled.div`
  padding: 0 1.5rem 1.5rem 3rem;
`;
