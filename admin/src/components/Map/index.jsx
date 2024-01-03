import React from 'react';
import { Descriptions, Image } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './style.css';
import { iconMark, theaterMarker } from '../../constants/mapIcons';
import { getVietNamFormatDate } from '../../utils/formatDate';
import { NO_IMAGE } from '../../constants/images';

const MapEvents = (props) => {
  useMapEvents({
    click(e) {
      // setState your coords here
      // coords exist in "e.latlng.lat" and "e.latlng.lng"
      console.log(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`);
      props.onChangeCoordinates(e.latlng.lat, e.latlng.lng);
    },
  });

  return false;
};

export default function Map(props) {
  const mapStyle = {
    width: props.width ?? '100%',
    height: props.height ?? '100%',
    position: props.position ?? 'absolute',
    top: props.top ?? '0',
    bottom: props.bottom ?? '0',
    left: props.left ?? '0',
    right: props.right ?? '0',
  };

  return (
    <MapContainer
      center={{ lat: props.centerLat ?? props.lat ?? 21.030653, lng: props.centerLng ?? props.lng ?? 105.84713 }}
      zoom={props.zoom ?? 15}
      scrollWheelZoom={props.scrollWheelZoom ?? false}
      style={mapStyle}
      className="rounded-[4px]"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://api.mapbox.com/styles/v1/einestimono2/cl49q1ljv000m14mivjy4e517/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZWluZXN0aW1vbm8yIiwiYSI6ImNsM21rcWFycTA1cXkzamwybDl6emFoZ2YifQ.Bjm6A8tfXJU1mC9XFbXLTA"
      />

      {props.lat && props.lng && <Marker position={[props.lat, props.lng]} icon={iconMark} />}

      {props.onChangeCoordinates && <MapEvents onChangeCoordinates={props.onChangeCoordinates} />}

      {props.theaters?.length &&
        props.theaters.map((theater) => (
          <Marker
            position={[
              theater.theater?.location?.coordinates?.at(1) ?? 16.123349425713897,
              theater.theater?.location?.coordinates?.at(0) ?? 113.58819140039006,
            ]}
            icon={theaterMarker}
            key={theater._id}
          >
            <Popup>
              <div className="w-[50vw]">
                <Descriptions title="Quản lý" bordered column={2}>
                  <Descriptions.Item label="Code">{theater.code}</Descriptions.Item>
                  <Descriptions.Item label="Ngày tham gia">{getVietNamFormatDate(theater.createdAt)}</Descriptions.Item>
                </Descriptions>

                <Descriptions className="mt-6" title={`Thông tin rạp #${theater.theater?._id}`} bordered column={2}>
                  <Descriptions.Item label="Tên rạp" span={2}>
                    {theater.theater?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">{theater.theater?.email}</Descriptions.Item>
                  <Descriptions.Item label="Hotline">{theater.theater?.hotline}</Descriptions.Item>
                  <Descriptions.Item label="Mô tả">
                    {(theater.theater?.description?.vi || theater.theater?.description?.en) && (
                      <ul className="!pl-2">
                        <li>{theater.theater?.description?.en}</li>
                        <li>{theater.theater?.description?.vi}</li>
                      </ul>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ">{theater.theater?.address}</Descriptions.Item>
                  <Descriptions.Item label="Logo">
                    <div className="text-center">
                      <Image
                        className="rounded-[3.5px]"
                        height={100}
                        width={100}
                        preview={Boolean(theater.theater?.logo)}
                        src={theater.theater?.logo ?? NO_IMAGE}
                      />
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Images">
                    <div className="grid grid-flow-col auto-cols-fr overflow-x-auto gap-2 ">
                      {theater.theater?.images?.length ? (
                        theater.theater?.images.map((e) => (
                          <Image className="rounded-[3.5px] max-h-[100px] object-contain" key={e} src={e} placeholder />
                        ))
                      ) : (
                        <Image className="rounded-[3.5px]" height={100} width={100} src={NO_IMAGE} preview={false} />
                      )}
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
