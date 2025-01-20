
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
}

const LocationEvents: React.FC = () => {
  const map = useMapEvents({
    click: () => {
      map.locate(); // Activează localizarea utilizatorului
    },
    locationfound: (location) => {
      console.log('Location found:', location);
      map.flyTo(location.latlng, map.getZoom()); // Muta harta către locația găsită
    },
  });

  return null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ latitude, longitude, cityName }) => {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker pentru locația inițială */}
      <Marker position={position}>
        <Popup>
          {cityName}
        </Popup>
      </Marker>

      {/* Componente care folosesc hook-uri pentru interacțiune */}
      <LocationEvents />
    </MapContainer>
  );
};

export default WeatherMap;
