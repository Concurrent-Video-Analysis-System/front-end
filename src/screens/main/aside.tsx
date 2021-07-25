import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Badge, DatePicker, Form, Menu, message, Select } from "antd";
import { recordlistSlice } from "./recordlist.slice";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useForm } from "utils/form";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

const { SubMenu } = Menu;

const FormSelector = ({ onChange }: { onChange: (value: unknown) => void }) => {
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
      <Select.Option value={1}>AAA分行</Select.Option>
      <Select.Option value={2}>BBB分行</Select.Option>
      <Select.Option value={3}>CCC分行</Select.Option>
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

export const AsidePanel = () => {
  const dispatch = useDispatch();

  const { props, setPartialProps, isLoading } = useForm(
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
    },
    (error) => {
      message.error(error.message);
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
      <SubMenu key="list" icon={<UnorderedListOutlined />} title="违规行为列表">
        <Menu.Item key="pending" icon={<InfoCircleOutlined />}>
          <Badge count={5} offset={[15, 0]}>
            待处理
          </Badge>
        </Menu.Item>
        <Menu.Item key="processed" icon={<CheckCircleOutlined />}>
          <Badge count={0}>已处理</Badge>
        </Menu.Item>
        <Menu.Item key="deleted" icon={<CloseCircleOutlined />}>
          <Badge count={0}>已删除</Badge>
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
                  onChange={(value) =>
                    setPartialProps({
                      location: value ? String(value) : undefined,
                    })
                  }
                />
              </Form.Item>

              <Form.Item label={"违规类型"}>
                <FormSelector
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
