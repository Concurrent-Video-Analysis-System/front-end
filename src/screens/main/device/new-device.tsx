import React, { ReactNode, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLocationReducer } from "./location.slice";
import { DeviceProps, selectDeviceReducer } from "./device.slice";
import { AssetTemplate } from "./asset-template";
import { Button, Form, Input, InputNumber, message } from "antd";
import styled from "@emotion/styled";

export const NewDevicePage = () => {
  const [searchParams] = useSearchParams();
  const locationId = useMemo(() => {
    return searchParams.get("location");
  }, [searchParams]);

  const navigate = useNavigate();

  const locationSelector = useSelector(selectLocationReducer);
  const deviceSelector = useSelector(selectDeviceReducer);

  const location = useMemo(() => {
    return locationSelector.locationList.find(
      (item) => item.id === +(locationId || "")
    );
  }, [locationId, locationSelector.locationList]);

  useEffect(() => {
    if (!location) {
      message.error(`找不到编号为 ${locationId} 的网点`, 2).then(null);
      navigate(`/asset/device`);
    }
  }, [location]);

  const deviceAtLocation = useMemo(() => {
    if (!location) {
      return [] as DeviceProps[];
    }
    return deviceSelector.deviceList.filter(
      (device) => device.location.id === location.id
    );
  }, [location, deviceSelector.deviceList]);

  const formItemStyle: React.CSSProperties = {
    width: "75%",
  };
  const formNumberItemStyle: React.CSSProperties = {
    width: "12rem",
  };

  return (
    <AssetTemplate
      title={emphasizedText(
        `在网点${location?.name}下添加新设备`,
        location?.name || "",
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
            label="设备名称"
            name="device_name"
            rules={[{ required: true, message: "请填写设备名称" }]}
          >
            <Input style={formItemStyle} />
          </Form.Item>

          <Form.Item
            label="设备权限用户名"
            name="device_username"
            rules={[{ required: true, message: "请填写用户名" }]}
          >
            <Input style={formItemStyle} />
          </Form.Item>

          <Form.Item
            label="设备权限密码"
            name="device_password"
            rules={[{ required: true, message: "请填写密码" }]}
          >
            <Input.Password style={formItemStyle} />
          </Form.Item>

          <Form.Item
            label="端口号"
            name="port"
            rules={[{ required: true, message: "请填写端口号" }]}
          >
            <InputNumber min={0} max={99999} style={formNumberItemStyle} />
          </Form.Item>

          <Form.Item
            label="通道号"
            name="channel"
            rules={[{ required: true, message: "请填写通道号" }]}
          >
            <InputNumber min={0} max={99999} style={formNumberItemStyle} />
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

const emphasizedText = (
  title: string,
  emphasis: string,
  emphasisColor?: string
) => {
  return title.split(emphasis).reduce((prev, item, index) => {
    if (index !== 0) {
      prev.push(<span style={{ color: emphasisColor }}>{emphasis}</span>);
    }
    prev.push(<>{item}</>);
    return prev;
  }, [] as React.ReactNode[]) as ReactNode;
};

const FormContainer = styled.div`
  padding: 1rem 0;
`;
