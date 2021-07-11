import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export const LoginFragment = () => {
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={() => {}}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "用户名不能为空！" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
          size={"large"}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "密码不能为空！" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
          size={"large"}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size={"large"}
          block
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
