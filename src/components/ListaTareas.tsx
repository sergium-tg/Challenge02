import React from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonNote } from '@ionic/react';
import { Tarea } from '../models/Tarea';

interface ListaTareasProps {
  tareas: Tarea[];
  onCambiarEstado: (id: number) => void;
  onVerDetalle: (tarea: Tarea) => void;
}

const ListaTareas: React.FC<ListaTareasProps> = ({ tareas, onCambiarEstado, onVerDetalle }) => {
  if (tareas.length === 0) {
    return <div className="ion-padding ion-text-center"><IonNote>No hay tareas pendientes</IonNote></div>;
  }

  return (
    <IonList>
      {tareas.map((tarea) => (
        <IonItem key={tarea.id} button onClick={() => onVerDetalle(tarea)}>
          <IonLabel>
            <h2 style={{ textDecoration: tarea.estado ? 'line-through' : 'none' }}>
              {tarea.titulo}
            </h2>
            <p>ID: {tarea.id}</p>
          </IonLabel>
          <IonBadge 
            slot="end" 
            color={tarea.estado ? "success" : "warning"}
            onClick={(e) => {
              e.stopPropagation();
              onCambiarEstado(tarea.id);
            }}
          >
            {tarea.estado ? "Completada" : "Pendiente"}
          </IonBadge>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ListaTareas;