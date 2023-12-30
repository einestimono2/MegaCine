import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Skeleton } from 'antd';

import apiCaller from '../../../apis/apiCaller';
import Error from '../../Error';
import { getVietNamFormatDate } from '../../../utils/formatDate';
import { genreApi } from '../../../apis/all/genreApi';

export default function GenreDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isError, setIsError] = useState();

  const errorHandler = (error) => {
    setIsLoading(false);
    setData({});

    setIsError(error.message);
  };

  const getGenreDetails = async (id) => {
    setIsLoading(true);
    if (isError) setIsError(undefined);

    const response = await apiCaller({
      request: genreApi.getDetails(id),
      errorHandler,
    });

    if (response) {
      setIsLoading(false);
      setData(response.data);
    }
  };

  useEffect(() => {
    if (props.id && props.open) {
      getGenreDetails(props.id);
    }
  }, [props.id]);

  return (
    <Modal
      className="!w-[40%]"
      title={isLoading ? <Skeleton.Input active style={{ width: '22vw' }} /> : `Genre #${props.id}`}
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
          <Skeleton.Input active className="mb-6" style={{ height: '25vh', width: '100%' }} />
        </div>
      ) : isError ? (
        <Error message={isError} onClick={() => getGenreDetails(props.id)} />
      ) : (
        <div className="mt-8">
          <Descriptions className="my-6" title="Thông tin thể loại" bordered column={1}>
            <Descriptions.Item label="Mã thể loại">{data._id}</Descriptions.Item>
            <Descriptions.Item label="Tên thể loại (English)">{data.name?.en}</Descriptions.Item>
            <Descriptions.Item label="Tên thể loại (Vietnamese)">{data.name?.vi}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{getVietNamFormatDate(data.createdAt)}</Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Modal>
  );
}
