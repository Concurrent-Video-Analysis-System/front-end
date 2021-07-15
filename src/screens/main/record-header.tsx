import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export const RecordHeader = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>违规行为列表</Breadcrumb.Item>
      <Breadcrumb.Item>待处理</Breadcrumb.Item>
    </Breadcrumb>
  );
};
