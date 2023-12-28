import React from 'react';
import './style.css';
import { Form, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TheaterForm from './TheaterForm';
import AccountForm from './AccountForm';
import { addAccount, addKeySteps, addTheater } from '../../redux/reducer/signupSlide';

export default function SignUpPage() {
  const [theaterForm] = Form.useForm();
  const [accountForm] = Form.useForm();
  const dispatch = useDispatch();
  const currentSteps = useSelector((state) => state.signup.keySteps);
  const theater = useSelector((state) => state.signup.addTheater);
  const imagesForm = useSelector((state) => state.signup.addImages);
  const logoForm = useSelector((state) => state.signup.addLogo);

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
  const onConfirm = (values) => {
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
      address: theater.address + theater.district + theater.city,
      location: {
        type: 'Point',
        coordinates: [105.804817, 21.028511],
      },
      logo: logoForm.path,
      images: imagesForm.map((val) => val.path),
    };
    console.log(data);
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
  console.log(accountForm.getFieldsValue());
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
