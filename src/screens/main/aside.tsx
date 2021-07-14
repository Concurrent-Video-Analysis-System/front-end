import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Badge, DatePicker, Form, Menu, Select } from "antd";
import { selectScreensCountProps } from "./surveillance.slice";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  UnorderedListOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export const AsidePanel = () => {
  const dispatch = useDispatch();
  const screensCountProps = useSelector(selectScreensCountProps);

  return (
    <Menu
      style={{ width: "100%", height: "100%" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["list", "filter"]}
      mode="inline"
    >
      <SubMenu key="list" icon={<UnorderedListOutlined />} title="违规行为列表">
        <Menu.Item key="1" icon={<InfoCircleOutlined />}>
          <Badge count={5} offset={[15, 0]}>
            待处理
          </Badge>
        </Menu.Item>
        <Menu.Item key="2" icon={<CheckCircleOutlined />}>
          <Badge count={0}>已处理</Badge>
        </Menu.Item>
        <Menu.Item key="3" icon={<CloseCircleOutlined />}>
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
                <Select
                  showSearch
                  allowClear={true}
                  placeholder={"请选择"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value={1}>AAA分行</Select.Option>
                  <Select.Option value={2}>BBB分行</Select.Option>
                  <Select.Option value={3}>CCC分行</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label={"违规类型"}>
                <Select
                  showSearch
                  allowClear={true}
                  placeholder={"请选择"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value={1}>手机拍照</Select.Option>
                  <Select.Option value={2}>ATM违规操作</Select.Option>
                  <Select.Option value={3}>遮挡摄像头</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label={"违规时间"}>
                <DatePicker placeholder={"请选择日期"} />
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
