import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Badge, DatePicker, Form, Menu, Select } from "antd";
import { selectRecordlistReducer } from "../recordlist.slice";
import {
  InfoCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FilterListItem, useFilters } from "utils/filter";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import {
  recordfilterSlice,
  selectRecordfilterReducer,
} from "../recordfilter.slice";

const { SubMenu } = Menu;

const FormSelector = ({
  filterList,
  onChange,
}: {
  filterList: FilterListItem[];
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
      {filterList?.map((filterName, index) => (
        <Select.Option value={index}>{filterName}</Select.Option>
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

export const TaskAsidePanel = ({
  setPartialProps,
}: {
  setPartialProps: (props: any) => void;
}) => {
  const [filter, setFilter] = useState({
    from: "",
    to: "",
    isEverydayTask: false,
    deviceId: [] as number[],
    reasonId: [] as number[],
  });

  useFilters(
    ["from", "to", "isEverydayTask", "deviceId", "reasonId"],
    (filterName, itemList) => {
      setFilter({ ...filter, [filterName]: itemList });
    }
  );

  return (
    <Menu
      style={{ width: "100%", height: "100%" }}
      defaultSelectedKeys={["pending"]}
      defaultOpenKeys={["list", "filter"]}
      mode="inline"
      onClick={(event) => setPartialProps({ type: event.key })}
    >
      <SubMenu key="list" icon={<UnorderedListOutlined />} title="任务类型">
        <Menu.Item key="processing" icon={<CheckCircleOutlined />}>
          正在进行
        </Menu.Item>
        <Menu.Item key="pending" icon={<ClockCircleOutlined />}>
          等待中
        </Menu.Item>
        <Menu.Item key="paused" icon={<PauseCircleOutlined />}>
          已暂停
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
              <Form.Item label={"设备编号"}>
                <FormSelector
                  filterList={filter.deviceId.map((item) => {
                    return {
                      id: item,
                      name: item.toString(),
                    };
                  })}
                  onChange={(value) =>
                    setPartialProps({
                      location: value ? String(value) : undefined,
                    })
                  }
                />
              </Form.Item>

              <Form.Item label={"违规类型"}>
                <FormSelector
                  filterList={filter.reasonId.map((item) => {
                    return {
                      id: item,
                      name: item.toString(),
                    };
                  })}
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
