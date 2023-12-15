import React from "react";
import "./style.css";
import { Button, Form, Input } from "antd";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-1/4 border rounded-lg shadow-lg">
        <p className="text-3xl font-bold mt-0">Sign Up</p>
        <Form layout="vertical">
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="text-center mb-0">
            <Button>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
