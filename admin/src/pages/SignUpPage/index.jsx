import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { Form, Steps, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TheaterForm from './TheaterForm';
import AccountForm from './AccountForm';
import { addAccount, addKeySteps, addTheater } from '../../redux/reducer/signupSlide';
import { ROUTE } from '../../constants/router';
import { authApi } from '../../apis/all/authApi';
import apiCaller from '../../apis/apiCaller';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [theaterForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const dispatch = useDispatch();
  const currentSteps = useSelector((state) => state.signup.keySteps);
  const theater = useSelector((state) => state.signup.addTheater);
  const imagesForm = useSelector((state) => state.signup.addImages);
  const logoForm = useSelector((state) => state.signup.addLogo);
  const listCity = useSelector((state) => state.signup.addresses);

  const errorHandler = (error) => {
    setLoading(false);
    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const onFinish = (values) => {
    dispatch(
      addTheater({
        addTheater: {
          ...values,
          logo: values.logo?.fileList,
          thumbnails: values.thumbnails?.fileList,
        },
      }),
    );
    dispatch(addKeySteps({ keySteps: 1 }));
  };

  const onConfirm = async (values) => {
    const city = listCity[theater.city - 1];
    const district = city.districts.find((e) => e.code === theater.district);
    const ward = district.wards.find((e) => e.code === theater.ward);

    let _address = theater.detail ? `${theater.detail}, ` : '';
    _address += `${ward.name}, ${district.name}, ${city.name}`;

    const data = {
      code: values.code,
      password: values.password,
      name: theater.name,
      email: theater.email,
      hotline: theater.hotline,
      description:
        theater.description_en || theater.description_vi
          ? {
              en: theater.description_en ?? '',
              vi: theater.description_vi ?? '',
            }
          : undefined,
      address: _address,
      addressCode: {
        city: theater.city,
        district: theater.district,
        ward: theater.ward,
        detail: theater.detail,
      },
      location: {
        type: 'Point',
        coordinates: theater.coordinates,
      },
      logo: logoForm.path,
      images: imagesForm.map((val) => val.path),
    };

    console.log(data);

    setLoading(true);
    const response = await apiCaller({
      request: authApi.register(data),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      navigate(ROUTE.SIGNIN, { replace: true, state: { message: response.message } });
    }
  };

  const steps = [
    {
      title: 'Thông tin rạp',
      content: <TheaterForm form={theaterForm} onFinish={onFinish} />,
    },
    {
      title: 'Tài khoản rạp',
      content: <AccountForm form={accountForm} onFinish={onConfirm} loading={loading ?? false} />,
    },
  ];

  const onChange = async (value) => {
    try {
      await theaterForm.validateFields();
      dispatch(addKeySteps({ keySteps: value }));
      if (value === 1) {
        dispatch(
          addTheater({
            addTheater: {
              ...theaterForm.getFieldsValue(),
              logo: theaterForm.getFieldsValue().logo?.fileList,
              thumbnails: theaterForm.getFieldsValue().thumbnails?.fileList,
            },
          }),
        );
      } else {
        dispatch(
          addAccount({
            addAccount: accountForm.getFieldsValue(),
          }),
        );
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-8">
      <p className="text-3xl font-bold my-7">ĐĂNG KÝ RẠP THÀNH VIÊN</p>
      <div className="h-full w-[60%] mb-8 px-5 pt-5 pb-2 border-solid border-2 border-gray-400 rounded-lg z-10 bg-white">
        <Steps
          className="w-[75%] mx-auto mb-10 mt-3"
          current={currentSteps}
          items={steps.map((item) => ({ key: item.title, title: item.title }))}
          labelPlacement="vertical"
          onChange={onChange}
        />

        <div className="mb-6">{steps[currentSteps].content}</div>

        <div className="mt-12 mb-2 w-1/2 mx-auto justify-center flex flex-row">
          <Divider style={{ padding: '0', margin: '0' }} />
        </div>
        <div className="w-full justify-center flex flex-row">
          <div>Đã sỡ hữu rạp?</div>
          <div
            className="ms-1 italic text-blue-500 hover:cursor-pointer font-bold"
            onClick={() => navigate(ROUTE.SIGNIN, { replace: true })}
          >
            Đăng nhập ngay!
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}
