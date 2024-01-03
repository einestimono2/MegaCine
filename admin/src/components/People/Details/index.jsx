import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Skeleton, Avatar, Image } from 'antd';

import './style.css';
import apiCaller from '../../../apis/apiCaller';
import Error from '../../Error';
import { getVietNamFormatDate } from '../../../utils/formatDate';
import { peopleApi } from '../../../apis/all/peopleApi';

export default function PersonDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isError, setIsError] = useState();

  const errorHandler = (error) => {
    setIsLoading(false);
    setData({});

    setIsError(error.message);
  };

  const getPersonDetails = async (id) => {
    setIsLoading(true);
    if (isError) setIsError(undefined);

    const response = await apiCaller({
      request: peopleApi.getDetails(id),
      errorHandler,
    });

    if (response) {
      setIsLoading(false);
      setData(response.data);
    }
  };

  useEffect(() => {
    if (props.id && props.open) {
      getPersonDetails(props.id);
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
        <Error message={isError} onClick={() => getPersonDetails(props.id)} />
      ) : (
        <div className="mt-8">
          <Descriptions className="my-6" title="Thông tin đạo diễn/diễn viên" bordered column={1}>
            <Descriptions.Item label="Hình ảnh">
              <Avatar size="large" src={data.avatar} style={{ width: '10vh', height: '10vh' }} />
            </Descriptions.Item>
            <Descriptions.Item label="Họ tên">{data.fullName}</Descriptions.Item>
            <Descriptions.Item label="Tiểu sử (English)">{data.summary?.en}</Descriptions.Item>
            <Descriptions.Item label="Tiểu sử (Vietnamese)">{data.summary?.vi}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{getVietNamFormatDate(data.createdAt)}</Descriptions.Item>
          </Descriptions>
          {data.movies?.length ? (
            <Descriptions className="mb-3 custom-table" title="Những bộ phim tham gia" bordered column={1}>
              <Descriptions.Item>
                <div className="overflow-auto max-h-[22vh] my-2 mx-3">
                  {data.movies?.map((movie) => (
                    <div key={movie._id} className="mb-3 flex flex-row">
                      <div className="relative">
                        <Image src={movie.poster} preview={false} className="rounded-sm" width="10vh" height="10vh" />
                        <div className="absolute top-1 right-1 text-white text-xs px-[2px] bg-red-500">
                          {movie.ageType}
                        </div>
                      </div>
                      <div className="ms-3">
                        <div className="text-xl font-bold">{movie.title}</div>
                        <div className="text-gray-500 text-xs">{movie.originalTitle}</div>
                        <div className="mt-[5px] text-sm">Thời gian: {movie.duration ?? ''} phút</div>
                        <div className="text-sm">
                          Khởi chiếu:{' '}
                          {movie.releaseDate ? getVietNamFormatDate(movie.releaseDate, false) : 'Chưa xác định'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Descriptions.Item>
            </Descriptions>
          ) : // <div className="max-h-[30vh]">
          //   <div className="ant-descriptions-header">Những bộ phim tham gia</div>
          //   <div className="overflow-auto h-[20vh]">
          //     {data.movies?.map((movie) => (
          //       <div key={movie._id} className="mb-5">
          //         <div>{movie.title}</div>
          //         <div>{movie.originalTitle}</div>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          null}
        </div>
      )}
    </Modal>
  );
}
