import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../apis/authApi";
import apiCaller from "../../apis/apiCaller";

export default function SignInPage() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSignIn = async (value) => {
    const data = {
      code: value.username,
      password: value.password,
    };
    const errorHandler = (error) => {
      console.log("Fail: ", error);
    };
    const response = await apiCaller({
      request: authApi.login(data),
      errorHandler,
    });
    if (response) {
      console.log("Success: ", response);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-1/4" onFinish={handleSignIn}>
        <Form.Item
          name={"username"}
          rules={[
            { required: true, message: "Please input your username!" },
          ]}
          label="Username"
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              type: "string",
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleSignUp}>Sign Up</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
