import L from 'leaflet';

export const iconMark = L.icon({
  iconSize: [25, 41],
  iconAnchor: [13.5, 35],
  popupAnchor: [0, -35],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const theaterMarker = L.icon({
  iconSize: [25, 41],
  popupAnchor: [0, -35],
  iconUrl: 'https://cdn3.iconfinder.com/data/icons/movies-3/32/theatre-cinema-movie-location-map-marker-pin-512.png',
});

// https://cdn3.iconfinder.com/data/icons/pin-3/100/pin_6-512.png
// https://cdn3.iconfinder.com/data/icons/movies-3/32/theatre-cinema-movie-location-map-marker-pin-512.png
