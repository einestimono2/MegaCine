import { Form, Input } from 'antd';
import React from 'react';

export default function AccountForm(props) {
  return (
    <Form onFinish={props.onFinish}>
      <Form.Item
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
