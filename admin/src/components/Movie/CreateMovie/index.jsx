import { Checkbox, Dropdown, Form, Input, Modal, Space, Upload } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadApi } from '../../../apis/uploadApi';
import apiCaller from '../../../apis/apiCaller';
import 'react-toastify/dist/ReactToastify.css';
import { mapAge } from '../../../constants/mapIcons';
import { genresApi } from '../../../apis/admin/genresApi';

export default function CreateMovie() {
  const [fileList, setFileList] = useState([]);
  const [ageType, setAgeType] = useState('P');
  const [listGenres, setListGenres] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const plainOptions = [
    {
      value: '2D',
      label: '2D',
    },
    {
      value: '3D',
      label: '3D',
    },
  ];
  const options = [
    {
      value: 'Subtitles',
      label: 'Phụ đề',
    },
    {
      value: 'Dubbing',
      label: 'Thuyết minh',
    },
  ];
  const genres = [
    {
      value: 'Subtitles',
      label: 'Phụ đề',
    },
    {
      value: 'Dubbing',
      label: 'Thuyết minh',
    },
  ];
  const item = [
    {
      key: 'P',
      label: 'Mọi lứa tuổi',
    },
    {
      key: 'T18',
      label: 'Trên 18 tuổi',
    },
    {
      key: 'T16',
      label: 'Trên 16 tuổi',
    },
    {
      key: 'T12',
      label: 'Trên 12 tuổi',
    },
    {
      key: 'T6',
      label: 'Trên 6 tuổi',
    },
  ];
  const handleGetListGenres = async () => {
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const response = await apiCaller({
      request: genresApi.listGenres(),
      errorHandler,
    });
    if (response) {
      console.log(response);
      setListGenres(response.data);
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const handleClick = (e) => {
    setAgeType(e.key);
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleUploadFile = async () => {
    const data = new FormData();
    data.append('file', fileList[0].originFileObj);
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const response = await apiCaller({
      request: uploadApi.uploadFile(data),
      errorHandler,
    });
    if (response) {
      console.log(response);
    }
  };
  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.every((file) => checkFile(file))) {
      setFileList(newFileList);
    }
  };
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
      // if (fileList.length) {
      //   handleUploadFile();
      // }
    }, 0);
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
    handleGetListGenres();
  }, []);
  return (
    <div>
      <div className="text-3xl text-center font-bold uppercase mb-6">TẠO PHIM</div>
      <Form labelCol={{ span: 3 }} labelAlign="left">
        <div className="grid grid-cols-2 gap-5">
          <Form.Item labelCol={{ span: 6 }} label="Tên phim" name="title">
            <Input />
          </Form.Item>
          <Form.Item labelCol={{ span: 6 }} label="Tên phim (gốc)" name="originalTitle">
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Trailer (link youtube)" name="trailer">
          <Input />
        </Form.Item>
        <Form.Item label="Ảnh bìa" name="poster">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            beforeUpload={checkFile}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList?.length === 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item labelCol={{ span: 6 }} label="Tổng quan (en)" name="overview(en)">
            <Input />
          </Form.Item>
          <Form.Item labelCol={{ span: 6 }} label="Tổng quan (vi)" name="overview(vi)">
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Định dạng" name="formats">
          <Checkbox.Group options={plainOptions} />
        </Form.Item>
        <Form.Item label="Ngôn ngữ" name="languages">
          <Checkbox.Group options={options} />
        </Form.Item>
        <Form.Item label="Lứa tuổi" name="ageType">
          <Dropdown menu={{ items: item, onClick: handleClick }} trigger={['click']}>
            <Space>
              {mapAge[ageType]}
              <DownOutlined />
            </Space>
          </Dropdown>
        </Form.Item>
        <Form.Item label="Thể loại" name="genres">
          <Checkbox.Group options={genres} />
        </Form.Item>
      </Form>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}
