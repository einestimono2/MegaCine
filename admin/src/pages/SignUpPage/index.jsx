import React from 'react';
import './style.css';
import { Form, Steps, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TheaterForm from './TheaterForm';
import AccountForm from './AccountForm';
import { addAccount, addKeySteps, addTheater } from '../../redux/reducer/signupSlide';
import { authApi } from '../../apis/authApi';
import apiCaller from '../../apis/apiCaller';

export default function SignUpPage() {
  const [theaterForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const dispatch = useDispatch();
  const currentSteps = useSelector((state) => state.signup.keySteps);
  const theater = useSelector((state) => state.signup.addTheater);
  const imagesForm = useSelector((state) => state.signup.addImages);
  const logoForm = useSelector((state) => state.signup.addLogo);
  const listCity = useSelector((state) => state.signup.addresses);
  const city = useSelector((state) => state.signup.city);
  const district = useSelector((state) => state.signup.district);
  const ward = useSelector((state) => state.signup.ward);
  const districts = useSelector((state) => state.signup.districts);
  const wards = useSelector((state) => state.signup.wards);
  const address = useSelector((state) => state.signup.address);
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
    const data = {
      code: values.code,
      password: values.password,
      name: theater.name,
      email: theater.email,
      hotline: theater.hotline,
      description: {
        en: theater.description_en,
        vi: theater.description_vi,
      },
      address: [
        address,
        wards?.filter((element) => element.code === ward)[0]?.name,
        districts?.filter((element) => element.code === district)[0]?.name,
        listCity?.filter((element) => element.code === city)[0]?.name,
      ].join(', '),
      addressCode: [city, district, ward, address],
      location: {
        type: 'Point',
        coordinates: [105.804817, 21.028511],
      },
      logo: logoForm.path,
      images: imagesForm.map((val) => val.path),
    };
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const response = await apiCaller({
      request: authApi.register(data),
      errorHandler,
    });
    console.log(response);
    if (response) {
      console.log(response);
      message.success(response.message);
    }
  };
  const steps = [
    {
      title: 'Thông tin rạp',
      content: <TheaterForm form={theaterForm} onFinish={onFinish} />,
    },
    {
      title: 'Tài khoản rạp',
      content: <AccountForm form={accountForm} onFinish={onConfirm} />,
    },
  ];
  const onChange = async (value) => {
    try {
      await theaterForm.validateFields();
      dispatch(addKeySteps({ keySteps: value }));
      if (value === 1) {
        console.log(theaterForm.getFieldsValue());
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
      <div className="h-full w-[62.7%]">
        <Steps
          className="w-[60%] mx-auto mb-10"
          current={currentSteps}
          items={steps.map((item) => ({ key: item.title, title: item.title }))}
          labelPlacement="vertical"
          onChange={onChange}
        />

        <div className="mb-8">{steps[currentSteps].content}</div>
      </div>
    </div>
  );
}
