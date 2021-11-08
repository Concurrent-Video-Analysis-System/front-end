import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AssetTemplate } from "./asset-template";
import { Button, Form, Input, InputNumber, message } from "antd";
import styled from "@emotion/styled";
import { EmphasizedText } from "components/title/emphasized";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { usePartialState } from "utils/state-pro";
import { CreateNvrProps, useNvr } from "utils/crud/nvr";

export const NewNvrPage = () => {
  const [searchParams] = useSearchParams();
  const locationId = useMemo(() => {
    return searchParams.get("location");
  }, [searchParams]);

  const navigate = useNavigate();
  const { locationList } = useGeneralQuery();
  const location = useMemo(() => {
    return locationList?.find(
      (location) => location.id === +(locationId || "")
    );
  }, [locationId, locationList]);

  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };
  const formNumberItemStyle: React.CSSProperties = {
    width: "12rem",
  };

  const [nvrForm, setNvrForm] = usePartialState<CreateNvrProps>();
  const { newNvr } = useNvr();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    console.log(nvrForm as CreateNvrProps);
    newNvr(nvrForm as CreateNvrProps)
      .then(() => {
        setIsLoading(false);
        return message.success(`NVR 新建成功！`);
      })
      .catch((errorMessage) => {
        setIsLoading(false);
        return message.error(`新建 NVR 时出错：${errorMessage}`);
      });
  };

  useEffect(() => {
    if (!location) {
      message.error(`找不到编号为 ${locationId} 的网点`, 2).then(null);
      navigate(`/asset/location`);
    }
    setNvrForm("netId", location?.id);
  }, [location, locationId, navigate, setNvrForm]);

  return (
    <AssetTemplate
      title={EmphasizedText(
        `在网点 ${location?.name} 下添加新 NVR`,
        `${location?.name}`,
        "#1890ff"
      )}
    >
      <FormContainer>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          requiredMark={false}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="NVR 名称"
            name="nvr_name"
            rules={[{ required: true, message: "请填写 NVR 名称" }]}
          >
            <Input
              style={formItemStyle}
              onChange={(e) => setNvrForm("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="IP 地址"
            name="nvr_ip"
            rules={[{ required: true, message: "请填写 IP 地址" }]}
          >
            <Input
              style={formItemStyle}
              placeholder={"形如 XXX . XXX . XXX . XXX"}
              onChange={(e) => setNvrForm("ip", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="端口号"
            name="nvr_port"
            rules={[{ required: true, message: "请填写端口号" }]}
          >
            <InputNumber
              min={0}
              max={99999}
              style={formNumberItemStyle}
              onChange={(value) => setNvrForm("port", value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }} name="submit">
            <Button
              type="primary"
              loading={isLoading}
              htmlType={"submit"}
              onClick={handleSubmit}
            >
              添加 NVR
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
