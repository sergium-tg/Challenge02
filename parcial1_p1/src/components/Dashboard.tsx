import { useState, useEffect } from 'react';
import type { Usuario, Paciente } from '../types';
import PerfilUsuario from './PerfilUsuario';
import FormularioPaciente from './FormularioPaciente';
import TablaPacientes from './TablaPacientes';

export default function Dashboard({ usuario, onLogout }: { usuario: Usuario; onLogout: () => void }) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editando, setEditando] = useState<Paciente | null>(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('medicare_pacientes');
    if (data) setPacientes(JSON.parse(data));
  }, []);

  const guardar = (p: Paciente) => {
    let lista;
    if (editando) {
      lista = pacientes.map(item => item.dni === editando.dni ? p : item);
    } else {
      lista = [...pacientes, p];
    }
    setPacientes(lista);
    localStorage.setItem('medicare_pacientes', JSON.stringify(lista));
    setEditando(null);
  };

  const eliminar = (dni: string) => {
    if (window.confirm("¿Confirmar eliminación?")) {
      const lista = pacientes.filter(p => p.dni !== dni);
      setPacientes(lista);
      localStorage.setItem('medicare_pacientes', JSON.stringify(lista));
    }
  };

  const filtrados = pacientes.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.dni.includes(busqueda)
  );

  return (
    <div>
      <nav>
        <PerfilUsuario usuario={usuario} />
        <button onClick={onLogout}>SALIR</button>
      </nav>

      {usuario.rol === 'medico' && (
        <section>
          <h3>Estadísticas Médicas</h3>
        </section>
      )}

      {usuario.rol === 'recepcionista' && (
        <FormularioPaciente onGuardar={guardar} pacienteAEditar={editando} />
      )}

      <hr />
      <input 
        placeholder="Buscar..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <TablaPacientes 
        pacientes={filtrados} 
        onEditar={setEditando} 
        onEliminar={eliminar} 
      />

    </div>
  );
}