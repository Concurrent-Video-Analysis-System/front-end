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
import { TaskProps } from "./task.slice";
import { useFetchReason } from "../../../utils/fetcher/reason";
import { selectLocationReducer } from "../device/location.slice";
import { selectReasonReducer } from "../device/reason.slice";
import { selectDeviceReducer } from "../device/device.slice";
import { useFetchDevice } from "../../../utils/fetcher/device";

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
      onChange={onChange}
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

export const TaskAsidePanel = ({
  setPartialProps,
}: {
  setPartialProps: (props: any) => void;
}) => {
  useFetchDevice();
  useFetchReason();
  const deviceSelector = useSelector(selectDeviceReducer);
  const reasonSelector = useSelector(selectReasonReducer);

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
              <Form.Item label={"设备名称"}>
                <FormSelector
                  optionList={deviceSelector.deviceList.map((item) => ({
                    id: item.id,
                    name: item.name,
                  }))}
                  onChange={(value) =>
                    setPartialProps({
                      device: value,
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
                      reason: value,
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
