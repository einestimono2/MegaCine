import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Image, Skeleton } from 'antd';

import Map from '../../Map';
import apiCaller from '../../../apis/apiCaller';
import { managerApi } from '../../../apis/admin/managerApi';
import { NO_IMAGE } from '../../../constants/images';
import Error from '../../Error';
import { getVietNamFormatDate } from '../../../utils/formatDate';

export default function ManagerDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isError, setIsError] = useState();

  const errorHandler = (error) => {
    setIsLoading(false);
    setData({});

    setIsError(error.message);
  };

  const getManagerDetails = async (id) => {
    setIsLoading(true);
    if (isError) setIsError(undefined);

    const response = await apiCaller({
      request: managerApi.getDetails(id),
      errorHandler,
    });

    if (response) {
      setIsLoading(false);
      setData(response.data);
    }
  };

  useEffect(() => {
    if (props.id) {
      getManagerDetails(props.id);
    }
  }, [props.id]);

  return (
    <Modal
      className="!w-[65%]"
      title={isLoading ? <Skeleton.Input active style={{ width: '22vw' }} /> : `Thông tin rạp #${props.id}`}
      closable={!isLoading}
      open={props.open}
      onCancel={props.onCancel}
      footer={null}
      centered
      maskClosable
    >
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton.Input active className="mt-6" />
          <Skeleton.Input active style={{ height: '5vh', width: '100%' }} />
          <Skeleton.Input active className="mt-6" />
          <Skeleton.Input active style={{ height: '55vh', width: '100%' }} />
        </div>
      ) : isError ? (
        <Error message={isError} onClick={() => getManagerDetails(props.id)} />
      ) : (
        <div className="mt-8">
          <Descriptions title="Tài khoản quản lý" bordered>
            <Descriptions.Item label="Code">{data.code}</Descriptions.Item>
            <Descriptions.Item label="Ngày tham gia">{getVietNamFormatDate(data.createdAt)}</Descriptions.Item>
          </Descriptions>

          <Descriptions className="mt-6" title="Thông tin rạp" bordered>
            <Descriptions.Item label="Tên rạp">{data.theater?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{data.theater?.email}</Descriptions.Item>
            <Descriptions.Item label="Hotline">{data.theater?.hotline}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {data.theater?.description && (
                <ul className="!pl-2">
                  <li>{data.theater?.description?.en}</li>
                  <li>{data.theater?.description?.vi}</li>
                </ul>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              <div className="flex flex-col">
                <div>{data.theater?.address}</div>
                {data.theater?.location?.coordinates && (
                  <div className="h-56 w-[100%] relative">
                    <Map lat={data.theater?.location?.coordinates[1]} lng={data.theater?.location?.coordinates[0]} />
                  </div>
                )}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Logo">
              <Image
                className="rounded-[3.5px]"
                height={100}
                width={150}
                preview={Boolean(data.theater?.logo)}
                src={data.theater?.logo ?? NO_IMAGE}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Images">
              <div className="grid grid-cols-3 gap-2">
                {data.theater?.images?.length ? (
                  data.theater?.images.map((e) => (
                    <Image className="rounded-[3.5px]" height={100} key={e} src={e} placeholder />
                  ))
                ) : (
                  <Image className="rounded-[3.5px]" height={100} width={150} src={NO_IMAGE} preview={false} />
                )}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Modal>
  );
}
