import React from 'react';

interface EliminarProps {
  id: number;
  onEliminar: (id: number) => void;
}

const EliminarContacto: React.FC<EliminarProps> = ({ id, onEliminar }) => {
  return (
    <button 
      onClick={() => onEliminar(id)}
      style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
    >
      Eliminar
    </button>
  );
};

export default EliminarContacto;