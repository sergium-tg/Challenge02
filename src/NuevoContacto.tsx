import React, { useState } from 'react';
import type { Contacto } from './Contactos';

interface NuevoContactoProps {
  onAdd: (contacto: Contacto) => void;
}

const NuevoContacto: React.FC<NuevoContactoProps> = ({ onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono) return;

    const nuevoContacto: Contacto = {
      id: Date.now(),
      nombre,
      telefono
    };

    onAdd(nuevoContacto);
    setNombre('');
    setTelefono('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Teléfono" 
        value={telefono} 
        onChange={(e) => setTelefono(e.target.value)} 
      />
      <button type="submit">Guardar nuevo</button>
    </form>
  );
};

export default NuevoContacto;