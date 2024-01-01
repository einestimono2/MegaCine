import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import apiCaller from '../../../apis/apiCaller';
import { uploadApi } from '../../../apis/all/uploadApi';
import { peopleApi } from '../../../apis/all/peopleApi';

export default function CreatePerson(props) {
  const [avatar, setAvatar] = useState();
  const [form] = Form.useForm();
  const [createLoading, setCreateLoading] = useState(false);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const errorHandler = (error) => {
    setCreateLoading(false);

    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const handleSubmit = async (values) => {
    setCreateLoading(true);
    const body = {
      fullName: values.fullName,
      summary: {
        en: values.en,
        vi: values.vi,
      },
      avatar: avatar.path,
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

  const handleUploadFile = async (info) => {
    if (info?.file?.status === 'done') {
      const data = new FormData();
      data.append('file', info.file.originFileObj);

      const response = await apiCaller({
        request: uploadApi.uploadFile(data),
        errorHandler,
      });

      if (response) {
        getBase64(info.file.originFileObj, (url) => {
          setAvatar({ url, path: response.data.path });
        });
      }
    }
  };

  const checkFile = (file) => {
    if (file && file.name) {
      const isImage = /\.(jpg|jpeg|png)$/.test(file.name.toLowerCase());
      if (!isImage) {
        toast.error('Chỉ được tải lên các tệp tin có đuôi là .jpg, .jpeg hoặc .png!');
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.error('Kích thước tệp tin phải nhỏ hơn 2MB!');
      }

      return isImage && isLt2M;
    }

    toast.error('Tệp tin không hợp lệ!');
    return false;
  };

  useEffect(() => {
    if (props.person && props.open) {
      form.setFieldsValue({
        fullName: props.person?.fullName,
        en: props.person?.summary?.en ?? '',
        vi: props.person?.summary?.vi ?? '',
      });
      setAvatar({ url: props.person?.avatar });
    } else if (props.open) {
      setAvatar();
      form.setFieldsValue({
        fullName: '',
        en: '',
        vi: '',
      });
    }
  }, [props.open]);

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
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            showUploadList={false}
            maxCount={1}
            fileList={undefined}
            customRequest={dummyRequest}
            beforeUpload={checkFile}
            onChange={handleUploadFile}
          >
            {avatar?.url ? (
              <Avatar src={avatar.url} alt="" size="large" style={{ width: '100%', height: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: 'Nhập họ tên!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Sơ lược (en)" name="en">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="vi" label="Sơ lược (vi)">
          <Input.TextArea />
        </Form.Item>
        <Form.Item className="text-center mt-12">
          <Button type="primary" htmlType="submit" loading={createLoading} className="w-[50%]">
            {props.person?._id ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer theme="colored" newestOnTop />
    </Modal>
  );
}
