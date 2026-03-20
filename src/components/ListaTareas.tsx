import React, { useContext } from 'react';
import { IonList, IonNote, IonListHeader, IonLabel } from '@ionic/react';
import { TaskContext } from '../context/TaskContext';
import LaTarea from './LaTarea';

const ListaTareas: React.FC = () => {
  // Consumimos el arreglo de tareas directamente del contexto
  const { tareas } = useContext(TaskContext);

  if (!tareas || tareas.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
      <IonNote>No hay tareas pendientes</IonNote>
      </div>
    );
  }

  return (
    <IonList>
    <IonListHeader>
    <IonLabel>Tus Tareas</IonLabel>
    </IonListHeader>
    {tareas.map((tarea: any) => (
      // Solo pasamos el objeto "tarea", las funciones ya no se pasan por aquí
      <LaTarea key={tarea.id} tarea={tarea} />
    ))}
    </IonList>
  );
};

export default ListaTareas;
