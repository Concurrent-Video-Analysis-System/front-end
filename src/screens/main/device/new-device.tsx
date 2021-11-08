import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AssetTemplate } from "./asset-template";
import { Button, Form, Input, InputNumber, message } from "antd";
import styled from "@emotion/styled";
import { EmphasizedText } from "components/title/emphasized";
import { useGeneralQuery } from "utils/new-fetcher/general";
import { usePartialState } from "utils/state-pro";
import { CreateDeviceProps, useDevice } from "utils/crud/device";
import { useUpdateGeneralLists } from "../../../utils/general-list";

export const NewDevicePage = () => {
  const [searchParams] = useSearchParams();
  const nvrId = useMemo(() => {
    return searchParams.get("nvr");
  }, [searchParams]);

  const navigate = useNavigate();
  const { locationList, nvrList } = useGeneralQuery();
  const nvr = useMemo(() => {
    return nvrList?.find((nvr) => nvr.id === +(nvrId || ""));
  }, [nvrId, nvrList]);

  const location = useMemo(() => {
    return locationList?.find(
      (location) => location.id === +(nvr?.location.id || "")
    );
  }, [locationList, nvr]);

  useEffect(() => {
    if (!nvr) {
      message.error(`找不到编号为 ${nvrId} 的 NVR`, 2).then(null);
      navigate(`/asset/nvr`);
    }
    setDeviceForm("nvrId", nvr?.id);
    setDeviceForm("netId", location?.id);
  }, [navigate, nvr, nvrId, location]);

  const [deviceForm, setDeviceForm] = usePartialState<CreateDeviceProps>();
  const { newDevice } = useDevice();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    newDevice(deviceForm as CreateDeviceProps)
      .then(() => {
        setIsLoading(false);
        return message.success(`设备新建成功！`);
      })
      .catch((errorMessage) => {
        setIsLoading(false);
        return message.error(`新建设备时出错：${errorMessage}`);
      });
  };

  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };
  const formNumberItemStyle: React.CSSProperties = {
    width: "12rem",
  };

  return (
    <AssetTemplate
      title={EmphasizedText(
        `在 NVR ${nvr?.name} 下添加新设备`,
        `${nvr?.name}`,
        "#f88700"
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
            label="设备名称"
            name="device_name"
            rules={[{ required: true, message: "请填写设备名称" }]}
          >
            <Input
              style={formItemStyle}
              onChange={(e) => setDeviceForm("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="设备权限用户名"
            name="device_username"
            rules={[{ required: true, message: "请填写用户名" }]}
          >
            <Input
              style={formItemStyle}
              onChange={(e) => setDeviceForm("deviceUserName", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="设备权限密码"
            name="device_password"
            rules={[{ required: true, message: "请填写密码" }]}
          >
            <Input.Password
              style={formItemStyle}
              onChange={(e) => setDeviceForm("devicePassword", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="端口号"
            name="port"
            rules={[{ required: true, message: "请填写端口号" }]}
          >
            <InputNumber
              min={0}
              max={99999}
              style={formNumberItemStyle}
              onChange={(value) => setDeviceForm("port", value)}
            />
          </Form.Item>

          <Form.Item
            label="通道号"
            name="channel"
            rules={[{ required: true, message: "请填写通道号" }]}
          >
            <InputNumber
              min={0}
              max={99999}
              style={formNumberItemStyle}
              onChange={(value) => setDeviceForm("channel", value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }} name="submit">
            <Button
              type="primary"
              loading={isLoading}
              htmlType={"submit"}
              onClick={handleSubmit}
            >
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
