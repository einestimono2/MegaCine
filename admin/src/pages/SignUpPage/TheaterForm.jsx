import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import apiCaller from '../../apis/apiCaller';
import { uploadApi } from '../../apis/uploadApi';
import 'react-toastify/dist/ReactToastify.css';
import Map from '../../components/Map';
import { addAddresses, addImages, addLogo, addTheater } from '../../redux/reducer/signupSlide';
import './style.css';

export default function TheaterForm(props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [districts, setDistricts] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [wards, setWards] = useState();
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const dispatch = useDispatch();
  const res = async () => {
    const response = await axios.get('https://provinces.open-api.vn/api/?depth=3');
    if (response) {
      dispatch(addAddresses({ addresses: response.data }));
    }
  };
  useEffect(() => {
    res();
  }, []);
  const theaterForm = useSelector((state) => state.signup.addTheater);
  const logo = useSelector((state) => state.signup.addTheater.logo);
  const images = useSelector((state) => state.signup.addImages);
  const thumbnails = useSelector((state) => state.signup.addTheater.thumbnails);
  const listCity = useSelector((state) => state.signup.addresses);
  const handleChange1 = ({ fileList: newFileList }) => {
    if (newFileList.every((file) => checkFile(file))) {
      setFileList1(newFileList);
    }
  };
  useEffect(() => {
    if (logo) {
      setFileList1(logo);
    }
  }, [logo]);
  useEffect(() => {
    if (thumbnails) {
      setFileList2(thumbnails);
    }
  }, [thumbnails]);
  const handleChange2 = ({ fileList: newFileList }) => {
    if (newFileList.every((file) => checkFile(file))) {
      setFileList2(newFileList);
      if (newFileList.length === fileList2.length) {
        handleUploadFiles();
      }
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const onRemove = () => {
    dispatch(addLogo({ addLogo: '' }));
    dispatch(
      addTheater({
        addTheater: {
          ...theaterForm,
          logo: [],
        },
      }),
    );
  };
  const onRemoves = (file) => {
    const indexRemove = fileList2.findIndex((val) => val.uid === file.uid);

    if (thumbnails) {
      const filteredThumbnails = thumbnails.filter((val) => val.uid !== file.uid);
      dispatch(addTheater({ addTheater: { ...theaterForm, thumbnails: filteredThumbnails } }));
    }

    if (indexRemove !== -1) {
      const newImages = images.filter((_, index) => index !== indexRemove);
      dispatch(addImages({ addImages: newImages }));
    }
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
  const handleUploadFiles = async () => {
    const data = new FormData();
    fileList2?.map((file) => data.append(`files`, file.originFileObj));
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const response = await apiCaller({
      request: uploadApi.uploadFiles(data),
      errorHandler,
    });
    if (response) {
      dispatch(addImages({ addImages: response.data }));
    }
  };
  const handleUploadFile = async () => {
    const data = new FormData();
    data.append('file', fileList1[0].originFileObj);
    const errorHandler = (error) => {
      console.log('Fail: ', error);
    };
    const response = await apiCaller({
      request: uploadApi.uploadFile(data),
      errorHandler,
    });
    if (response) {
      dispatch(addLogo({ addLogo: response.data }));
    }
  };
  console.log(useSelector((state) => state.signup));
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
      if (fileList1.length) {
        handleUploadFile();
      }
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
    if (city) {
      setDistricts(listCity.filter((element) => element.code === city)[0]?.districts);
    }
  }, [city]);
  useEffect(() => {
    if (district) {
      setWards(districts.filter((element) => element.code === district)[0]?.wards);
    }
  }, [district]);
  return (
    <div>
      <Form
        onFinish={props.onFinish}
        colon={false}
        className="custom-form"
        layout="horizontal"
        labelAlign="left"
        scrollToFirstError
        size="large"
        form={props.form}
      >
        <div className="grid grid-cols-10">
          <Form.Item
            labelCol={{ span: 10 }}
            className="col-span-3"
            label="Logo"
            name="logo"
            rules={[{ required: true, message: 'Hãy chọn logo!' }]}
          >
            <Upload
              customRequest={dummyRequest}
              listType="picture-card"
              beforeUpload={checkFile}
              fileList={fileList1}
              onPreview={handlePreview}
              onChange={handleChange1}
              onRemove={onRemove}
            >
              {fileList1?.length === 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item labelCol={{ span: 3 }} className="col-span-7 ml-[10px]" label="Ảnh rạp" name="thumbnails">
            <Upload
              customRequest={dummyRequest}
              maxCount={5}
              multiple
              listType="picture-card"
              fileList={fileList2}
              onPreview={handlePreview}
              onChange={handleChange2}
              onRemove={onRemoves}
            >
              {fileList2?.length === 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
        <Form.Item
          labelCol={{ span: 3 }}
          label="Tên rạp"
          name="name"
          rules={[{ required: true, message: 'Please input theater name!' }]}
        >
          <Input placeholder="Tên rạp" />
        </Form.Item>
        <Form.Item labelCol={{ span: 3 }} label="Mô tả (vi)" name="description_vi">
          <Input.TextArea placeholder="Mô tả bằng tiếng việt" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item labelCol={{ span: 3 }} label="Mô tả (en)" name="description_en">
          <Input.TextArea placeholder="Mô tả bằng tiếng anh" style={{ width: '100%' }} />
        </Form.Item>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            labelCol={{ span: 6 }}
            className="w-full"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Hãy điền email!',
              },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="hotline"
            rules={[
              { pattern: /^0[0-9]{9,10}$/, message: 'Số điện thoại không hợp lệ!' },
              {
                required: true,
                message: 'Hãy chọn số điện thoại!',
              },
            ]}
            labelCol={{ span: 6 }}
            className="w-full"
            label="Số điện thoại"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Tỉnh/TP"
                name="city"
                rules={[{ required: true, message: 'Hãy chọn tỉnh/thành phố!' }]}
              >
                <Select
                  placeholder="Tình/Thành phố"
                  options={listCity?.map((_city) => ({
                    value: _city.code,
                    label: _city.name,
                  }))}
                  // onChange={(value) => {
                  //   setCity(value);
                  // }}
                  // value={city}
                />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Quận/Huyện"
                name="district"
                rules={[{ required: true, message: 'Hãy chọn quận/huyện!' }]}
              >
                <Select
                  placeholder="Quận/Huyện"
                  options={districts?.map((_city) => ({
                    value: _city.code,
                    label: _city.name,
                  }))}
                  // onChange={(value) => {
                  //   setDistrict(value);
                  // }}
                  // value={district}
                />
              </Form.Item>
              <Form.Item
                label="Xã/Phường"
                labelCol={{ span: 6 }}
                name="ward"
                rules={[{ required: true, message: 'Hãy chọn xã/phường!' }]}
              >
                <Select
                  placeholder="Xã/Phường"
                  options={wards?.map((val) => ({
                    value: val.code,
                    label: val.name,
                  }))}
                  // onChange={(value) => {
                  //   setWard(value);
                  // }}
                  // value={ward}
                />
              </Form.Item>
              <Form.Item labelCol={{ span: 6 }} label="Số nhà" name="address">
                <Input placeholder="Số nhà" onChange={(e) => setAddress(e.target.value)} value={address} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 6 }}
                name="location"
                label="Tọa độ"
                initialValue={[105.84713, 21.030653]}
                rules={[{ required: true, message: 'Hãy chọn tọa độ!' }]}
              >
                <Input disabled />
              </Form.Item>
            </div>
          </div>
          <div className="w-[96%] ml-[15px] h-[92.5%] relative">
            <Map />
          </div>
        </div>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit" className="w-3/12">
            Next
          </Button>
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
      <ToastContainer theme="colored" newestOnTop />{' '}
    </div>
  );
}
