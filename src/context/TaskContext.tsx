import { createContext, useState } from 'react';
import { Tarea } from '../models/Tarea';

// 1. Creamos el contexto
export const TaskContext = createContext<any>(null);

// 2. Creamos el Provider que envolverá nuestra aplicación
export function TaskProvider({ children }: { children: React.ReactNode }) {

    // Estado global de las tareas
    const [tareas, setTareas] = useState<Tarea[]>([
        {
            id: 1,
            titulo: 'Terminar el Challenge 05',
            completada: false,
            descripcion: 'Implementar Context y Firebase en la aplicación de tareas'
        }
    ]);

    // Función para agregar una nueva tarea
    const agregarTarea = (nuevaTarea: Tarea) => {
        setTareas([...tareas, nuevaTarea]);
    };

    // Función para marcar o desmarcar una tarea como completada
    const cambiarEstadoTarea = (id: number) => {
        setTareas(tareas.map((tarea: Tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        ));
    };

    // Función para actualizar los datos de una tarea existente (editar)
    const editarTarea = (tareaActualizada: Tarea) => {
        setTareas(tareas.map((tarea: Tarea) =>
        tarea.id === tareaActualizada.id ? tareaActualizada : tarea
        ));
    };

    // Función para eliminar una tarea de la lista
    const eliminarTarea = (id: number) => {
        setTareas(tareas.filter((tarea: Tarea) => tarea.id !== id));
    };

    // 3. Retornamos el Provider con todos los valores y funciones expuestos
    return (
        <TaskContext.Provider value={{
            tareas,
            agregarTarea,
            cambiarEstadoTarea,
            editarTarea,
            eliminarTarea
        }}>
        {children}
        </TaskContext.Provider>
    );
}
