export interface Asignatura {
  id_asignatura: string;
  nombre: string;
  calificacion: number;
}

export interface Estudiante {
  id_estudiante: string;
  nombre: string;
  asignaturas: Asignatura[];
}
