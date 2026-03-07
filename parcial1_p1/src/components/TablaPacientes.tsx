import type { Paciente } from '../types';

export default function TablaPacientes({ pacientes, onEditar, onEliminar }: { pacientes: Paciente[]; onEditar: (p: Paciente) => void; onEliminar: (dni: string) => void; }) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>DNI</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map(p => (
          <tr key={p.dni}>
            <td>{p.nombre} {p.apellido}</td>
            <td>{p.dni}</td>
            <td>{p.telefono}</td>
            <td>
              <button onClick={() => onEditar(p)}>Editar</button>
              <button onClick={() => onEliminar(p.dni)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}