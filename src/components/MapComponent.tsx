import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  position: any;
  path: any[];
}

const RecenterMap = ({ position }: { position: any }) => {
  const map = useMap();
  if (position) {
    map.flyTo([position.latitude, position.longitude], 18);
  }
  return null;
};

const MapComponent: React.FC<MapProps> = ({ position, path }) => {
  if (!position) return <p>Obteniendo ubicación...</p>;

  const positions = path.map(p => [p.lat, p.lng] as [number, number]);

  return (
    <MapContainer 
      center={[position.latitude, position.longitude]} 
      zoom={18} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[position.latitude, position.longitude]} />
      {positions.length > 0 && <Polyline positions={positions} color="blue" />}
      <RecenterMap position={position} />
    </MapContainer>
  );
};

export default MapComponent;