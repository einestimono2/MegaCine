import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import apiCaller from '../../../apis/apiCaller';
import { peopleApi } from '../../../apis/all/peopleApi';

export default function CreatePerson(props) {
  const [form] = Form.useForm();
  const [createLoading, setCreateLoading] = useState(false);

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const errorHandler = (error) => {
    setCreateLoading(false);

    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const handleSubmit = async (values) => {
    setCreateLoading(true);
    const body = {
      name: {
        en: values.en,
        vi: values.vi,
      },
    };

    const response = await apiCaller({
      request: props.person?._id ? peopleApi.updatePeople(props.person._id, body) : peopleApi.createPeople(body),
      errorHandler,
    });

    if (response) {
      setCreateLoading(false);
      form.resetFields();
      if (props.person?._id) props.onUpdated(response.data);
      else props.onCreated(response.data);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      en: props.person?.name?.en ?? '',
      vi: props.person?.name?.vi ?? '',
    });
  }, [props.person]);

  return (
    <Modal
      className="!w-[40%]"
      title={props.person?._id ? `People #${props.person._id}` : 'Thêm mới'}
      open={props.open}
      onCancel={props.onCancel}
      footer={null}
      centered
      maskClosable
    >
      <Form
        form={form}
        layout="horizontal"
        scrollToFirstError
        size="large"
        className="mr-7"
        labelCol={{ span: 5 }}
        onFinish={handleSubmit}
      >
        <Form.Item className="my-8 text-center" name="avatar">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            customRequest={dummyRequest}
            // onChange={handleChange}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: 'Nhập họ tên!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Sơ lược (en)" name="en" rules={[{ required: true, message: 'Nhập tên thể loại (English)!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="vi"
          label="Sơ lược (vi)"
          rules={[{ required: true, message: 'Nhập tên thể loại (Vietnames)!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-center mt-12">
          <Button type="primary" htmlType="submit" loading={createLoading} className="w-[50%]">
            {props.person ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="colored" newestOnTop />
    </Modal>
  );
}
