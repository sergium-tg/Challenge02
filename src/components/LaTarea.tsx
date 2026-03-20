import React, { useContext } from 'react';
import {
  IonCard, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonItem, IonLabel, IonCheckbox
} from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { Tarea } from '../models/Tarea';

interface LaTareaProps {
  tarea: Tarea;
}

const LaTarea: React.FC<LaTareaProps> = ({ tarea }) => {
  const { cambiarEstadoTarea, eliminarTarea } = useContext(TaskContext);
  const history = useHistory();

  // Función para navegar al detalle
  const handleViewDetail = () => history.push(`/tasks/detail/${tarea.id}`);

  // En los botones detenemos la propagación para que no activen el clic del detalle
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/tasks/edit/${tarea.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    eliminarTarea(tarea.id);
  };

  const handleToggle = (e: any) => {
    e.stopPropagation();
    cambiarEstadoTarea(tarea.id);
  };

  return (
    <IonCard>
    <IonItem lines="none">
    <IonCheckbox slot="start" checked={tarea.completada} onIonChange={handleToggle} />

    {/* Hacemos que todo el Título sea clickeable */}
    <IonLabel onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
    <IonCardTitle style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
    {tarea.titulo}
    </IonCardTitle>
    </IonLabel>
    </IonItem>

    <IonCardContent>
    {/* Hacemos que la descripción también sea clickeable */}
    <div onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
    <p>{tarea.descripcion}</p>
    </div>

    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
    {/* Ya no necesitamos el botón del ojo */}
    <IonButton fill="outline" color="primary" onClick={handleEdit}>
    <IonIcon slot="icon-only" icon={createOutline} />
    </IonButton>
    <IonButton fill="outline" color="danger" onClick={handleDelete}>
    <IonIcon slot="icon-only" icon={trashOutline} />
    </IonButton>
    </div>
    </IonCardContent>
    </IonCard>
  );
};

export default LaTarea;
