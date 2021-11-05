import React from "react";
import { AssetTemplate } from "./asset-template";
import { Button, Form, Input, InputNumber } from "antd";
import styled from "@emotion/styled";

export const NewLocationPage = () => {
  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };
  const formNumberItemStyle: React.CSSProperties = {
    width: "12rem",
  };

  return (
    <AssetTemplate title={"添加新网点"}>
      <FormContainer>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          requiredMark={false}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="网点名称"
            name="location_name"
            rules={[{ required: true, message: "请填写网点名称" }]}
          >
            <Input style={formItemStyle} />
          </Form.Item>

          <Form.Item label="网点详情说明" name="location_description">
            <Input.TextArea style={formItemStyle} rows={3} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }} name="submit">
            <Button type="primary" htmlType={"submit"}>
              添加设备
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </AssetTemplate>
  );
};

const FormContainer = styled.div`
  padding: 1rem 0;
`;
