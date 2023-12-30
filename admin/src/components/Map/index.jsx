import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './style.css';
import { iconMark } from '../../constants/mapIcons';

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
      center={{ lat: props.lat ?? 21.030653, lng: props.lng ?? 105.84713 }}
      zoom={props.zoom ?? 15}
      scrollWheelZoom={false}
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
    </MapContainer>
  );
}
