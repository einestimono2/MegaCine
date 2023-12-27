import React from 'react';
import './style.css';
import { Form, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TheaterForm from './TheaterForm';
import AccountForm from './AccountForm';
import { addKeySteps } from '../../redux/reducer/signupSlide';

export default function SignUpPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentSteps = useSelector((state) => state.signup.keySteps);
  const steps = [
    {
      title: 'Thông tin rạp',
      content: <TheaterForm form={form} />,
    },
    {
      title: 'Tài khoản rạp',
      content: <AccountForm />,
    },
  ];
  const onChange = async (value) => {
    try {
      // Wait for the validation to complete
      await form.validateFields();

      // If validation is successful, dispatch the action
      dispatch(addKeySteps({ keySteps: value }));
    } catch (error) {
      // Validation failed, you can handle errors if needed
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
