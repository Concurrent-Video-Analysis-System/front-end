import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthForm } from "utils/authorize";
import { useAuthContext } from "contexts/authorize";
import { DebugLogin } from "./__debug_login__";

export const LoginFragment = ({
  onLoginSuccess,
}: {
  onLoginSuccess?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();

  function onSubmit(form: AuthForm) {
    setIsLoading(true);
    login(form)
      .then(() => {
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      })
      .catch((error: Error) => {
        message.error(`登录失败：${error.message}`, 3).then(null);
        setIsLoading(false);
      });
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      requiredMark={false}
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
          loading={isLoading}
          block
          style={{ backgroundColor: "#1b4787" }}
        >
          登 录
        </Button>
      </Form.Item>

      <Form.Item>
        <DebugLogin />
      </Form.Item>
    </Form>
  );
};
