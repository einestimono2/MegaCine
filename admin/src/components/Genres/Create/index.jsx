import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import apiCaller from '../../../apis/apiCaller';
import { genreApi } from '../../../apis/all/genreApi';

export default function CreateGenre(props) {
  const [form] = Form.useForm();
  const [createLoading, setCreateLoading] = useState(false);

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
      request: props.genre?._id ? genreApi.updateGenre(props.genre._id, body) : genreApi.createGenre(body),
      errorHandler,
    });

    if (response) {
      setCreateLoading(false);
      form.resetFields();
      if (props.genre?._id) props.onUpdated(response.data);
      else props.onCreated(response.data);
    }
  };

  useEffect(() => {
    if (props.open && props.genre) {
      form.setFieldsValue({
        en: props.genre?.name?.en ?? '',
        vi: props.genre?.name?.vi ?? '',
      });
    } else if (props.open) {
      form.setFieldsValue({
        en: '',
        vi: '',
      });
    }
  }, [props.open]);

  return (
    <Modal
      className="!w-[40%]"
      title={props.genre?._id ? `Thể loại #${props.genre._id}` : 'Thêm thể loại'}
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
        labelCol={{ span: 6 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          className="mt-12"
          label="Tên (English)"
          name="en"
          rules={[{ required: true, message: 'Nhập tên thể loại (English)!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="vi"
          label="Tên (Vietnamese)"
          rules={[{ required: true, message: 'Nhập tên thể loại (Vietnames)!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-center mt-12">
          <Button type="primary" htmlType="submit" loading={createLoading} className="w-[50%]">
            {props.genre?._id ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="colored" newestOnTop />
    </Modal>
  );
}
