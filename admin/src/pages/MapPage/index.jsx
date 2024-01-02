import React, { useEffect, useState } from 'react';
import { Modal, Skeleton } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Map from '../../components/Map';
import apiCaller from '../../apis/apiCaller';
import { managerApi } from '../../apis/admin/managerApi';

export default function MapPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const errorHandler = (error) => {
    setLoading(false);
    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const getManagerList = async () => {
    setLoading(true);

    const response = await apiCaller({
      request: managerApi.listManager(),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      setData(response.data);
    }
  };

  useEffect(() => {
    getManagerList();
  }, []);

  return (
    <div className="relative w-full h-full">
      {loading ? (
        <Skeleton.Input active style={{ height: '100%', width: '100%', position: 'absolute', top: 0 }} />
      ) : (
        <Map
          theaters={data}
          zoom={6.475}
          scrollWheelZoom
          centerLat={16.542763095469983}
          centerLng={105.66255267612127}
          onChangeCoordinates={() => {}}
        />
      )}
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}
/**
<Popup>
              <div className="popupContainer">
                <a
                  href={`/room/${room._id}`}
                  className="popupName"
                  style={{
                    font: "bold 1vmax Roboto",
                  }}
                >
                  {room.name}
                </a>
                <p>Địa chỉ: {room.address}</p>
                <p>Giá phòng: {room.price.toLocaleString("en-US")} VNĐ/tháng</p>
                <div style={{ display: "flex", overflow: "auto" }}>
                  {room.images &&
                    room.images.map((e) => (
                      <img
                        key={e.public_id}
                        src={e.url}
                        alt="img"
                        style={{
                          width: "3vmax",
                          height: "3vmax",
                          marginRight: "0.24vmax",
                          objectFit: "cover",
                        }}
                      ></img>
                    ))}
                </div>
              </div>
            </Popup>
 */
