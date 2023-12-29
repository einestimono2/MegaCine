import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AccountForm(props) {
  const accountForm = useSelector((state) => state.signup.addAccount);
  useEffect(() => {
    if (accountForm.code && accountForm.password) {
      props.form.setFieldsValue(accountForm);
    }
  }, [accountForm]);
  return (
    <div className="w-3/5 m-auto">
      <Form
        labelCol={{ span: 7 }}
        form={props.form}
        labelAlign="left"
        colon={false}
        className="custom-form"
        onFinish={props.onFinish}
      >
        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Hãy nhập code!',
            },
          ]}
        >
          <Input placeholder="Code" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Hãy điền mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Form.Item className="text-center">
          <Button className="w-1/3" size="large" type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
