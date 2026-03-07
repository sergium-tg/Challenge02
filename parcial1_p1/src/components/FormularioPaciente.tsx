import { useState, useEffect } from 'react';
import type { Paciente } from '../types';

export default function FormularioPaciente({ onGuardar, pacienteAEditar }: { onGuardar: (p: Paciente) => void; pacienteAEditar: Paciente | null; }) {
  const [f, setF] = useState<Paciente>({ nombre: '', apellido: '', dni: '', telefono: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (pacienteAEditar) setF(pacienteAEditar);
    else setF({ nombre: '', apellido: '', dni: '', telefono: '' });
  }, [pacienteAEditar]);

  const enviar = () => {
    if (!f.nombre || !f.apellido || !f.dni) {
      setError('Campos obligatorios faltantes');
      return;
    }
    const dniValido = /^[0-9]{7,8}$/.test(f.dni);
    if (!dniValido) {
      setError('DNI inválido (7-8 dígitos)');
      return;
    }
    setError('');
    onGuardar(f);
    setF({ nombre: '', apellido: '', dni: '', telefono: '' });
  };

  return (
    <div>
      <h4>{pacienteAEditar ? 'Editar' : 'Nuevo'} Paciente</h4>
      <input placeholder="Nombre" value={f.nombre} onChange={e => setF({...f, nombre: e.target.value})} />
      <input placeholder="Apellido" value={f.apellido} onChange={e => setF({...f, apellido: e.target.value})} />
      <input placeholder="DNI" value={f.dni} onChange={e => setF({...f, dni: e.target.value})} />
      <input placeholder="Teléfono" value={f.telefono} onChange={e => setF({...f, telefono: e.target.value})} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={enviar}>Guardar</button>
    </div>
  );
}