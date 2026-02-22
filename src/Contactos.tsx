import React, { useState } from 'react';
import NuevoContacto from './NuevoContacto';
import EliminarContacto from './EliminarContacto';

export interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

interface Props {
  initialContactos?: Contacto[]; 
}

const Contactos: React.FC<Props> = ({ initialContactos = [] }) => {
  const [contactos, setContactos] = useState<Contacto[]>(initialContactos);

  const agregarContacto = (nuevo: Contacto) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (id: number) => {
    setContactos((prev) => prev.filter(c => c.id !== id));
  };

  return (
    <div className="losContactos">

      <img src="/img1.jpg" alt="img principal" width={50} />

      <h2>Gestión de Contactos</h2>

      <NuevoContacto onAdd={agregarContacto} />

      <h3>Lista de Contactos</h3>
      {contactos.length === 0 ? (
        <p>En el momento no hay contactos en esta BD.</p>
      ) : (
        <ul>
          {contactos.map((contacto) => (
            <li key={contacto.id}>
              <strong>{contacto.nombre}</strong> | Tel: {contacto.telefono}
              <EliminarContacto id={contacto.id} onEliminar={eliminarContacto} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contactos;