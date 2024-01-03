import { Button, Form, Input, Image, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authApi } from '../../apis/all/authApi';
import apiCaller from '../../apis/apiCaller';
import { ROUTE } from '../../constants/router';
import { MEGACINE_LOGO } from '../../constants/images';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    if (access_token) {
      navigate(-1);
    }

    if (location?.state?.message) {
      toast.success(location?.state?.message, { autoClose: 3000, theme: 'colored' });
      window.history.replaceState({}, document.title); // Xóa message --> reset thì k hiển thị lại
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
      setLoading(false);
      toast.error(error.message, { autoClose: 3000, theme: 'colored' });
    };

    setLoading(true);
    const response = await apiCaller({
      request: authApi.login(data),
      errorHandler,
    });

    if (response) {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false);
      navigate(ROUTE.ADMIN.replace(':id', response.data.user.role.toLowerCase()), { replace: true });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#fffefe]">
      <div className="text-center flex-col px-12 w-1/4 border-solid border-2 border-gray-400 rounded-lg z-10 bg-white ">
        <Image className="mt-6" width={100} src={MEGACINE_LOGO} preview={false} />

        <div className="mb-12 mt-3">
          <div className="font-bold text-3xl">WELCOME BACK!</div>
          <div className="text-base text-gray-600">- Đăng nhập & Quản lý rạp -</div>
        </div>

        <Form layout="horizontal" size="large" labelCol={{ span: 5 }} onFinish={handleSignIn} labelAlign="left">
          <Form.Item
            name="code"
            initialValue="admin"
            rules={[{ required: true, message: 'Hãy nhập mã rạp!' }]}
            label="Mã rạp"
          >
            <Input placeholder="Mã của rạp" />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="123456"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Hãy nhập mật khẩu!' },
              {
                type: 'string',
                min: 6,
                message: 'Password must be at least 6 characters',
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu rạp" />
          </Form.Item>
          <Form.Item className="text-center mt-12">
            <Button type="primary" htmlType="submit" className="w-1/2" loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-12 mb-2 w-3/4 mx-auto justify-center flex flex-row">
          <Divider style={{ padding: '0', margin: '0' }} />
        </div>
        <div className="mb-2 w-full justify-center flex flex-row">
          <div>Chưa sở hữu rạp?</div>
          <div className="ms-1 italic text-blue-500 hover:cursor-pointer font-bold" onClick={handleSignUp}>
            Đăng ký ngay!
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}
