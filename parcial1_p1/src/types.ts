export interface Usuario {
  email: string;
  pass: string;
  rol: 'recepcionista' | 'medico';
  nombre: string;
  avatar?: string;
}

export interface Paciente {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}