import React, { useState } from "react";
import { AssetTemplate } from "./asset-template";
import { Button, Form, Input, message } from "antd";
import styled from "@emotion/styled";
import { usePartialState } from "utils/state-pro";
import { CreateLocationProps, useBankLocation } from "utils/crud/location";

export const NewLocationPage = () => {
  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };

  const [locationForm, setLocationForm] =
    usePartialState<CreateLocationProps>();
  const { newLocation } = useBankLocation();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    console.log(locationForm as CreateLocationProps);
    newLocation(locationForm as CreateLocationProps)
      .then(() => {
        setIsLoading(false);
        return message.success(`网点新建成功！`);
      })
      .catch((errorMessage) => {
        setIsLoading(false);
        return message.error(`新建网点时出错：${errorMessage}`);
      });
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
            <Input
              style={formItemStyle}
              onChange={(e) => {
                setLocationForm("name", e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="网点详情说明" name="location_description">
            <Input.TextArea
              style={formItemStyle}
              rows={3}
              placeholder={"选填，填入如网点地址等说明信息"}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }} name="submit">
            <Button
              type="primary"
              htmlType={"submit"}
              loading={isLoading}
              onClick={handleSubmit}
            >
              添加网点
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
