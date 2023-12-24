import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../apis/authApi';
import apiCaller from '../../apis/apiCaller';
import { ROUTE } from '../../constants/router';

export default function SignInPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, []);

  const handleSignUp = () => {
    navigate('/signup');
  };
  const handleSignIn = async (value) => {
    const data = {
      code: value.code,
      password: value.password,
    };
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const response = await apiCaller({
      request: authApi.login(data),
      errorHandler,
    });
    console.log(response);
    if (response) {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate(ROUTE.ADMIN.replace(':id', response.data.user.role.toLowerCase()), { replace: true });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-1/4" onFinish={handleSignIn}>
        <Form.Item
          name="code"
          initialValue="admin"
          rules={[{ required: true, message: 'Please input your code!' }]}
          label="Code"
        >
          <Input placeholder="Code" />
        </Form.Item>
        <Form.Item
          name="password"
          initialValue="123456"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              type: 'string',
              min: 6,
              message: 'Password must be at least 6 characters',
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
