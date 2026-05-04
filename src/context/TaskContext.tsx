import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Tarea } from '../models/Tarea';

const API_URL = 'http://localhost:3000/tareas';

// 1. Definimos una interfaz estricta para lo que el Contexto va a proveer
interface TaskContextType {
  tareas: Tarea[];
  loading: boolean;
  error: string | null;
  agregarTarea: (nuevaTarea: Omit<Tarea, 'id'>) => Promise<void>;
  cambiarEstadoTarea: (id: number) => Promise<void>;
  editarTarea: (tareaActualizada: Tarea) => Promise<void>;
  eliminarTarea: (id: number) => Promise<void>;
  refrescarTareas: () => Promise<void>;
}

// 2. Asignamos la interfaz al crear el Contexto (evitando el uso de 'any')
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // GET - Carga inicial de todas las tareas desde el backend
  const cargarTareas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Tarea[]>(API_URL);
      setTareas(response.data);
    } catch (err) {
      console.error('Error al cargar tareas:', err);
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarTareas();
  }, [cargarTareas]);

  // POST – Crear tarea
  const agregarTarea = async (nuevaTarea: Omit<Tarea, 'id'>) => {
    try {
      const response = await axios.post<Tarea>(API_URL, nuevaTarea, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTareas(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Error al agregar:', err);
      throw err; 
    }
  };

  // PUT – Cambiar el estado (toggle)
  const cambiarEstadoTarea = async (id: number) => {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    
    const tareaActualizada = { ...tarea, estado: !tarea.estado };
    try {
      await axios.put(`${API_URL}/${id}`, tareaActualizada, {
        headers: { 'Content-Type': 'application/json' }
      });
      // Actualizamos el estado local solo si la petición al servidor fue exitosa
      setTareas(prev => prev.map(t => (t.id === id ? tareaActualizada : t)));
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      throw err;
    }
  };

  // PUT – Editar tarea completa
  const editarTarea = async (tareaActualizada: Tarea) => {
    try {
      await axios.put(`${API_URL}/${tareaActualizada.id}`, tareaActualizada, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTareas(prev => prev.map(t => (t.id === tareaActualizada.id ? tareaActualizada : t)));
    } catch (err) {
      console.error('Error al editar:', err);
      throw err;
    }
  };

  // DELETE – Eliminar tarea
  const eliminarTarea = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error al eliminar:', err);
      throw err;
    }
  };

  return (
    <TaskContext.Provider value={{
      tareas,
      loading,
      error,
      agregarTarea,
      cambiarEstadoTarea,
      editarTarea,
      eliminarTarea,
      refrescarTareas: cargarTareas
    }}>
      {children}
    </TaskContext.Provider>
  );
}