import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ latitude, longitude, cityName }) => {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{cityName}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeatherMap;
